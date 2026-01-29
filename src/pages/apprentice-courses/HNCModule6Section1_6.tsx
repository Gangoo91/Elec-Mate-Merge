import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Documentation and Handover - HNC Module 6 Section 1.6";
const DESCRIPTION = "Master documentation and handover requirements for building services projects: EPCs, commissioning certificates, building log books, as-built documentation, Part L evidence, and Building Control sign-off procedures.";

const quickCheckQuestions = [
  {
    id: "epc-definition",
    question: "What does an Energy Performance Certificate (EPC) demonstrate?",
    options: ["The building's structural integrity", "The building's energy efficiency rating from A to G", "The building's fire safety compliance", "The building's accessibility compliance"],
    correctIndex: 1,
    explanation: "An EPC rates a building's energy efficiency on a scale from A (most efficient) to G (least efficient). It is a legal requirement when buildings are constructed, sold, or let, and provides recommendations for improving energy performance."
  },
  {
    id: "building-log-book",
    question: "What is the primary purpose of a building log book?",
    options: ["To record visitor access to the building", "To document the building's energy systems and provide operational guidance", "To list all contractors who worked on the building", "To store warranty certificates only"],
    correctIndex: 1,
    explanation: "A building log book documents the energy-consuming systems, their design parameters, and operational guidance to enable efficient building operation. It is a requirement under Part L of the Building Regulations."
  },
  {
    id: "as-built-documentation",
    question: "As-built drawings differ from construction drawings because they:",
    options: ["Use different paper sizes", "Show the installation as actually constructed, including all variations", "Are produced by the client rather than the contractor", "Do not require approval"],
    correctIndex: 1,
    explanation: "As-built drawings record the installation as actually constructed, incorporating all variations, changes, and RFIs that occurred during construction. They are essential for future maintenance and modifications."
  },
  {
    id: "part-l-evidence",
    question: "Part L evidence must demonstrate compliance with:",
    options: ["Fire safety requirements", "Accessibility standards", "Energy efficiency and carbon emission targets", "Structural loading requirements"],
    correctIndex: 2,
    explanation: "Part L of the Building Regulations covers the conservation of fuel and power. Evidence must demonstrate that the building meets energy efficiency requirements and carbon emission targets through design calculations and as-built verification."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Who is legally responsible for commissioning a valid EPC for a new building?",
    options: [
      "The building occupier",
      "The person carrying out the building work (typically the developer)",
      "The local authority",
      "The energy assessor"
    ],
    correctAnswer: 1,
    explanation: "Under the Building Regulations, the person carrying out the building work is responsible for ensuring a valid EPC is produced. For new builds, this is typically the developer or principal contractor."
  },
  {
    id: 2,
    question: "A commissioning certificate for an HVAC system should include:",
    options: ["Design calculations only", "Equipment warranties only", "Test results demonstrating the system meets design intent", "Marketing specifications"],
    correctAnswer: 2,
    explanation: "Commissioning certificates must include test results and data demonstrating that installed systems meet their design intent, including flow rates, temperatures, pressures, and control responses as appropriate."
  },
  {
    id: 3,
    question: "The building log book requirement under Part L applies to buildings with:",
    options: [
      "Any heating or cooling system",
      "Total useful floor area greater than 500m²",
      "More than 10 occupants",
      "Commercial use only"
    ],
    correctAnswer: 1,
    explanation: "Part L requires a building log book for buildings with a total useful floor area greater than 500m². The log book provides information about the building's energy systems to enable efficient operation."
  },
  {
    id: 4,
    question: "Which document provides evidence that fixed building services have been commissioned in accordance with approved procedures?",
    options: [
      "Design certificate",
      "Commissioning Plan",
      "Notice of commissioning (Regulation 44)",
      "Building log book"
    ],
    correctAnswer: 2,
    explanation: "Regulation 44 of the Building Regulations requires that a notice of commissioning be given to Building Control, confirming that fixed building services have been commissioned in accordance with an approved procedure."
  },
  {
    id: 5,
    question: "As-built documentation should be submitted:",
    options: [
      "Before construction begins",
      "At practical completion, before final handover",
      "Six months after occupation",
      "Only when requested by the client"
    ],
    correctAnswer: 1,
    explanation: "As-built documentation should be completed and submitted at practical completion, before final handover. This enables the client to operate and maintain the building effectively from day one."
  },
  {
    id: 6,
    question: "What is the minimum EPC rating required for new non-domestic buildings under current regulations?",
    options: [
      "Rating E or above",
      "Rating D or above",
      "Rating B or above",
      "There is no minimum; buildings must meet Part L requirements"
    ],
    correctAnswer: 3,
    explanation: "New buildings must demonstrate compliance with Part L through the SBEM or DSM methodology, which determines the calculated emission rate. The EPC rating follows from this compliance rather than being a standalone minimum requirement."
  },
  {
    id: 7,
    question: "O&M manuals for building services should include:",
    options: [
      "Design calculations and tender documents",
      "Operating procedures, maintenance schedules, and equipment data",
      "Staff training records",
      "Construction programme and progress reports"
    ],
    correctAnswer: 1,
    explanation: "O&M manuals provide essential information for operating and maintaining building services, including operating procedures, maintenance schedules, equipment specifications, spare parts lists, and manufacturer documentation."
  },
  {
    id: 8,
    question: "Part L evidence for a new building must demonstrate that:",
    options: [
      "The building looks attractive",
      "The BER does not exceed the TER",
      "All materials are locally sourced",
      "The building can accommodate future expansion"
    ],
    correctAnswer: 1,
    explanation: "Part L evidence must demonstrate that the Building Emission Rate (BER) does not exceed the Target Emission Rate (TER). This is calculated using approved software (SBEM for non-domestic buildings) and verified through as-built assessments."
  },
  {
    id: 9,
    question: "Which of these is NOT typically included in handover documentation?",
    options: [
      "Test certificates and commissioning data",
      "As-built drawings",
      "Tender pricing breakdowns",
      "Warranty information"
    ],
    correctAnswer: 2,
    explanation: "Tender pricing breakdowns are commercial documents that remain confidential and are not part of handover documentation. Handover focuses on technical information needed to operate and maintain the building."
  },
  {
    id: 10,
    question: "A Building Control completion certificate confirms:",
    options: [
      "The building meets all planning conditions",
      "Building work complies with the Building Regulations",
      "The building is ready for occupation",
      "All contractor warranties are in place"
    ],
    correctAnswer: 1,
    explanation: "A completion certificate from Building Control confirms that the building work, as inspected, complies with the applicable Building Regulations. It is a legal requirement before occupation of new buildings."
  },
  {
    id: 11,
    question: "Soft landings procedures are designed to:",
    options: [
      "Reduce construction costs",
      "Accelerate the construction programme",
      "Ensure smooth transition from construction to operation",
      "Eliminate the need for commissioning"
    ],
    correctAnswer: 2,
    explanation: "Soft landings is an approach that ensures smooth transition from construction to operation, with extended aftercare, user training, and post-occupancy evaluation to close the performance gap between design intent and actual operation."
  },
  {
    id: 12,
    question: "The defects liability period typically begins:",
    options: [
      "At contract award",
      "At practical completion",
      "At final certificate",
      "12 months after occupation"
    ],
    correctAnswer: 1,
    explanation: "The defects liability period (typically 12 months) begins at practical completion. During this period, the contractor must return to rectify any defects that emerge, at no additional cost to the client."
  }
];

const faqs = [
  {
    question: "What happens if Part L evidence is incomplete at handover?",
    answer: "Incomplete Part L evidence prevents Building Control from issuing a completion certificate, which can delay occupation and trigger contractual penalties. The contractor must provide all required calculations, commissioning data, and as-built verification before sign-off. In some cases, provisional certificates may be issued with conditions, but full compliance must be achieved within a specified timeframe."
  },
  {
    question: "How long must building documentation be retained?",
    answer: "Building documentation should be retained for the life of the building for maintenance and future works. EPCs are valid for 10 years. Under CDM Regulations, the Health and Safety File must be retained and updated throughout the building's life. For contractual purposes, documentation should be retained for at least 12 years (limitation period for contracts under deed) or 6 years for simple contracts."
  },
  {
    question: "Who produces the EPC for a new building?",
    answer: "An EPC for a new building must be produced by an accredited On Construction Domestic Energy Assessor (OCDEA) for dwellings, or a Non-Domestic Energy Assessor (NDEA) for other buildings. They use approved calculation methodologies (SAP for dwellings, SBEM for non-domestic) and must be registered with an approved accreditation scheme."
  },
  {
    question: "What is the difference between practical completion and final completion?",
    answer: "Practical completion occurs when the works are substantially complete and the building can be used for its intended purpose, even if minor defects remain. Final completion occurs after the defects liability period when all defects have been rectified and the final account agreed. Handover documentation is required at practical completion, with any outstanding items on a snagging list."
  },
  {
    question: "Can Building Control reject commissioning certificates?",
    answer: "Yes, Building Control can reject commissioning certificates if they are incomplete, lack sufficient detail, or do not demonstrate compliance with design intent. Certificates must include actual test results, comparison with design parameters, and confirmation that systems meet Building Regulations requirements. Generic or template certificates without project-specific data are likely to be rejected."
  },
  {
    question: "What training should be provided at handover?",
    answer: "Training should cover all building systems relevant to the user, including HVAC operation, lighting controls, BMS interfaces, fire alarm procedures, and emergency systems. Training should be documented with attendance records and provided at appropriate levels for different user groups (facilities managers, operators, general users). Video recordings and written guides enhance the training package."
  }
];

const HNCModule6Section1_6 = () => {
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
            <span>Module 6.1.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Documentation and Handover
          </h1>
          <p className="text-white/80">
            EPCs, commissioning certificates, building log books, as-built documentation, Part L evidence, and handover procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>EPC:</strong> Energy rating A-G, required for all new buildings</li>
              <li className="pl-1"><strong>Part L:</strong> BER must not exceed TER for compliance</li>
              <li className="pl-1"><strong>Log book:</strong> Required for buildings over 500m²</li>
              <li className="pl-1"><strong>Regulation 44:</strong> Notice of commissioning to Building Control</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Commissioning:</strong> Test data proving design intent achieved</li>
              <li className="pl-1"><strong>As-built:</strong> Drawings showing actual installation</li>
              <li className="pl-1"><strong>O&M manuals:</strong> Operation and maintenance information</li>
              <li className="pl-1"><strong>Handover:</strong> Training, documentation, sign-off</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand EPC requirements and energy rating methodology",
              "Prepare commissioning certificates meeting Building Regulations",
              "Develop building log books compliant with Part L requirements",
              "Compile as-built documentation packages for handover",
              "Assemble Part L evidence for Building Control approval",
              "Execute structured handover procedures including training"
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

        {/* Section 1: Energy Performance Certificates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Energy Performance Certificates (EPCs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy Performance Certificates are a legal requirement for buildings when constructed, sold, or let. They provide a standardised rating of energy efficiency and recommendations for improvement, enabling comparison between properties and informing decisions about energy use.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">EPC Rating Scale</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Rating A (1-25):</strong> Most efficient - typical of new builds with excellent insulation and renewables</li>
                <li className="pl-1"><strong>Rating B (26-50):</strong> Very efficient - well-designed new buildings with good controls</li>
                <li className="pl-1"><strong>Rating C (51-75):</strong> Efficient - meets current Building Regulations minimum standards</li>
                <li className="pl-1"><strong>Rating D (76-100):</strong> Average efficiency - typical of 1990s-2000s construction</li>
                <li className="pl-1"><strong>Rating E-G (101+):</strong> Below average to poor - older buildings requiring improvement</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EPC Requirements for New Buildings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Domestic (SAP)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Non-Domestic (SBEM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">When required</td>
                      <td className="border border-white/10 px-3 py-2">Before occupation</td>
                      <td className="border border-white/10 px-3 py-2">Before occupation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Assessor type</td>
                      <td className="border border-white/10 px-3 py-2">OCDEA accredited</td>
                      <td className="border border-white/10 px-3 py-2">NDEA accredited</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Calculation method</td>
                      <td className="border border-white/10 px-3 py-2">SAP 10.2</td>
                      <td className="border border-white/10 px-3 py-2">SBEM/DSM</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Validity period</td>
                      <td className="border border-white/10 px-3 py-2">10 years</td>
                      <td className="border border-white/10 px-3 py-2">10 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Registration</td>
                      <td className="border border-white/10 px-3 py-2">EPC Register</td>
                      <td className="border border-white/10 px-3 py-2">Non-Domestic EPC Register</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EPC Documentation Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Design stage SAP/SBEM calculations (predicted rating)</li>
                <li className="pl-1">As-built calculations reflecting actual construction</li>
                <li className="pl-1">U-value calculations for building fabric elements</li>
                <li className="pl-1">Air permeability test results</li>
                <li className="pl-1">Heating/cooling system specifications</li>
                <li className="pl-1">Lighting specifications and controls</li>
                <li className="pl-1">Renewable energy system details (if applicable)</li>
                <li className="pl-1">Registered EPC certificate with unique reference number</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Building services installations directly impact EPC ratings through heating/cooling efficiency, lighting efficacy, and controls effectiveness.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Commissioning Certificates and Part L Evidence */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Commissioning Certificates and Part L Evidence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commissioning certificates provide documented evidence that building services systems have been installed correctly and operate as designed. Under Part L, commissioning is mandatory and must be notified to Building Control through Regulation 44.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 44 Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Notice that commissioning has been carried out</li>
                  <li className="pl-1">Confirmation of approved procedures followed</li>
                  <li className="pl-1">Results demonstrate design intent achieved</li>
                  <li className="pl-1">Submit within 30 days of work completion</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Systems Requiring Commissioning</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Heating and hot water systems</li>
                  <li className="pl-1">Cooling and air conditioning</li>
                  <li className="pl-1">Mechanical ventilation</li>
                  <li className="pl-1">Lighting systems and controls</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Evidence Package</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BRUKL/SBEM output</td>
                      <td className="border border-white/10 px-3 py-2">Demonstrates BER ≤ TER compliance</td>
                      <td className="border border-white/10 px-3 py-2">Design and as-built stages</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">U-value calculations</td>
                      <td className="border border-white/10 px-3 py-2">Confirms fabric performance</td>
                      <td className="border border-white/10 px-3 py-2">Design stage, verified as-built</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air test certificate</td>
                      <td className="border border-white/10 px-3 py-2">Confirms air permeability target met</td>
                      <td className="border border-white/10 px-3 py-2">As-built only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning certificates</td>
                      <td className="border border-white/10 px-3 py-2">Systems meet design intent</td>
                      <td className="border border-white/10 px-3 py-2">Completion stage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EPC certificate</td>
                      <td className="border border-white/10 px-3 py-2">Official energy rating</td>
                      <td className="border border-white/10 px-3 py-2">Before occupation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Commissioning Certificate Content</p>
              <div className="text-sm space-y-1 text-white/90">
                <p><strong>Project details:</strong> Name, address, Building Control reference</p>
                <p><strong>System identification:</strong> Description, location, design parameters</p>
                <p><strong>Test results:</strong> Measured values vs design values</p>
                <p><strong>Compliance statement:</strong> Confirmation system meets design intent</p>
                <p><strong>Certification:</strong> Signed by competent commissioning engineer</p>
                <p><strong>Date and reference:</strong> Unique certificate number</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use CIBSE Commissioning Code M templates to ensure certificates contain all required information and are accepted by Building Control.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Building Log Book and As-Built Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Building Log Book and As-Built Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The building log book is a statutory requirement under Part L for buildings with a useful floor area exceeding 500m². It documents the energy-consuming systems and provides guidance for efficient operation. As-built documentation records the installation as actually constructed for future reference.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Log Book Contents (CIBSE TM31)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Part A: General Information</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Building description and use</li>
                    <li>Contact details for services</li>
                    <li>Design conditions and occupancy</li>
                    <li>Floor areas and zones</li>
                    <li>Energy targets and metering</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Part B: System Information</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>HVAC system descriptions</li>
                    <li>Heating/cooling plant details</li>
                    <li>Ventilation system data</li>
                    <li>Lighting specifications</li>
                    <li>Controls and BMS information</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">As-Built Documentation Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Format</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">As-built drawings</td>
                      <td className="border border-white/10 px-3 py-2">Show installation as actually constructed</td>
                      <td className="border border-white/10 px-3 py-2">CAD/PDF, marked-up originals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Equipment schedules</td>
                      <td className="border border-white/10 px-3 py-2">Final specifications of installed equipment</td>
                      <td className="border border-white/10 px-3 py-2">Spreadsheet/PDF</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schematics</td>
                      <td className="border border-white/10 px-3 py-2">System flow diagrams as installed</td>
                      <td className="border border-white/10 px-3 py-2">CAD/PDF</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control diagrams</td>
                      <td className="border border-white/10 px-3 py-2">Wiring and control logic as installed</td>
                      <td className="border border-white/10 px-3 py-2">CAD/PDF</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test certificates</td>
                      <td className="border border-white/10 px-3 py-2">Electrical test, pressure test results</td>
                      <td className="border border-white/10 px-3 py-2">Standardised forms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">As-Built Drawing Requirements Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All RFIs and variations incorporated</li>
                <li className="pl-1">Final equipment locations verified on site</li>
                <li className="pl-1">Cable/pipework routes as installed</li>
                <li className="pl-1">Final circuit/valve references matching labels</li>
                <li className="pl-1">Plant room layouts with clearances</li>
                <li className="pl-1">Access panel and isolation point locations</li>
                <li className="pl-1">Revision cloud removed, final issue status</li>
                <li className="pl-1">Approved for construction stamp removed</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Quality standard:</strong> As-built drawings should enable someone unfamiliar with the project to locate, identify, and maintain any installed system or component.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Handover Procedures and Building Control Sign-Off */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Handover Procedures and Building Control Sign-Off
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective handover ensures the client receives a building that performs as designed, with all documentation needed for operation and maintenance. Building Control sign-off confirms regulatory compliance and enables lawful occupation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Building Control Sign-Off Process</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">1. Submit:</span> <span className="text-white">All Part L evidence and commissioning notices</span></p>
                <p><span className="text-white/60">2. Inspect:</span> <span className="text-white">Final inspection of completed works</span></p>
                <p><span className="text-white/60">3. Review:</span> <span className="text-white">Documentation check against requirements</span></p>
                <p><span className="text-white/60">4. Issue:</span> <span className="text-white">Completion certificate (Building Regulations compliance)</span></p>
                <p><span className="text-white/60">5. Register:</span> <span className="text-white">EPC lodged on public register</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Documentation Package</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>O&M manuals:</strong> Operating procedures, maintenance schedules, equipment data</li>
                <li className="pl-1"><strong>As-built drawings:</strong> Complete set showing final installation</li>
                <li className="pl-1"><strong>Test certificates:</strong> Electrical, pressure, commissioning results</li>
                <li className="pl-1"><strong>Warranties:</strong> Equipment and workmanship warranties</li>
                <li className="pl-1"><strong>Spare parts:</strong> Recommended spares list and initial provision</li>
                <li className="pl-1"><strong>Building log book:</strong> Energy systems documentation (if over 500m²)</li>
                <li className="pl-1"><strong>Health & Safety File:</strong> CDM information for future works</li>
                <li className="pl-1"><strong>EPC certificate:</strong> Registered energy performance certificate</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Structured Handover Activities</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pre-handover</td>
                      <td className="border border-white/10 px-3 py-2">Snagging, documentation review, training planning</td>
                      <td className="border border-white/10 px-3 py-2">Contractor + Client</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Handover meeting</td>
                      <td className="border border-white/10 px-3 py-2">Formal transfer, documentation acceptance</td>
                      <td className="border border-white/10 px-3 py-2">All parties</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Training</td>
                      <td className="border border-white/10 px-3 py-2">System demonstrations, operating procedures</td>
                      <td className="border border-white/10 px-3 py-2">Contractor/specialists</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Soft landings</td>
                      <td className="border border-white/10 px-3 py-2">Extended aftercare, fine-tuning, POE</td>
                      <td className="border border-white/10 px-3 py-2">Design team + Contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Defects period</td>
                      <td className="border border-white/10 px-3 py-2">Rectification of emerging defects</td>
                      <td className="border border-white/10 px-3 py-2">Contractor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Soft Landings Framework (GSL)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stage 1:</strong> Inception and briefing - embed soft landings from start</li>
                <li className="pl-1"><strong>Stage 2:</strong> Design development - focus on usability and operability</li>
                <li className="pl-1"><strong>Stage 3:</strong> Pre-handover - prepare client, training programmes</li>
                <li className="pl-1"><strong>Stage 4:</strong> Initial aftercare - resident on site, reactive support</li>
                <li className="pl-1"><strong>Stage 5:</strong> Extended aftercare - fine-tuning, seasonal commissioning</li>
                <li className="pl-1"><strong>Stage 6:</strong> Post-occupancy evaluation - review actual vs predicted performance</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Performance gap:</strong> Soft landings addresses the common gap between design predictions and actual building performance, which can be 2-5 times greater energy use than predicted.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Part L Compliance Package for Office Building</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compile Part L evidence package for a 2,500m² office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Part L Evidence Checklist:</p>
                <p className="mt-2 text-green-400">Design Stage Documents:</p>
                <p className="ml-4">BRUKL output showing TER = 28.5 kgCO₂/m²</p>
                <p className="ml-4">Design BER = 25.2 kgCO₂/m² (meets target)</p>
                <p className="ml-4">U-value calculations for all elements</p>
                <p className="ml-4">Design air permeability: 5.0 m³/hr/m²</p>
                <p className="mt-2 text-green-400">As-Built Documents:</p>
                <p className="ml-4">Updated BRUKL with as-built specifications</p>
                <p className="ml-4">Air test certificate: 4.8 m³/hr/m² achieved</p>
                <p className="ml-4">Commissioning certificates: HVAC, lighting</p>
                <p className="ml-4">EPC rating: B (42)</p>
                <p className="mt-2 text-green-400">Regulation 44 Notice submitted to BCO</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: HVAC Commissioning Certificate</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Complete commissioning certificate for AHU serving office floors.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">AHU-01 Commissioning Certificate</p>
                <p className="mt-2">Project: City Centre Office Building</p>
                <p>System: AHU-01 serving Floors 1-3</p>
                <p className="mt-2">Parameter         | Design  | Measured | Status</p>
                <p>------------------|---------|----------|-------</p>
                <p>Supply air flow   | 5000l/s | 5050l/s  | Pass</p>
                <p>Return air flow   | 4500l/s | 4480l/s  | Pass</p>
                <p>Fresh air %       | 20%     | 21%      | Pass</p>
                <p>Supply temp (C)   | 13°C    | 13.2°C   | Pass</p>
                <p>Heating coil ΔT   | 15°C    | 14.8°C   | Pass</p>
                <p>Fan pressure (Pa) | 400Pa   | 395Pa    | Pass</p>
                <p className="mt-2 text-green-400">Certificate confirms system meets design intent</p>
                <p className="text-green-400">Signed: J. Smith, Commissioning Manager</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Handover Documentation Checklist</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify handover documentation completeness for building services.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Handover Documentation Status:</p>
                <p className="mt-2">Document                    | Status    | Notes</p>
                <p>----------------------------|-----------|----------------</p>
                <p className="text-green-400">O&M Manuals (3 volumes)     | Complete  | Approved by FM</p>
                <p className="text-green-400">As-built drawings (dwg/pdf) | Complete  | Rev P01</p>
                <p className="text-green-400">Electrical test certs       | Complete  | 15 schedules</p>
                <p className="text-green-400">HVAC commissioning certs    | Complete  | 8 systems</p>
                <p className="text-green-400">BMS graphics and points     | Complete  | USB provided</p>
                <p className="text-yellow-400">Warranties register         | Pending   | Chase suppliers</p>
                <p className="text-green-400">Building log book           | Complete  | CIBSE TM31</p>
                <p className="text-green-400">EPC certificate             | Complete  | Rating B</p>
                <p className="text-green-400">H&S File                    | Complete  | 2 copies</p>
                <p className="mt-2 text-yellow-400">Action: Chase 3 outstanding warranties</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Complete Documentation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify all Part L calculations reflect as-built installation</li>
                <li className="pl-1">Ensure commissioning certificates include measured vs design values</li>
                <li className="pl-1">Confirm EPC is registered before applying for completion certificate</li>
                <li className="pl-1">Check building log book covers all energy-consuming systems</li>
                <li className="pl-1">Validate as-built drawings show actual installed routes and locations</li>
                <li className="pl-1">Obtain signed training attendance records from client staff</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Building log book threshold: <strong>500m² useful floor area</strong></li>
                <li className="pl-1">EPC validity: <strong>10 years</strong></li>
                <li className="pl-1">Regulation 44 notice: <strong>within 30 days of completion</strong></li>
                <li className="pl-1">Documentation retention: <strong>life of building (min 12 years contractual)</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design vs as-built mismatch</strong> - Ensure calculations reflect actual installation</li>
                <li className="pl-1"><strong>Generic certificates</strong> - Commissioning data must be project-specific</li>
                <li className="pl-1"><strong>Missing air test</strong> - Required evidence, cannot be calculated</li>
                <li className="pl-1"><strong>Late EPC registration</strong> - Must be registered before occupation</li>
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
                <p className="font-medium text-white mb-1">Part L Evidence Requirements</p>
                <ul className="space-y-0.5">
                  <li>BRUKL/SBEM output (design and as-built)</li>
                  <li>U-value calculations</li>
                  <li>Air permeability test certificate</li>
                  <li>Commissioning certificates (Reg 44)</li>
                  <li>Registered EPC certificate</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Handover Documentation</p>
                <ul className="space-y-0.5">
                  <li>O&M manuals with maintenance schedules</li>
                  <li>As-built drawings (CAD and PDF)</li>
                  <li>Test certificates and warranties</li>
                  <li>Building log book (if over 500m²)</li>
                  <li>Health and Safety File</li>
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
            <Link to="../h-n-c-module6-section2-1">
              Next: Section 2.1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section1_6;
