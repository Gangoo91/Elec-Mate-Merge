import { ArrowLeft, Wind, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ventilation Principles - HNC Module 8 Section 2.1";
const DESCRIPTION = "Master ventilation principles for building services: air change rates, fresh air requirements per person, contaminant control, CO2 as ventilation indicator, Building Regulations Part F, CIBSE Guide B, natural vs mechanical ventilation and IAQ standards.";

const quickCheckQuestions = [
  {
    id: "air-change-rate",
    question: "What is the typical air change rate recommended for a general office space according to CIBSE guidelines?",
    options: ["2-4 ACH", "4-6 ACH", "6-10 ACH", "10-15 ACH"],
    correctIndex: 1,
    explanation: "CIBSE Guide A recommends 4-6 air changes per hour for general office spaces. This provides adequate fresh air whilst maintaining energy efficiency. Higher ACH rates are required for spaces with higher pollutant loads or occupancy densities."
  },
  {
    id: "fresh-air-rate",
    question: "What is the minimum fresh air supply rate per person specified in Building Regulations Approved Document F for offices?",
    options: ["5 litres/second", "8 litres/second", "10 litres/second", "15 litres/second"],
    correctIndex: 2,
    explanation: "Approved Document F specifies a minimum of 10 litres/second per person for offices. This ensures adequate dilution of bioeffluents and maintains acceptable indoor air quality. The rate may need increasing for spaces with additional pollutant sources."
  },
  {
    id: "co2-level",
    question: "At what CO2 concentration level does indoor air quality typically become unacceptable according to UK standards?",
    options: ["450 ppm", "800 ppm", "1000 ppm", "1500 ppm"],
    correctIndex: 2,
    explanation: "CO2 levels above 1000 ppm indicate inadequate ventilation. Outdoor air contains approximately 400-450 ppm CO2. CIBSE recommends maintaining indoor CO2 below 1000 ppm for good air quality, with 800 ppm being the target for well-ventilated spaces."
  },
  {
    id: "natural-ventilation",
    question: "What is the maximum recommended room depth for effective single-sided natural ventilation?",
    options: ["2 x ceiling height", "2.5 x ceiling height", "3 x ceiling height", "5 x ceiling height"],
    correctIndex: 1,
    explanation: "Single-sided natural ventilation is typically limited to 2.5 times the ceiling height in depth. Beyond this, air movement becomes insufficient for adequate ventilation. Cross-ventilation can extend this to approximately 5 times the ceiling height."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of ventilation in occupied buildings?",
    options: [
      "To provide cooling only",
      "To dilute and remove indoor air pollutants whilst supplying fresh air",
      "To create positive pressure throughout the building",
      "To reduce heating energy consumption"
    ],
    correctAnswer: 1,
    explanation: "The primary purpose of ventilation is to dilute and remove indoor air pollutants (including CO2, odours, and volatile organic compounds) whilst providing fresh outdoor air for occupants. Temperature control, whilst important, is a secondary function that may be integrated with ventilation systems."
  },
  {
    id: 2,
    question: "According to CIBSE Guide B, what fresh air supply rate is recommended for a classroom?",
    options: [
      "5 L/s per person",
      "8 L/s per person",
      "10 L/s per person",
      "12 L/s per person"
    ],
    correctAnswer: 1,
    explanation: "CIBSE Guide B recommends 8 L/s per person for classrooms. This accounts for the higher metabolic rates of children and the importance of maintaining good air quality for learning. Schools often require higher ventilation rates due to occupancy density."
  },
  {
    id: 3,
    question: "Building Regulations Approved Document F requires what minimum whole building ventilation rate for dwellings?",
    options: [
      "0.3 L/s per m squared floor area",
      "0.5 L/s per m squared floor area",
      "1.0 L/s per m squared floor area",
      "1.5 L/s per m squared floor area"
    ],
    correctAnswer: 0,
    explanation: "Approved Document F requires a minimum whole building ventilation rate of 0.3 L/s per m squared of internal floor area for dwellings. This baseline rate ensures continuous background ventilation to maintain acceptable indoor air quality."
  },
  {
    id: 4,
    question: "What is the recommended CO2 concentration for a well-ventilated space according to CIBSE guidance?",
    options: [
      "Less than 600 ppm",
      "Less than 800 ppm",
      "Less than 1000 ppm",
      "Less than 1500 ppm"
    ],
    correctAnswer: 1,
    explanation: "CIBSE recommends maintaining CO2 below 800 ppm for well-ventilated spaces. This provides a significant margin below the 1000 ppm threshold where occupants may begin to experience discomfort or reduced cognitive performance."
  },
  {
    id: 5,
    question: "What air change rate does CIBSE recommend for hospital operating theatres?",
    options: [
      "6-10 ACH",
      "10-15 ACH",
      "15-25 ACH",
      "25-35 ACH"
    ],
    correctAnswer: 2,
    explanation: "Hospital operating theatres require 15-25 air changes per hour to maintain sterile conditions and remove anaesthetic gases. Ultra-clean ventilation (UCV) theatres for orthopaedic procedures may require even higher rates with laminar flow systems."
  },
  {
    id: 6,
    question: "Which contaminant is primarily controlled by kitchen extract ventilation?",
    options: [
      "Carbon monoxide only",
      "Grease-laden air, odours and combustion products",
      "Radon gas",
      "Carbon dioxide only"
    ],
    correctAnswer: 1,
    explanation: "Kitchen extract ventilation is designed to remove grease-laden air, cooking odours, moisture and combustion products from gas appliances. Grease filtration is essential to prevent fire hazards and ductwork contamination."
  },
  {
    id: 7,
    question: "What is the minimum extract rate for a domestic bathroom with no openable window per Building Regulations?",
    options: [
      "8 L/s",
      "15 L/s",
      "30 L/s",
      "60 L/s"
    ],
    correctAnswer: 1,
    explanation: "An internal bathroom without natural ventilation requires a minimum continuous extract rate of 8 L/s or an intermittent rate of 15 L/s during use. This removes moisture and odours to prevent condensation and maintain hygiene."
  },
  {
    id: 8,
    question: "Cross-ventilation in buildings is most effective when:",
    options: [
      "Openings are on the same wall",
      "Openings are on opposite or adjacent walls",
      "The building is fully sealed",
      "Wind speeds are below 1 m/s"
    ],
    correctAnswer: 1,
    explanation: "Cross-ventilation requires openings on opposite or adjacent walls to create a pressure differential that drives airflow through the space. This is far more effective than single-sided ventilation and allows deeper floor plates to be naturally ventilated."
  },
  {
    id: 9,
    question: "What does the term 'infiltration' refer to in ventilation terminology?",
    options: [
      "Intentional air supply through ventilation systems",
      "Uncontrolled air leakage through the building envelope",
      "Extract of contaminated air",
      "Recirculation of indoor air"
    ],
    correctAnswer: 1,
    explanation: "Infiltration refers to uncontrolled air leakage through cracks, gaps and openings in the building envelope. Whilst it provides some ventilation, it cannot be controlled and may cause draughts and energy losses. Modern buildings aim to minimise infiltration and provide controlled ventilation."
  },
  {
    id: 10,
    question: "What is the stack effect in natural ventilation?",
    options: [
      "The effect of wind on building pressure",
      "The buoyancy-driven air movement due to temperature difference",
      "The mechanical pressurisation of stairwells",
      "The filtering effect of air handling units"
    ],
    correctAnswer: 1,
    explanation: "The stack effect occurs when warm air rises and exits at high level, drawing cooler air in at low level. The driving force is proportional to the temperature difference and the height of the stack. This principle is used in atria and chimney ventilation systems."
  },
  {
    id: 11,
    question: "According to CIBSE, what is the recommended ventilation effectiveness factor for displacement ventilation?",
    options: [
      "0.5",
      "0.8-1.0",
      "1.0-1.2",
      "1.5-2.0"
    ],
    correctAnswer: 2,
    explanation: "Displacement ventilation achieves ventilation effectiveness of 1.0-1.2 because fresh air is supplied at low level and rises past occupants before being extracted at ceiling level. This creates stratification that improves air quality in the breathing zone compared to mixing ventilation."
  },
  {
    id: 12,
    question: "What is the purpose of demand-controlled ventilation (DCV)?",
    options: [
      "To provide maximum ventilation at all times",
      "To adjust ventilation rates based on actual occupancy or pollutant levels",
      "To eliminate the need for outdoor air",
      "To maintain constant positive pressure"
    ],
    correctAnswer: 1,
    explanation: "Demand-controlled ventilation adjusts the outdoor air supply rate based on actual occupancy (using CO2 sensors, occupancy sensors or scheduling) rather than providing maximum ventilation continuously. This significantly reduces energy consumption whilst maintaining acceptable indoor air quality."
  },
  {
    id: 13,
    question: "Which UK regulation sets minimum ventilation requirements for non-domestic buildings?",
    options: [
      "Building Regulations Part L",
      "Building Regulations Part F",
      "Building Regulations Part J",
      "Building Regulations Part M"
    ],
    correctAnswer: 1,
    explanation: "Building Regulations Approved Document F (Ventilation) sets minimum ventilation requirements for both domestic and non-domestic buildings. It covers fresh air supply rates, extract rates, and system specifications to ensure adequate indoor air quality."
  },
  {
    id: 14,
    question: "What concentration of formaldehyde triggers concern for indoor air quality?",
    options: [
      "Greater than 0.01 ppm",
      "Greater than 0.1 ppm",
      "Greater than 1.0 ppm",
      "Greater than 10 ppm"
    ],
    correctAnswer: 1,
    explanation: "WHO guidelines recommend formaldehyde concentrations remain below 0.1 ppm (100 micrograms per cubic metre). Higher levels can cause eye and respiratory irritation. Formaldehyde is emitted from building materials, furniture and cleaning products."
  },
  {
    id: 15,
    question: "For a restaurant dining area, what air change rate does CIBSE recommend?",
    options: [
      "4-6 ACH",
      "6-10 ACH",
      "10-15 ACH",
      "15-20 ACH"
    ],
    correctAnswer: 2,
    explanation: "Restaurant dining areas typically require 10-15 ACH to remove cooking odours that migrate from the kitchen, body odours from high occupancy, and to maintain comfort. Kitchen areas themselves require even higher rates (20-30 ACH) with dedicated extract systems."
  }
];

const faqs = [
  {
    question: "How do I calculate the required ventilation rate for a specific space?",
    answer: "Calculate using two methods and select the greater: (1) Per-person rate method: multiply occupancy by L/s per person from CIBSE Guide A or Building Regulations. For offices, 10 L/s per person multiplied by expected occupancy. (2) Air change rate method: multiply room volume by recommended ACH, then divide by 3600 to get L/s. For example, a 200 m cubed office requiring 6 ACH needs 200 multiplied by 6, divided by 3.6 = 333 L/s. Compare both results and design for the higher value."
  },
  {
    question: "When should mechanical ventilation be used instead of natural ventilation?",
    answer: "Mechanical ventilation is required when: (1) The building is deep-plan with rooms exceeding 2.5 times ceiling height from windows, (2) External noise or pollution prevents opening windows, (3) Consistent air quality is critical such as in laboratories and healthcare, (4) Heat recovery is required to meet Part L energy targets, (5) Precise temperature and humidity control is needed, (6) Extract of specific contaminants is required such as in kitchens and WCs. Mixed-mode systems combining natural and mechanical ventilation can offer flexibility."
  },
  {
    question: "How does CO2-based demand control ventilation work?",
    answer: "CO2 sensors measure indoor concentration, typically in the return air duct or within the occupied zone. When CO2 rises above setpoint (commonly 800-1000 ppm), the controller increases outdoor air damper position or fan speed. As CO2 falls, ventilation reduces to a minimum background level. This matches ventilation to actual occupancy rather than assumed maximum, typically saving 20-30% of ventilation energy. Sensors require regular calibration and strategic positioning away from supply diffusers."
  },
  {
    question: "What are the key differences between displacement and mixing ventilation?",
    answer: "Displacement ventilation supplies cool air at low level (floor or low-wall diffusers at around 0.25 m/s) which rises as it warms, creating stratification with better air quality in the breathing zone. It achieves ventilation effectiveness greater than 1.0 but requires higher supply temperatures (typically 18-19 degrees Celsius) and low ceiling heights are problematic. Mixing ventilation supplies air at high velocity from ceiling diffusers, creating turbulent mixing throughout the space. It achieves effectiveness of 0.8-1.0 but offers better temperature uniformity and works with any ceiling height."
  },
  {
    question: "How do Building Regulations Part F requirements differ for domestic and non-domestic buildings?",
    answer: "Domestic buildings under Part F require: whole building rate of 0.3 L/s per square metre, extract rates for kitchens (30 L/s intermittent or 13 L/s continuous), bathrooms (15 L/s intermittent or 8 L/s continuous), and provisions for purge ventilation. Non-domestic buildings require: fresh air rates based on occupancy type (typically 10 L/s per person for offices), adequate extract from WCs, kitchens and car parks, and performance testing to demonstrate compliance. Non-domestic buildings also need to consider BREEAM credits for enhanced ventilation."
  },
  {
    question: "What indoor air quality parameters should be monitored beyond CO2?",
    answer: "Key parameters include: Temperature (20-24 degrees Celsius for comfort), Relative humidity (40-60% to prevent dryness and mould), PM2.5 and PM10 particulates (WHO limits are 15 and 45 micrograms per cubic metre), VOCs including formaldehyde (below 0.1 ppm), Carbon monoxide (where combustion appliances present, below 9 ppm), and Ozone (below 0.05 ppm). Modern BMS can integrate IAQ sensors to provide comprehensive monitoring and automated ventilation response."
  }
];

const HNCModule8Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section2">
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
            <Wind className="h-4 w-4" />
            <span>Module 8.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ventilation Principles
          </h1>
          <p className="text-white/80">
            Air change rates, fresh air requirements, contaminant control and ventilation standards for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Air change rate:</strong> Volume replacements per hour (ACH)</li>
              <li className="pl-1"><strong>Fresh air:</strong> Typically 10 L/s per person for offices</li>
              <li className="pl-1"><strong>CO2 indicator:</strong> Below 800-1000 ppm for good IAQ</li>
              <li className="pl-1"><strong>Regulations:</strong> Building Regs Part F, CIBSE Guide B</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BMS integration:</strong> CO2 sensors for demand control</li>
              <li className="pl-1"><strong>Energy efficiency:</strong> Heat recovery systems</li>
              <li className="pl-1"><strong>System selection:</strong> Natural vs mechanical ventilation</li>
              <li className="pl-1"><strong>Compliance:</strong> Part F, BREEAM, WELL standards</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate air change rates and fresh air requirements",
              "Understand Building Regulations Part F requirements",
              "Apply CIBSE Guide B ventilation criteria",
              "Use CO2 as an indoor air quality indicator",
              "Design for contaminant dilution and control",
              "Compare natural and mechanical ventilation strategies",
              "Specify demand-controlled ventilation systems"
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

        {/* Section 1: Air Change Rates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Air Change Rates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The air change rate (ACH) expresses how many times the entire volume of air within a space
              is replaced per hour. It is a fundamental metric for ventilation system design and performance assessment.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air Change Rate Formula</p>
              <p className="font-mono text-center text-lg mb-2">ACH = (Q × 3600) / V</p>
              <p className="text-xs text-white/70 text-center">Where Q = airflow rate (m³/s), V = room volume (m³)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors affecting required ACH:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Occupancy density:</strong> Higher densities require more air changes</li>
                <li className="pl-1"><strong>Activity level:</strong> Exercise areas need more than sedentary spaces</li>
                <li className="pl-1"><strong>Pollutant sources:</strong> Processes generating contaminants increase requirements</li>
                <li className="pl-1"><strong>Ceiling height:</strong> Taller spaces may need higher ACH for equivalent air quality</li>
                <li className="pl-1"><strong>Ventilation effectiveness:</strong> Mixing vs displacement systems affect requirements</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Recommended Air Change Rates</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended ACH</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General offices</td>
                      <td className="border border-white/10 px-3 py-2">4-6</td>
                      <td className="border border-white/10 px-3 py-2">Based on typical occupancy density</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Meeting rooms</td>
                      <td className="border border-white/10 px-3 py-2">6-8</td>
                      <td className="border border-white/10 px-3 py-2">Higher density, intermittent use</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Classrooms</td>
                      <td className="border border-white/10 px-3 py-2">5-8</td>
                      <td className="border border-white/10 px-3 py-2">CO2 control critical for learning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail spaces</td>
                      <td className="border border-white/10 px-3 py-2">6-10</td>
                      <td className="border border-white/10 px-3 py-2">Variable occupancy patterns</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Restaurant dining</td>
                      <td className="border border-white/10 px-3 py-2">10-15</td>
                      <td className="border border-white/10 px-3 py-2">Odour control, high occupancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commercial kitchens</td>
                      <td className="border border-white/10 px-3 py-2">20-30</td>
                      <td className="border border-white/10 px-3 py-2">Grease, heat, combustion products</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital wards</td>
                      <td className="border border-white/10 px-3 py-2">6-10</td>
                      <td className="border border-white/10 px-3 py-2">Infection control considerations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Operating theatres</td>
                      <td className="border border-white/10 px-3 py-2">15-25</td>
                      <td className="border border-white/10 px-3 py-2">Sterility, anaesthetic gas removal</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Laboratories</td>
                      <td className="border border-white/10 px-3 py-2">6-15</td>
                      <td className="border border-white/10 px-3 py-2">Depends on hazard classification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gymnasiums</td>
                      <td className="border border-white/10 px-3 py-2">6-10</td>
                      <td className="border border-white/10 px-3 py-2">High metabolic rates, odour control</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Converting ACH to Flow Rate</p>
              <p className="font-mono text-center text-lg mb-2">Q (L/s) = (ACH × V) / 3.6</p>
              <p className="text-xs text-white/70 text-center mb-3">Where V = room volume (m³)</p>
              <p className="text-sm text-white/80">
                Example: A 150 m³ meeting room requiring 8 ACH needs: Q = (8 × 150) / 3.6 = 333 L/s
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Always verify ACH calculations against per-person fresh air rates and select the higher value. A low-occupancy space may need more than the ACH minimum, whilst a high-occupancy small room may exceed ACH requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Fresh Air Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fresh Air Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fresh air requirements ensure adequate outdoor air is supplied to dilute indoor pollutants,
              primarily human bioeffluents. Requirements are specified per person or per square metre depending
              on the standard applied.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Regulations Approved Document F</p>
              <p className="text-sm text-white mb-3">
                Part F sets minimum ventilation requirements for buildings in England and Wales. For non-domestic buildings,
                fresh air rates are specified based on space type and occupancy.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fresh Air Rate</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Offices</td>
                      <td className="border border-white/10 px-3 py-2">10 L/s per person</td>
                      <td className="border border-white/10 px-3 py-2">Or 1.0 L/s per m² floor area</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Classrooms</td>
                      <td className="border border-white/10 px-3 py-2">8 L/s per person</td>
                      <td className="border border-white/10 px-3 py-2">Higher for science labs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail</td>
                      <td className="border border-white/10 px-3 py-2">10 L/s per person</td>
                      <td className="border border-white/10 px-3 py-2">Based on typical occupancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Restaurants</td>
                      <td className="border border-white/10 px-3 py-2">10 L/s per person</td>
                      <td className="border border-white/10 px-3 py-2">Plus kitchen extract</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hotels (bedrooms)</td>
                      <td className="border border-white/10 px-3 py-2">10 L/s per person</td>
                      <td className="border border-white/10 px-3 py-2">Based on 2 occupants</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Guide B Fresh Air Recommendations</p>
              <p className="text-sm text-white mb-3">
                CIBSE provides more detailed guidance considering activity levels and ventilation effectiveness.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">L/s per person</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Assumed Occupancy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sedentary (offices)</td>
                      <td className="border border-white/10 px-3 py-2">8-10</td>
                      <td className="border border-white/10 px-3 py-2">10 m² per person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Light activity (retail)</td>
                      <td className="border border-white/10 px-3 py-2">10-12</td>
                      <td className="border border-white/10 px-3 py-2">5 m² per person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Moderate activity (teaching)</td>
                      <td className="border border-white/10 px-3 py-2">10-12</td>
                      <td className="border border-white/10 px-3 py-2">2 m² per person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heavy activity (gym)</td>
                      <td className="border border-white/10 px-3 py-2">15-20</td>
                      <td className="border border-white/10 px-3 py-2">5 m² per person</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Domestic Ventilation Requirements (Part F)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Continuous Extract Rates</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Whole dwelling: 0.3 L/s per m² floor area</li>
                    <li className="pl-1">Kitchen: 13 L/s minimum</li>
                    <li className="pl-1">Bathroom: 8 L/s minimum</li>
                    <li className="pl-1">Utility room: 8 L/s minimum</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Intermittent Extract Rates</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Kitchen (adjacent hob): 30 L/s</li>
                    <li className="pl-1">Kitchen (elsewhere): 60 L/s</li>
                    <li className="pl-1">Bathroom: 15 L/s</li>
                    <li className="pl-1">Utility room: 30 L/s</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ventilation Calculation Example</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Scenario:</strong> Open-plan office, 500 m² floor area, 50 occupants</p>
                <p className="mt-2"><strong>Method 1 - Per person:</strong></p>
                <p>Q = 50 persons × 10 L/s = 500 L/s</p>
                <p className="mt-2"><strong>Method 2 - Per floor area:</strong></p>
                <p>Q = 500 m² × 1.0 L/s per m² = 500 L/s</p>
                <p className="mt-2"><strong>Method 3 - Air change rate (assume 3m ceiling, 6 ACH):</strong></p>
                <p>Volume = 500 × 3 = 1500 m³</p>
                <p>Q = (1500 × 6) / 3.6 = 2500 L/s</p>
                <p className="mt-2 text-green-400"><strong>Design for higher value:</strong> 2500 L/s in this case</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> The higher calculated value ensures adequate ventilation under all operating conditions. Demand-controlled ventilation can reduce actual airflow when occupancy is below design levels.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Contaminant Control and CO2 Monitoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Contaminant Control and CO2 Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ventilation serves to dilute and remove indoor air contaminants to maintain acceptable indoor air quality (IAQ).
              Carbon dioxide (CO2) is widely used as a surrogate indicator for ventilation adequacy in occupied spaces.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Indoor Air Contaminants:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Bioeffluents:</strong> CO2, body odours, moisture from respiration and perspiration</li>
                <li className="pl-1"><strong>VOCs:</strong> Volatile organic compounds from furnishings, cleaning products, paints</li>
                <li className="pl-1"><strong>Particulates:</strong> Dust, fibres, pollen, aerosols</li>
                <li className="pl-1"><strong>Combustion products:</strong> CO, NOx from gas appliances and vehicles</li>
                <li className="pl-1"><strong>Biological:</strong> Bacteria, viruses, mould spores</li>
                <li className="pl-1"><strong>Process emissions:</strong> Specific to activity (cooking, printing, manufacturing)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CO2 as a Ventilation Indicator</p>
              <p className="text-sm text-white mb-3">
                Humans exhale approximately 0.005 L/s of CO2 during sedentary activity. Indoor CO2 concentration
                directly correlates with the balance between occupant generation and dilution by outdoor air.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">CO2 Level (ppm)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Air Quality</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ventilation Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt;600</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                      <td className="border border-white/10 px-3 py-2">Very good ventilation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">600-800</td>
                      <td className="border border-white/10 px-3 py-2">Good</td>
                      <td className="border border-white/10 px-3 py-2">Adequate ventilation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">800-1000</td>
                      <td className="border border-white/10 px-3 py-2">Acceptable</td>
                      <td className="border border-white/10 px-3 py-2">Minimum acceptable level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1000-1500</td>
                      <td className="border border-white/10 px-3 py-2">Poor</td>
                      <td className="border border-white/10 px-3 py-2">Inadequate - complaints likely</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;1500</td>
                      <td className="border border-white/10 px-3 py-2">Unacceptable</td>
                      <td className="border border-white/10 px-3 py-2">Requires immediate attention</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Steady-State CO2 Calculation</p>
              <p className="font-mono text-center text-lg mb-2">Ci = Co + (N × G) / Q</p>
              <p className="text-xs text-white/70 text-center">
                Ci = indoor CO2 (ppm), Co = outdoor CO2 (typically 400-450 ppm), N = number of occupants, G = CO2 generation per person (approximately 18 L/h sedentary), Q = outdoor airflow (L/h)
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Demand-Controlled Ventilation (DCV)</p>
              <p className="text-sm text-white mb-2">
                DCV systems use CO2 sensors to modulate outdoor air supply based on actual occupancy rather than assumed maximum.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>CO2 setpoint:</strong> Typically 800-1000 ppm depending on application</li>
                <li className="pl-1"><strong>Control action:</strong> Modulate outdoor air damper or fan speed</li>
                <li className="pl-1"><strong>Minimum position:</strong> Maintain baseline ventilation when unoccupied</li>
                <li className="pl-1"><strong>Energy savings:</strong> Typically 20-30% reduction in ventilation energy</li>
                <li className="pl-1"><strong>Sensor placement:</strong> Return air duct or within occupied zone at breathing height</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Other IAQ Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended Limit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Carbon monoxide (CO)</td>
                      <td className="border border-white/10 px-3 py-2">&lt;9 ppm (8-hour average)</td>
                      <td className="border border-white/10 px-3 py-2">WHO</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Formaldehyde (HCHO)</td>
                      <td className="border border-white/10 px-3 py-2">&lt;0.1 ppm</td>
                      <td className="border border-white/10 px-3 py-2">WHO</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Total VOCs</td>
                      <td className="border border-white/10 px-3 py-2">&lt;500 µg/m³</td>
                      <td className="border border-white/10 px-3 py-2">BREEAM</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PM2.5</td>
                      <td className="border border-white/10 px-3 py-2">&lt;15 µg/m³ (annual)</td>
                      <td className="border border-white/10 px-3 py-2">WHO 2021</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PM10</td>
                      <td className="border border-white/10 px-3 py-2">&lt;45 µg/m³ (annual)</td>
                      <td className="border border-white/10 px-3 py-2">WHO 2021</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Relative humidity</td>
                      <td className="border border-white/10 px-3 py-2">40-60%</td>
                      <td className="border border-white/10 px-3 py-2">CIBSE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> CO2 monitoring alone does not detect all contaminants. Additional sensors for particulates, VOCs or specific gases may be required depending on the application. Healthcare and laboratory environments often need comprehensive IAQ monitoring.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Ventilation Strategies and Standards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ventilation Strategies and Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ventilation strategies are selected based on building type, climate, energy requirements and indoor environment
              objectives. The main approaches are natural ventilation, mechanical ventilation and mixed-mode systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Natural Ventilation</p>
              <p className="text-sm text-white mb-2">
                Relies on wind pressure and buoyancy (stack effect) to drive airflow through openings in the building envelope.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-4">
                <div>
                  <p className="text-sm font-medium text-green-400/80 mb-2">Advantages</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">No fan energy consumption</li>
                    <li className="pl-1">Low maintenance requirements</li>
                    <li className="pl-1">Occupant control and connection to outside</li>
                    <li className="pl-1">No ductwork or plant space required</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-400/80 mb-2">Limitations</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Dependent on weather conditions</li>
                    <li className="pl-1">Limited depth (approximately 2.5× ceiling height single-sided)</li>
                    <li className="pl-1">Noise and pollution from outside</li>
                    <li className="pl-1">Security concerns with openable windows</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Natural Ventilation Design Rules</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Single-sided:</strong> Effective depth ≤ 2.5 × ceiling height</li>
                <li className="pl-1"><strong>Cross-ventilation:</strong> Effective depth ≤ 5 × ceiling height</li>
                <li className="pl-1"><strong>Stack ventilation:</strong> Requires height difference &gt;3m between inlet and outlet</li>
                <li className="pl-1"><strong>Openable area:</strong> Typically 5% of floor area for purge ventilation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mechanical Ventilation</p>
              <p className="text-sm text-white mb-2">
                Uses fans to provide controlled airflow, enabling heat recovery, filtration and precise environmental control.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extract only (MEV)</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical extract with natural supply</td>
                      <td className="border border-white/10 px-3 py-2">Dwellings, small commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supply only</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical supply with natural exhaust</td>
                      <td className="border border-white/10 px-3 py-2">Rare - used for pressurisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Balanced (MVHR)</td>
                      <td className="border border-white/10 px-3 py-2">Supply and extract with heat recovery</td>
                      <td className="border border-white/10 px-3 py-2">Energy-efficient buildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VAV</td>
                      <td className="border border-white/10 px-3 py-2">Variable air volume with zone control</td>
                      <td className="border border-white/10 px-3 py-2">Large commercial buildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Displacement</td>
                      <td className="border border-white/10 px-3 py-2">Low-level supply, high-level extract</td>
                      <td className="border border-white/10 px-3 py-2">Atria, theatres, auditoria</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mixed-Mode Ventilation</p>
              <p className="text-sm text-white mb-2">
                Combines natural and mechanical ventilation to optimise comfort and energy performance throughout the year.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Concurrent:</strong> Natural and mechanical operate simultaneously</li>
                <li className="pl-1"><strong>Changeover:</strong> Switches between natural and mechanical based on conditions</li>
                <li className="pl-1"><strong>Zoned:</strong> Different strategies in different parts of building</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Ventilation Standards and Guidance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scope</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building Regs Part F</td>
                      <td className="border border-white/10 px-3 py-2">Statutory minimum</td>
                      <td className="border border-white/10 px-3 py-2">Minimum ventilation rates for compliance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CIBSE Guide A</td>
                      <td className="border border-white/10 px-3 py-2">Environmental criteria</td>
                      <td className="border border-white/10 px-3 py-2">Design temperatures, air quality targets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CIBSE Guide B</td>
                      <td className="border border-white/10 px-3 py-2">HVAC systems</td>
                      <td className="border border-white/10 px-3 py-2">Detailed ventilation design guidance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BS EN 16798-1</td>
                      <td className="border border-white/10 px-3 py-2">Indoor environment</td>
                      <td className="border border-white/10 px-3 py-2">IEQ categories and criteria</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BREEAM</td>
                      <td className="border border-white/10 px-3 py-2">Sustainability rating</td>
                      <td className="border border-white/10 px-3 py-2">IAQ credits, monitoring requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">WELL Standard</td>
                      <td className="border border-white/10 px-3 py-2">Health and wellbeing</td>
                      <td className="border border-white/10 px-3 py-2">Enhanced IAQ requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BB101</td>
                      <td className="border border-white/10 px-3 py-2">Schools</td>
                      <td className="border border-white/10 px-3 py-2">Ventilation criteria for educational buildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HTM 03-01</td>
                      <td className="border border-white/10 px-3 py-2">Healthcare</td>
                      <td className="border border-white/10 px-3 py-2">NHS ventilation requirements</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ventilation Effectiveness</p>
              <p className="text-sm text-white mb-2">
                Not all ventilation systems deliver air to occupants equally effectively. The ventilation effectiveness factor
                accounts for this variation.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effectiveness</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Perfect mixing</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">Theoretical ideal</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ceiling supply/return</td>
                      <td className="border border-white/10 px-3 py-2">0.8-1.0</td>
                      <td className="border border-white/10 px-3 py-2">Typical mixing ventilation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Displacement</td>
                      <td className="border border-white/10 px-3 py-2">1.0-1.2</td>
                      <td className="border border-white/10 px-3 py-2">Stratification improves breathing zone</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Under-floor air</td>
                      <td className="border border-white/10 px-3 py-2">1.0-1.2</td>
                      <td className="border border-white/10 px-3 py-2">Similar to displacement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Personal ventilation</td>
                      <td className="border border-white/10 px-3 py-2">1.5-2.0</td>
                      <td className="border border-white/10 px-3 py-2">Direct supply to breathing zone</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design consideration:</strong> Higher ventilation effectiveness allows lower total airflow rates
              whilst maintaining equivalent air quality at the breathing zone, reducing both capital and operating costs.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Ventilation Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the fresh air supply rate for an open-plan office measuring 25m × 20m with a 2.8m ceiling height. Design occupancy is 1 person per 8 m².
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Step 1: Calculate occupancy</strong></p>
                <p>Floor area = 25 × 20 = 500 m²</p>
                <p>Occupancy = 500 / 8 = 62.5, round up to 63 persons</p>
                <p className="mt-2"><strong>Step 2: Per-person method (Part F)</strong></p>
                <p>Q = 63 × 10 L/s = 630 L/s</p>
                <p className="mt-2"><strong>Step 3: Air change rate method (6 ACH)</strong></p>
                <p>Volume = 500 × 2.8 = 1400 m³</p>
                <p>Q = (1400 × 6) / 3.6 = 2333 L/s</p>
                <p className="mt-2 text-green-400"><strong>Design requirement:</strong> 2333 L/s (higher value)</p>
                <p className="text-white/60 mt-1">Note: Total airflow includes recirculated air; minimum 630 L/s must be outdoor air</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: CO2-Based Ventilation Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A meeting room has 12 occupants. Outdoor CO2 is 420 ppm. The target indoor CO2 is 800 ppm. Calculate the required outdoor air supply rate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using: Ci = Co + (N × G) / Q</p>
                <p>Rearranging: Q = (N × G) / (Ci - Co)</p>
                <p className="mt-2">Where:</p>
                <p>N = 12 occupants</p>
                <p>G = 18 L/h per person (sedentary) = 0.005 L/s = 5 mL/s</p>
                <p>Ci = 800 ppm (target)</p>
                <p>Co = 420 ppm (outdoor)</p>
                <p className="mt-2">Q = (12 × 0.005) / ((800 - 420) × 10⁻⁶)</p>
                <p>Q = 0.06 / 0.00038 = 158 L/s</p>
                <p className="mt-2 text-green-400"><strong>Required outdoor air:</strong> 158 L/s (or 13.2 L/s per person)</p>
                <p className="text-white/60 mt-1">This exceeds the Part F minimum of 10 L/s per person to achieve 800 ppm target</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Natural Ventilation Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Assess whether single-sided natural ventilation is suitable for an office with 3m ceiling height and 12m depth from the window wall.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Single-sided ventilation limit:</strong></p>
                <p>Maximum effective depth = 2.5 × ceiling height</p>
                <p>Maximum depth = 2.5 × 3m = 7.5m</p>
                <p className="mt-2"><strong>Assessment:</strong></p>
                <p>Actual depth (12m) &gt; Maximum for single-sided (7.5m)</p>
                <p className="mt-2 text-red-400"><strong>Conclusion:</strong> Single-sided natural ventilation NOT suitable</p>
                <p className="mt-2 text-green-400"><strong>Alternatives:</strong></p>
                <p>- Cross-ventilation (if openings on opposite side): max depth = 5 × 3 = 15m ✓</p>
                <p>- Mechanical ventilation</p>
                <p>- Mixed-mode system</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Kitchen Extract Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Size the extract system for a commercial kitchen measuring 8m × 6m with a 3m ceiling height.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Step 1: Calculate volume</strong></p>
                <p>Volume = 8 × 6 × 3 = 144 m³</p>
                <p className="mt-2"><strong>Step 2: Apply CIBSE recommended ACH (25 ACH for commercial kitchen)</strong></p>
                <p>Q = (144 × 25) / 3.6 = 1000 L/s</p>
                <p className="mt-2"><strong>Step 3: Check against hood capture velocity</strong></p>
                <p>Assuming 2.5m canopy length × 1.2m width = 3m² hood area</p>
                <p>At 0.5 m/s face velocity: Q = 3 × 0.5 × 1000 = 1500 L/s</p>
                <p className="mt-2 text-green-400"><strong>Design extract rate:</strong> 1500 L/s (higher value)</p>
                <p className="text-white/60 mt-1">Supply air must balance extract, typically 80-90% to maintain slight negative pressure</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 5: Demand Control Ventilation Savings</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Estimate annual energy savings from DCV in a 100-person office running 50 hours per week at 40% average occupancy versus design maximum.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Design airflow:</strong></p>
                <p>Q_design = 100 persons × 10 L/s = 1000 L/s = 1 m³/s</p>
                <p className="mt-2"><strong>Average actual (40% occupancy):</strong></p>
                <p>Q_actual = 40 persons × 10 L/s + background = approximately 500 L/s = 0.5 m³/s</p>
                <p className="mt-2"><strong>Fan power reduction (cube law):</strong></p>
                <p>Power ratio = (0.5/1.0)³ = 0.125 = 12.5% of design power</p>
                <p className="mt-2"><strong>Assuming 2kW design fan power:</strong></p>
                <p>Without DCV: 2kW × 50h × 52 weeks = 5200 kWh/year</p>
                <p>With DCV: 2kW × 0.125 × 50h × 52 = 650 kWh/year</p>
                <p className="mt-2 text-green-400"><strong>Annual savings:</strong> 4550 kWh (87.5% reduction in fan energy)</p>
                <p className="text-white/60 mt-1">Additional savings from reduced heating/cooling of outdoor air</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulae</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>ACH = (Q × 3600) / V</strong> — Air changes per hour</li>
                <li className="pl-1"><strong>Q (L/s) = (ACH × V) / 3.6</strong> — Flow rate from ACH</li>
                <li className="pl-1"><strong>Ci = Co + (N × G) / Q</strong> — Steady-state CO2</li>
                <li className="pl-1"><strong>Single-sided depth ≤ 2.5 × H</strong> — Natural ventilation limit</li>
                <li className="pl-1"><strong>Cross-vent depth ≤ 5 × H</strong> — Cross-ventilation limit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Office fresh air: <strong>10 L/s per person</strong> (Part F minimum)</li>
                <li className="pl-1">Classroom fresh air: <strong>8 L/s per person</strong></li>
                <li className="pl-1">Outdoor CO2: <strong>400-450 ppm</strong></li>
                <li className="pl-1">Good indoor CO2: <strong>&lt;800 ppm</strong></li>
                <li className="pl-1">Maximum acceptable CO2: <strong>1000 ppm</strong></li>
                <li className="pl-1">Dwelling background rate: <strong>0.3 L/s per m² floor area</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing total air with fresh air:</strong> Recirculated air does not count towards outdoor air requirements</li>
                <li className="pl-1"><strong>Ignoring ventilation effectiveness:</strong> Poor diffuser placement reduces actual delivered air quality</li>
                <li className="pl-1"><strong>Over-relying on CO2:</strong> Does not detect all pollutants; additional monitoring may be needed</li>
                <li className="pl-1"><strong>Underestimating infiltration losses:</strong> Leaky buildings have uncontrolled ventilation</li>
                <li className="pl-1"><strong>Neglecting commissioning:</strong> Systems must be balanced and tested to achieve design performance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Integration Points</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">CO2 sensors in return air and/or occupied zones</li>
                <li className="pl-1">Temperature and humidity monitoring</li>
                <li className="pl-1">Outdoor air damper position feedback</li>
                <li className="pl-1">Filter differential pressure for maintenance alerts</li>
                <li className="pl-1">Fan speed and power monitoring</li>
                <li className="pl-1">Occupancy sensor integration for DCV</li>
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
                <p className="font-medium text-white mb-1">Ventilation Rates</p>
                <ul className="space-y-0.5">
                  <li>Office: 10 L/s per person, 4-6 ACH</li>
                  <li>Classroom: 8 L/s per person, 5-8 ACH</li>
                  <li>Kitchen: 20-30 ACH minimum</li>
                  <li>Operating theatre: 15-25 ACH</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">IAQ Targets</p>
                <ul className="space-y-0.5">
                  <li>CO2: Below 800-1000 ppm</li>
                  <li>Humidity: 40-60% RH</li>
                  <li>Temperature: 20-24°C comfort range</li>
                  <li>Outdoor air: Verify at least 10 L/s per person</li>
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
            <Link to="../h-n-c-module8-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 1
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section2-2">
              Next: Air Handling Units
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section2_1;
