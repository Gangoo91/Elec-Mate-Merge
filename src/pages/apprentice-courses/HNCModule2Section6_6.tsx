/**
 * Module 2 · Section 6 · Subsection 6 — Compliance and Verification
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Building Regulations Part L, BREEAM, NABERS UK, DEC and post-occupancy
 *   evaluation — the regulatory and voluntary verification regimes the HNC
 *   engineer navigates from RIBA-2 to year-3 aftercare.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Compliance and Verification - HNC Module 2 Section 6.6';
const DESCRIPTION =
  'Master building services compliance and verification: Part L Building Regulations, BREEAM assessment, NABERS UK, post-occupancy evaluation, Soft Landings, and Display Energy Certificates.';

const quickCheckQuestions = [
  {
    id: 'part-l-purpose',
    question: 'What is the primary purpose of Part L of the Building Regulations?',
    options: [
      'Safe identification and isolation',
      '+/- 10% of design flow rate',
      'Conservation of fuel and power',
      'Check for proper sealing and protection',
    ],
    correctIndex: 2,
    explanation:
      "Part L 'Conservation of fuel and power' sets requirements for energy efficiency in new and renovated buildings, including fabric performance, system efficiency, and carbon emission limits.",
  },
  {
    id: 'breeam-rating',
    question: 'What is the highest BREEAM rating achievable?',
    options: [
      'Excellent',
      'Outstanding',
      'A+++',
      'Platinum',
    ],
    correctIndex: 1,
    explanation:
      'BREEAM ratings are: Pass, Good, Very Good, Excellent, and Outstanding. Outstanding (≥85%) represents exemplary performance and requires exceptional levels of sustainability.',
  },
  {
    id: 'dec-basis',
    question: 'Display Energy Certificates (DECs) are based on:',
    options: [
      'Actual metered energy consumption',
      'Design calculations',
      'Building Regulations compliance',
      'Equipment specifications',
    ],
    correctIndex: 0,
    explanation:
      'DECs use actual metered energy consumption (operational rating) compared against TM46 benchmarks. This differs from EPCs which use design-stage calculations (asset rating).',
  },
  {
    id: 'poe-timing',
    question: 'Post-Occupancy Evaluation should ideally be conducted:',
    options: [
      'At 12 months and ongoing',
      'Before practical completion',
      'Only if problems occur',
      'Immediately after handover only',
    ],
    correctIndex: 0,
    explanation:
      'POE should be conducted at 12 months (after seasonal variation) and repeated periodically. This allows assessment of actual performance against design intent and identification of optimisation opportunities.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Part L 2021 introduced which significant change for new buildings?',
    options: [
      'Ongoing learning is needed as standards and technology change',
      '30-31% reduction in carbon emissions compared to Part L 2013',
      'Easy to read, auto-ranging, and can capture transients',
      'The ACAS Code of Practice on Disciplinary and Grievance Procedures',
    ],
    correctAnswer: 1,
    explanation:
      'Part L 2021 introduced approximately 30-31% reduction in carbon emissions for new buildings compared to Part L 2013, as a stepping stone towards the Future Homes/Buildings Standard.',
  },
  {
    id: 2,
    question: 'BREEAM stands for:',
    options: [
      'Building Rating for Energy Efficiency and Management',
      'BRE Energy Assessment Methodology',
      'Building Research Establishment Environmental Assessment Method',
      'British Regulations for Energy and Environmental Assessment Methods',
    ],
    correctAnswer: 2,
    explanation:
      "BREEAM is the Building Research Establishment Environmental Assessment Method, the world's leading sustainability assessment method for buildings, covering multiple environmental categories.",
  },
  {
    id: 3,
    question: 'Which BREEAM category covers energy performance?',
    options: [
      'Hea (Health and Wellbeing)',
      'Man (Management)',
      'Pol (Pollution)',
      'Ene (Energy)',
    ],
    correctAnswer: 3,
    explanation:
      'The Ene (Energy) category covers energy efficiency measures including Part L compliance, sub-metering, energy-efficient systems, and renewable energy provision.',
  },
  {
    id: 4,
    question: 'NABERS UK is primarily used for:',
    options: [
      'Rating operational energy performance of existing offices',
      'Building Research Establishment Environmental Assessment Method',
      'Performance 20% worse than the TM46 benchmark',
      'Buildings to be net zero carbon ready with no fossil fuel heating',
    ],
    correctAnswer: 0,
    explanation:
      'NABERS UK (National Australian Built Environment Rating System) rates the operational energy performance of existing office buildings based on actual measured consumption, with ratings from 1 to 6 stars.',
  },
  {
    id: 5,
    question: 'A building has a DEC rating of 120. This indicates:',
    options: [
      'Rating operational energy performance of existing offices',
      'Performance 20% worse than the TM46 benchmark',
      'BRE (Building Research Establishment)',
      'BSRIA and Usable Buildings Trust',
    ],
    correctAnswer: 1,
    explanation:
      'A DEC rating of 120 means the building uses 120% of the TM46 typical benchmark energy - i.e., 20% more than the typical building of that type. Lower numbers indicate better performance.',
  },
  {
    id: 6,
    question: 'Which organisation administers BREEAM?',
    options: [
      'Vertical line upward (nearly)',
      'Enhanced protection and load management systems',
      'BRE (Building Research Establishment)',
      'A contactor (the first contactor in the circuit)',
    ],
    correctAnswer: 2,
    explanation:
      'BREEAM is administered by BRE Global, part of the Building Research Establishment. Assessments must be conducted by licensed BREEAM assessors.',
  },
  {
    id: 7,
    question: 'Post-Occupancy Evaluation (POE) typically includes:',
    options: [
      'Rating operational energy performance of existing offices',
      'Buildings to be net zero carbon ready with no fossil fuel heating',
      'Assessing operational performance of existing buildings',
      'Building user surveys, energy analysis, and environmental monitoring',
    ],
    correctAnswer: 3,
    explanation:
      'POE includes: energy consumption analysis; environmental monitoring (temperature, CO2, lighting); building user surveys (satisfaction, comfort); and comparison against design predictions.',
  },
  {
    id: 8,
    question: 'The Soft Landings framework was developed by:',
    options: [
      'BSRIA and Usable Buildings Trust',
      'Increases as temperature rises',
      'SBEM (Simplified Building Energy Model)',
      'Earthing connection for the armour',
    ],
    correctAnswer: 0,
    explanation:
      'Soft Landings was developed by BSRIA and the Usable Buildings Trust to address the performance gap and ensure buildings perform as intended through structured handover and aftercare.',
  },
  {
    id: 9,
    question: 'EPCs are required for buildings when:',
    options: [
      '0.6 air changes per hour @ 50Pa',
      'Building is sold, rented, or constructed',
      'Waste Transfer Note or Consignment Note',
      'BS 1192 / AEC (UK) layer naming',
    ],
    correctAnswer: 1,
    explanation:
      "Energy Performance Certificates are required when a building is constructed, sold, or let. They are valid for 10 years and rate the building's energy efficiency on an A-G scale.",
  },
  {
    id: 10,
    question: "BREEAM 'In-Use' is designed for:",
    options: [
      'Building Research Establishment Environmental Assessment Method',
      'Buildings to be net zero carbon ready with no fossil fuel heating',
      'Assessing operational performance of existing buildings',
      'Rating operational energy performance of existing offices',
    ],
    correctAnswer: 2,
    explanation:
      'BREEAM In-Use assesses the environmental performance of existing operational buildings across three parts: Asset (building), Management (processes), and Occupier (user behaviour).',
  },
  {
    id: 11,
    question: 'Which Part L requirement applies to existing buildings undergoing renovation?',
    options: [
      'Part L1A',
      'Part L1B',
      'Part L2A',
      'Part L2B',
    ],
    correctAnswer: 3,
    explanation:
      'Part L2B covers existing non-domestic buildings undergoing renovation. It sets requirements for elements being replaced or renovated, thermal bridging, and consequential improvements.',
  },
  {
    id: 12,
    question: "The 'Future Buildings Standard' is expected to require:",
    options: [
      'Buildings to be net zero carbon ready with no fossil fuel heating',
      'Linking physical I/O signals to software representations',
      'Installation details, test results, and competent person signatures',
      'Safety data sheets with hazard information and control measures',
    ],
    correctAnswer: 0,
    explanation:
      "The Future Buildings Standard (expected 2025) will require non-domestic buildings to be 'net zero ready' - highly efficient with low-carbon heating systems and no connection to fossil fuel networks.",
  },
];

const faqs = [
  {
    question: "What's the difference between an EPC and a DEC?",
    answer:
      "An EPC (Energy Performance Certificate) is based on design-stage calculations using standardised assumptions - it's an 'asset rating' of the building itself. A DEC (Display Energy Certificate) uses actual metered consumption - it's an 'operational rating' of how the building performs in practice. EPCs are required for sales/lettings; DECs are required for public buildings over 250m².",
  },
  {
    question: 'Is BREEAM mandatory?',
    answer:
      'BREEAM is voluntary except where required by planning conditions, funding bodies, or client policies. However, many local authorities require BREEAM for planning approval, and government projects typically require BREEAM Excellent. The commercial property market increasingly expects BREEAM certification for prime office space.',
  },
  {
    question: 'How does Part L 2021 differ from previous versions?',
    answer:
      'Part L 2021 introduced: 30-31% reduction in carbon targets; new fabric performance metrics (including thermal bridging limits); updated notional building specifications; enhanced commissioning requirements; photographic evidence of key build stages; and mandatory as-built energy modelling. It represents a significant step towards the Future Buildings Standard.',
  },
  {
    question: "What is a 'consequential improvement' under Part L?",
    answer:
      "When significant building work is undertaken (extensions, major renovations), Part L may require 'consequential improvements' to the existing building's energy efficiency - such as upgrading heating systems or adding controls. This applies to buildings over 1,000m² when work affects more than 25% of the building envelope or involves major plant changes.",
  },
  {
    question: 'How often should Post-Occupancy Evaluation be conducted?',
    answer:
      'Best practice (e.g., Soft Landings) recommends: initial review at 1 month; detailed POE at 12 months (after seasonal variation); annual reviews for 3 years; and periodic reviews thereafter. Energy monitoring should be continuous. This ongoing approach identifies problems early and supports continuous improvement.',
  },
  {
    question: "What's the relationship between BREEAM and Part L?",
    answer:
      'Part L is a mandatory Building Regulation - minimum legal compliance for energy efficiency. BREEAM is a voluntary (unless required by planning) sustainability assessment that goes beyond Part L in multiple categories. BREEAM Ene 01 credits are linked to performance beyond Part L requirements - achieving credits requires exceeding minimum compliance.',
  },
];

const HNCModule2Section6_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 6"
            title="Compliance and Verification"
            description="Building Regulations, BREEAM, NABERS, post-occupancy evaluation, and performance verification."
            tone="purple"
          />

          <TLDR
            points={[
              'You demonstrate Part L compliance via SBEM/SAP showing Building Emission Rate ≤ Target Emission Rate, plus permeability testing and the building log book.',
              'You navigate BREEAM (Pass/Good/Very Good/Excellent/Outstanding) by category — picking credits with the best cost-benefit per credit point.',
              'You design with NABERS UK in mind so the building can deliver a credible operational rating once metered.',
              'You scope post-occupancy evaluation (POE) at 12 and 36 months as the bridge between predicted and operational performance.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document L (Conservation of fuel and power); BREEAM UK New Construction; NABERS UK"
            clause="Part L compliance demonstrated by Building Emission Rate ≤ Target Emission Rate calculated by SBEM (non-domestic) or SAP (domestic), with mandatory air-permeability testing and building log book at handover. BREEAM and NABERS UK are voluntary frameworks for environmental and operational rating respectively."
            meaning={
              <>
                Part L is the legal floor; BREEAM and NABERS UK are voluntary but commonly
                contractually required (planning conditions, lender requirements, ESG
                strategy). As HNC engineer you sequence Part L compliance first (mandatory),
                then BREEAM credits where they don&rsquo;t add disproportionate cost, then
                NABERS UK design rating to align design intent with measured operational
                performance.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Document L — gov.uk; BREEAM UK New Construction Technical Manual; NABERS UK Energy for Offices Rules; CIBSE TM22 Energy Assessment and Reporting Methodology."
          />

          <LearningOutcomes
            outcomes={[
              'Understand Part L Building Regulations requirements',
              'Describe BREEAM assessment categories and ratings',
              'Explain NABERS UK operational rating system',
              'Conduct post-occupancy evaluation',
              'Apply Soft Landings framework principles',
              'Interpret Display Energy Certificates',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Part L Building Regulations"
            plainEnglish="Part L is the legal floor for energy efficiency. New builds prove compliance with BER ≤ TER, plus airtightness testing and a building log book at handover."
          >
            <p>
              Part L of the Building Regulations sets mandatory requirements for the conservation of
              fuel and power in buildings. It applies to new buildings and certain works to existing
              buildings, covering fabric performance, building services efficiency, and carbon
              emissions.
            </p>
            <p>
              <strong>Part L structure (England):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part L1A:</strong> New dwellings - TER/DER comparison
              </li>
              <li>
                <strong>Part L1B:</strong> Existing dwellings - works standards
              </li>
              <li>
                <strong>Part L2A:</strong> New non-domestic - BER/TER + BBER/BTBER
              </li>
              <li>
                <strong>Part L2B:</strong> Existing non-domestic - consequential improvements
              </li>
            </ul>
            <p>
              <strong>Key Part L 2021 requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Carbon targets:</strong> BER must not exceed TER (30-31% below Part L 2013)
              </li>
              <li>
                <strong>Fabric standards:</strong> Limiting U-values for elements
              </li>
              <li>
                <strong>Primary energy:</strong> BBER must not exceed BTBER
              </li>
              <li>
                <strong>Thermal bridging:</strong> Accredited details or calculations
              </li>
              <li>
                <strong>Air tightness:</strong> Testing required (&lt;5 m³/h/m² at 50Pa)
              </li>
              <li>
                <strong>Commissioning:</strong> Building log book required
              </li>
            </ul>
            <p>
              <strong>Compliance demonstration:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design stage calculations (SBEM or DSM)</li>
              <li>As-built calculations reflecting actual construction</li>
              <li>Air tightness testing</li>
              <li>Commissioning of building services</li>
              <li>Production of building log book</li>
              <li>Production of EPC</li>
            </ul>
            <p>
              <strong>Future direction:</strong> The Future Buildings Standard (expected 2025) will
              further tighten requirements, requiring net zero ready buildings with no fossil fuel
              heating.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="BREEAM Assessment"
            plainEnglish="BREEAM rates buildings across nine categories with Energy and Health & Wellbeing carrying the most weight. Excellent (≥70%) is now the market expectation for prime offices."
          >
            <p>
              BREEAM is the world's leading sustainability assessment method for buildings. While
              voluntary, it is often required by planning authorities, funding bodies, and clients
              seeking to demonstrate environmental commitment.
            </p>
            <p>
              <strong>BREEAM categories and weightings (UK NC 2018) - category / weighting / key credits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Energy (Ene) - 15% - beyond Part L, metering, efficiency</li>
              <li>Health &amp; Wellbeing (Hea) - 14% - daylight, thermal comfort, air quality</li>
              <li>Materials (Mat) - 13.5% - environmental impact, responsible sourcing</li>
              <li>Management (Man) - 11.5% - Soft Landings, commissioning</li>
              <li>Water (Wat) - 6% - consumption reduction, metering</li>
              <li>Transport (Tra) - 9% - public transport, cycling facilities</li>
              <li>Land Use &amp; Ecology (LE) - 10% - site ecology enhancement</li>
              <li>Waste (Wst) - 7% - construction waste, operational waste</li>
              <li>Pollution (Pol) - 7% - refrigerant impact, NOx emissions</li>
              <li>Innovation - +10% - exemplary performance, innovation</li>
            </ul>
            <p>
              <strong>BREEAM ratings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pass:</strong> ≥30%
              </li>
              <li>
                <strong>Good:</strong> ≥45%
              </li>
              <li>
                <strong>Very Good:</strong> ≥55%
              </li>
              <li>
                <strong>Excellent:</strong> ≥70%
              </li>
              <li>
                <strong>Outstanding:</strong> ≥85%
              </li>
            </ul>
            <p>
              <strong>Market expectation:</strong> BREEAM Excellent is increasingly the minimum for
              prime commercial office space in major UK cities.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="NABERS UK and Display Energy Certificates"
            plainEnglish="NABERS and DECs use actual metered energy, not design calculations. They tell investors and tenants whether a building actually performs - not just whether it was promised to."
          >
            <p>
              Operational energy ratings measure actual building performance, providing
              accountability that design-stage ratings cannot. NABERS UK and DECs both serve this
              purpose using different methodologies.
            </p>
            <p>
              <strong>NABERS UK energy rating:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Origin:</strong> Adapted from successful Australian scheme
              </li>
              <li>
                <strong>Application:</strong> Office buildings (base building and tenancy)
              </li>
              <li>
                <strong>Basis:</strong> Actual energy consumption normalised for climate, hours, occupancy
              </li>
              <li>
                <strong>Rating:</strong> 1-6 stars (6 stars = market-leading performance)
              </li>
              <li>
                <strong>Use:</strong> Design for Performance, investor requirements
              </li>
            </ul>
            <p>
              <strong>Display Energy Certificates (DECs):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Required for: public buildings &gt;250m² with public access</li>
              <li>Data basis: 12 months actual metered consumption</li>
              <li>Benchmark: CIBSE TM46 typical values</li>
              <li>Rating scale: A-G (A = best, 100 = typical)</li>
              <li>Validity: 1 year (must be renewed annually)</li>
              <li>Advisory report: required every 7 years</li>
            </ul>
            <p>
              <strong>DEC vs EPC comparison:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EPC (asset rating):</strong> Based on design calculations, standard occupancy assumptions, valid 10 years, required for sale/let
              </li>
              <li>
                <strong>DEC (operational rating):</strong> Based on actual consumption, reflects real operation, valid 1 year, required for public buildings
              </li>
            </ul>
            <p>
              <strong>Trend:</strong> Operational ratings are increasingly valued by investors and
              tenants who want evidence of actual performance, not just design intent.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Post-Occupancy Evaluation and Soft Landings"
            plainEnglish="POE and Soft Landings close the loop. Once the building is in use you check it actually works as designed - and feed that back into both this building and the next one."
          >
            <p>
              Post-Occupancy Evaluation (POE) systematically assesses building performance after
              occupation. Combined with the Soft Landings framework, it closes the feedback loop
              between design intent and operational reality.
            </p>
            <p>
              <strong>POE components (component / method / purpose):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Energy analysis - meter data vs TM54 prediction - identify performance gap</li>
              <li>User surveys - BUS methodology or similar - occupant satisfaction</li>
              <li>Environmental monitoring - temperature, CO2, humidity - comfort conditions</li>
              <li>Walkthrough - physical inspection - defects, usability issues</li>
              <li>BMS review - control strategy analysis - optimisation opportunities</li>
            </ul>
            <p>
              <strong>Soft Landings framework:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1 - Inception:</strong> Set performance targets and POE plan
              </li>
              <li>
                <strong>Stage 2 - Design:</strong> Reality checks, buildability reviews
              </li>
              <li>
                <strong>Stage 3 - Pre-handover:</strong> Prepare for operation, training
              </li>
              <li>
                <strong>Stage 4 - Initial aftercare:</strong> Intensive support (weeks 1-4)
              </li>
              <li>
                <strong>Stage 5 - Extended aftercare:</strong> Monitoring and tuning (3 years)
              </li>
            </ul>
            <p>
              <strong>POE benefits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identifies issues before they become embedded problems</li>
              <li>Validates design decisions for future projects</li>
              <li>Supports energy optimisation and cost savings</li>
              <li>Improves occupant satisfaction and productivity</li>
              <li>Provides feedback to design teams</li>
            </ul>
            <p>
              <strong>BREEAM credit:</strong> Man 04 provides credits for Soft Landings commitment,
              recognising the value of structured aftercare in achieving design performance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three examples covering a Part L pass/fail check, a school's DEC rating, and the Ene 01 BREEAM credits earned by exceeding Part L."
          >
            <p>
              <strong>Example 1 - Part L compliance check:</strong> New office building SBEM
              results.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>TER (Target Emission Rate): 28.5 kgCO₂/m²/year</li>
              <li>BER (Building Emission Rate): 25.2 kgCO₂/m²/year</li>
              <li>BTBER (Target Primary Energy): 145 kWh/m²/year</li>
              <li>BBER (Building Primary Energy): 132 kWh/m²/year</li>
              <li>BER (25.2) ≤ TER (28.5) ✓</li>
              <li>BBER (132) ≤ BTBER (145) ✓</li>
              <li><strong>Building COMPLIES with Part L 2021</strong></li>
              <li>Margin: 11.6% below TER (headroom for as-built)</li>
            </ul>
            <p>
              <strong>Example 2 - DEC rating calculation:</strong> School building annual energy
              consumption.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Floor area: 3,500 m² (GIA); Electricity: 185,000 kWh/year; Gas: 420,000 kWh/year</li>
              <li>EUI: electricity 52.9 kWh/m², gas 120 kWh/m²</li>
              <li>TM46 typical (schools): elec 41 kWh/m², fossil 150 kWh/m²</li>
              <li>Actual CO₂: (52.9 × 0.233) + (120 × 0.184) = 34.4 kgCO₂/m²</li>
              <li>Typical CO₂: (41 × 0.233) + (150 × 0.184) = 37.1 kgCO₂/m²</li>
              <li>DEC Rating: (34.4 / 37.1) × 100 = <strong>93 (Band D)</strong></li>
              <li>School performs better than typical</li>
            </ul>
            <p>
              <strong>Example 3 - BREEAM energy credits:</strong> Office targeting BREEAM
              Excellent - Ene 01 credits.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>EPRNC = (BER × 1.0 + BBER × 0.5) / (TER × 1.0 + BTBER × 0.5)</li>
              <li>Building data: BER 22 kgCO₂/m², TER 28 kgCO₂/m², BBER 115 kWh/m², BTBER 145 kWh/m²</li>
              <li>EPRNC = (22 + 57.5) / (28 + 72.5) = 79.5 / 100.5 = 0.79</li>
              <li>EPRNC of 0.79 = 21% improvement over Part L</li>
              <li><strong>5 Ene 01 credits (BREEAM 2018 scoring)</strong></li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The compliance documents you need to assemble, plus the POE habits that make sure the building actually delivers."
          >
            <p>
              <strong>Compliance checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Part L calculations (design stage and as-built)</li>
              <li>Air tightness testing</li>
              <li>Commissioning certificates</li>
              <li>Building log book</li>
              <li>EPC certificate</li>
              <li>BREEAM assessment (if required)</li>
            </ul>
            <p>
              <strong>POE planning:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Define POE scope and budget at project inception</li>
              <li>Install sub-metering for meaningful energy analysis</li>
              <li>Plan user surveys at 12 months</li>
              <li>Allow for seasonal commissioning verification</li>
              <li>Document design intent for comparison</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common compliance issues"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>As-built differs from design:</strong> Re-run calculations
                </li>
                <li>
                  <strong>Air tightness failure:</strong> Remediate and retest
                </li>
                <li>
                  <strong>Missing commissioning:</strong> Cannot sign off without
                </li>
                <li>
                  <strong>Log book incomplete:</strong> Part L requirement
                </li>
              </ul>
            }
            doInstead="Re-run as-built calculations whenever the install differs from design, remediate and retest after any air-tightness failure, get full commissioning evidence before sign-off, and complete the building log book before practical completion."
          />

          <SectionRule />

          <Scenario
            title="Designing-in NABERS UK 5-star for a Build-to-Rent commercial tower"
            situation={
              <>
                A 28,000 m² commercial tower in central London is targeting NABERS UK
                Design Reviewed Target Rating of 5 stars (operational energy ≤ 70
                kWh/m²·year). The lease structure is leveraging NABERS as a tenant
                attraction. You are the M&amp;E lead from RIBA-2.
              </>
            }
            whatToDo={
              <>
                At Stage-2: lock the form-factor, glazing ratio and orientation with
                early-stage TM54 forecasting against the NABERS 5-star envelope. At
                Stage-3: drive the HVAC strategy (typically VRF or 4-pipe FCU + heat
                recovery + free cooling), lighting LPD, and landlord small power. At
                Stage-4: complete the NABERS UK Design Reviewed Target Rating submission
                with full TM54 backing. At year-1 operation: verify against 12-month
                metered consumption per the NABERS UK Rules. At year-3: re-rate.
              </>
            }
            whyItMatters={
              <>
                NABERS UK 5-star buildings command 5–10% lease premium and lower void rates
                in central London. The rating is operational, not theoretical — so design
                decisions taken at Stage-2 (form factor, services strategy) determine
                whether 5 stars is achievable. Get the NABERS forecast wrong at Stage-2 and
                the entire commercial proposition is at risk.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Part L compliance: BER ≤ TER via SBEM (non-domestic) or SAP (domestic); legal floor.',
              'Compliance evidence: SBEM/SAP report, air-permeability test, building log book, commissioning records.',
              'BREEAM rating: Pass / Good / Very Good / Excellent / Outstanding — credit-based across 9 categories.',
              'NABERS UK: operational rating from 1–6 stars based on metered energy use over 12 months.',
              'DEC (Display Energy Certificate): mandatory for public buildings &gt; 250 m² — operational kWh/m²·year.',
              'POE (post-occupancy evaluation) at 12 and 36 months — the bridge between predicted and operational.',
              'CIBSE TM22 is the UK methodology for measured energy reporting and benchmarking.',
              'Voluntary schemes (BREEAM, NABERS UK) are increasingly contractually mandated by lenders and planning.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                System integration
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Back to module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                HNC Module 2
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section6_6;
