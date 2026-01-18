import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Wind Resource Assessment - Renewable Energy Module 3";
const DESCRIPTION = "Master wind measurement technologies, Weibull distribution analysis, long-term correlation methods, and energy yield assessment for UK wind projects.";

const quickCheckQuestions = [
  {
    id: "wind-minimum-speed",
    question: "What is the minimum average annual wind speed generally considered viable for commercial wind development?",
    options: ["4-5 m/s", "6-7 m/s", "8-9 m/s", "10-11 m/s"],
    correctIndex: 1,
    explanation: "A minimum of 6-7 m/s average annual wind speed is generally required for commercial viability, though modern turbines can be economic at 5.5 m/s+ sites with optimal design."
  },
  {
    id: "wind-lidar-function",
    question: "What measurement technology can assess wind speeds at multiple heights without installing met masts?",
    options: ["Cup anemometer", "Wind vane", "LIDAR (Light Detection and Ranging)", "Barometric pressure sensor"],
    correctIndex: 2,
    explanation: "LIDAR systems use laser technology to measure wind speeds at multiple heights remotely, providing detailed wind profile data without expensive meteorological masts."
  },
  {
    id: "wind-weibull",
    question: "What does the Weibull distribution describe in wind energy assessment?",
    options: ["Turbine power output over time", "Statistical distribution of wind speeds at a site", "Turbulence intensity measurements", "Grid connection requirements"],
    correctIndex: 1,
    explanation: "The Weibull distribution statistically describes the frequency of different wind speeds at a site, essential for predicting energy production and turbine selection."
  },
  {
    id: "wind-long-term",
    question: "Why is long-term correlation with reference stations critical for wind assessment?",
    options: ["Reduces measurement costs", "Provides regulatory compliance", "Adjusts short-term data to represent typical long-term conditions", "Simplifies turbine selection"],
    correctIndex: 2,
    explanation: "Long-term correlation adjusts 12-36 month measurement campaigns to represent 20+ year typical conditions, critical for bankable energy assessments and project financing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the recommended minimum duration for a wind measurement campaign?",
    options: [
      "3-6 months",
      "12 months",
      "24-36 months for bankable assessments",
      "5 years"
    ],
    correctAnswer: 1,
    explanation: "A minimum of 12 months is required to capture seasonal variations, but 24-36 months is preferred for bankable assessments with acceptable uncertainty levels for project financing."
  },
  {
    id: 2,
    question: "What does high turbulence intensity primarily impact in wind turbines?",
    options: [
      "Initial installation costs",
      "Power output efficiency only",
      "Component fatigue life and maintenance requirements",
      "Grid connection requirements"
    ],
    correctAnswer: 2,
    explanation: "High turbulence intensity causes increased fatigue loading on turbine components, reducing operational lifespan by 50-100% and significantly increasing maintenance requirements."
  },
  {
    id: 3,
    question: "What does the Weibull shape parameter (k) describe?",
    options: [
      "Average wind speed",
      "Wind variability at the site",
      "Turbine efficiency",
      "Air density variations"
    ],
    correctAnswer: 1,
    explanation: "The Weibull shape parameter (k) describes wind variability - lower values indicate higher variability, while higher values (2.0-2.5) indicate more consistent wind speeds typical of good wind sites."
  },
  {
    id: 4,
    question: "What typical data recovery rate is required for a high-confidence wind assessment?",
    options: [
      "Greater than 75%",
      "Greater than 85%",
      "Greater than 95%",
      "100% required"
    ],
    correctAnswer: 2,
    explanation: "Data recovery rates greater than 95% are required for high-confidence assessments. Lower recovery introduces uncertainty that may affect financing terms or project viability."
  },
  {
    id: 5,
    question: "What is the typical wind shear exponent for offshore locations?",
    options: [
      "0.05-0.08",
      "0.08-0.12",
      "0.20-0.40",
      "0.50-0.60"
    ],
    correctAnswer: 1,
    explanation: "Offshore locations have lower wind shear (alpha = 0.08-0.12) due to the smooth sea surface, compared to onshore sites (0.20-0.40) where terrain and vegetation increase surface roughness."
  },
  {
    id: 6,
    question: "What is the accuracy of modern LIDAR systems compared to cup anemometers?",
    options: [
      "Within 5-10%",
      "Within 3-5%",
      "Within 1-2%",
      "LIDAR is more accurate than cup anemometers"
    ],
    correctAnswer: 2,
    explanation: "Modern LIDAR systems achieve within 1-2% accuracy compared to calibrated cup anemometers when properly configured, though validation against traditional measurements is still recommended for bankable assessments."
  },
  {
    id: 7,
    question: "What does P90 energy estimate represent?",
    options: [
      "The 90th percentile of wind speed",
      "Energy production exceeded 90% of the time",
      "90% of maximum turbine capacity",
      "Energy production at 90% availability"
    ],
    correctAnswer: 1,
    explanation: "P90 represents the energy production level that will be exceeded 90% of the time (90% exceedance probability). This conservative estimate is typically used for project financing."
  },
  {
    id: 8,
    question: "What are typical wake losses in wind farms?",
    options: [
      "1-3%",
      "5-15%",
      "20-30%",
      "40-50%"
    ],
    correctAnswer: 1,
    explanation: "Wake losses typically range from 5-15% depending on turbine spacing and layout. Modern CFD modelling and wake steering techniques help minimise these losses through optimised array design."
  },
  {
    id: 9,
    question: "Which IEC turbulence class indicates the highest turbulence intensity?",
    options: [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    correctAnswer: 0,
    explanation: "IEC turbulence Class A indicates the highest turbulence intensity (16% reference TI at 15 m/s), requiring turbines designed for more aggressive fatigue loading conditions."
  },
  {
    id: 10,
    question: "What is the typical uncertainty range for long-term wind correlation?",
    options: [
      "Within 1-2%",
      "Within 5-7%",
      "Within 10-15%",
      "Within 20-25%"
    ],
    correctAnswer: 1,
    explanation: "Long-term correlation typically introduces 5-7% uncertainty depending on data quality, reference station proximity, and correlation methodology. This is a significant component of overall assessment uncertainty."
  }
];

const faqs = [
  {
    question: "How long should a wind measurement campaign last for a commercial project?",
    answer: "A minimum of 12 months is required to capture seasonal variations, but 24-36 months is preferred for bankable assessments. This allows for long-term correlation with reference data and reduces uncertainty in energy predictions to acceptable levels for project financing."
  },
  {
    question: "What is the accuracy of LIDAR compared to met masts?",
    answer: "Modern LIDAR systems achieve within 1-2% accuracy compared to calibrated cup anemometers when properly configured. They offer advantages in measuring multiple heights simultaneously and can be deployed more quickly, but require careful validation against traditional measurements for bankable assessments."
  },
  {
    question: "How do you account for climate change in long-term wind assessments?",
    answer: "Climate change impacts are typically incorporated through analysis of long-term trends in reanalysis data, typically showing plus or minus 2-4% variation over 20-year periods. Some assessments include specific climate change scenarios, particularly for offshore projects with 25+ year lifespans."
  },
  {
    question: "What causes high turbulence intensity and how does it affect wind turbines?",
    answer: "High turbulence intensity (greater than 20%) is caused by complex terrain, nearby obstacles, or atmospheric instability. It increases fatigue loads on turbine components by 50-100%, reduces power performance, and may require turbines designed for higher turbulence classes, impacting project economics."
  },
  {
    question: "How do you validate wind resource models against measurements?",
    answer: "Model validation involves comparing predicted versus measured wind speeds at multiple heights and directions. Good models achieve correlation coefficients greater than 0.9 and bias less than 5%. Validation requires at least 6-12 months of data covering different seasonal and weather patterns."
  },
  {
    question: "What are typical wind resource assessment costs for a commercial project?",
    answer: "Wind assessment costs typically range from GBP 200-500k for a 50MW onshore project, including met mast installation, monitoring, and analysis. LIDAR-only campaigns may cost 50-70% less but still require some validation measurements. Costs scale with project size and measurement complexity."
  }
];

const RenewableEnergyModule3Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-3">
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
            <span>Module 3 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Wind Resource Assessment
          </h1>
          <p className="text-white/80">
            Comprehensive methodologies for evaluating wind resources and predicting energy yields
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Key Parameters</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Viable minimum:</strong> 6-7 m/s annual average</li>
              <li><strong>Campaign duration:</strong> 12-36 months</li>
              <li><strong>Data recovery:</strong> &gt;95% required</li>
              <li><strong>LIDAR accuracy:</strong> Within 1-2%</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Uncertainty Sources</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Measurement:</strong> 2-3%</li>
              <li><strong>Long-term correlation:</strong> 5-7%</li>
              <li><strong>Spatial extrapolation:</strong> 3-5%</li>
              <li><strong>Climate variation:</strong> 2-4%</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand wind measurement technologies and methods",
              "Apply Weibull distribution for wind characterisation",
              "Evaluate long-term correlation techniques",
              "Calculate uncertainty and confidence levels",
              "Assess energy yields using P50 and P90 estimates",
              "Interpret wind shear and turbulence data"
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
            Wind Measurement Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate wind assessment is fundamental to successful wind energy projects. Modern assessment employs various measurement technologies, each with specific advantages for different phases and site conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Traditional Meteorological Masts:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cup anemometers:</strong> Mechanical rotation proportional to wind speed</li>
                <li><strong>Wind vanes:</strong> Direction measurement with plus or minus 3 degree accuracy</li>
                <li><strong>Multiple heights:</strong> 60m, 80m, and hub height measurements</li>
                <li><strong>Temperature sensors:</strong> Air density corrections and stability assessment</li>
                <li><strong>Data loggers:</strong> 10-minute average recordings with high availability</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Remote Sensing Technologies:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>LIDAR systems:</strong> Laser-based wind measurement up to 300m height</li>
                <li><strong>SODAR technology:</strong> Acoustic wind profiling with turbulence data</li>
                <li><strong>Ground-based LIDAR:</strong> Scanning multiple directions and heights</li>
                <li><strong>Nacelle-mounted LIDAR:</strong> Forward-looking wind prediction for control</li>
                <li><strong>Floating LIDAR:</strong> Offshore measurements without fixed platforms</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Measurement Campaign Design:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Minimum duration:</strong> 12 months for seasonal variation capture</li>
                <li><strong>Preferred duration:</strong> 24-36 months for bankable assessments</li>
                <li><strong>Data recovery target:</strong> &gt;95% for high-confidence results</li>
                <li><strong>Redundant sensors:</strong> Critical measurements backed up</li>
                <li><strong>Calibration schedule:</strong> Regular instrument calibration and maintenance</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Wind Resource Characterisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Statistical analysis of wind patterns provides essential insights for energy prediction and turbine selection using established methodologies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Weibull Distribution Analysis:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Shape parameter (k):</strong> Describes wind variability (1.5-2.5 typical)</li>
                <li><strong>Scale parameter (A):</strong> Related to average wind speed</li>
                <li><strong>Energy calculation:</strong> Integration with turbine power curves</li>
                <li><strong>Frequency analysis:</strong> Hours at different wind speed bins</li>
                <li><strong>Directional analysis:</strong> Wind rose and sector-specific Weibull</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Wind Shear and Turbulence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Power law exponent (alpha):</strong> 0.08-0.12 offshore, 0.20-0.40 onshore</li>
                <li><strong>Turbulence intensity:</strong> Standard deviation divided by mean wind speed</li>
                <li><strong>IEC turbulence classes:</strong> A (high 16%), B (medium 14%), C (low 12%)</li>
                <li><strong>Gust factors:</strong> Peak to mean wind speed ratios</li>
                <li><strong>Air density variations:</strong> Temperature and altitude corrections</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">UK Wind Resource Context:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>NOABL database:</strong> 1km resolution wind speed estimates across UK</li>
                <li><strong>Wind atlas methodology:</strong> Mesoscale and microscale modelling</li>
                <li><strong>Coastal acceleration:</strong> Enhanced speeds at land-sea interface</li>
                <li><strong>Topographic effects:</strong> Hill acceleration and valley channelling</li>
                <li><strong>Climate trends:</strong> Long-term wind pattern analysis</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Long-term Correlation Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Long-term correlation techniques adjust short-term measurements to represent typical conditions over the project lifetime, crucial for bankable energy assessments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Reference Data Sources:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Met Office stations:</strong> 20+ year historical wind records</li>
                <li><strong>Reanalysis data:</strong> ERA5, MERRA-2 global datasets</li>
                <li><strong>Nearby wind farms:</strong> Operating turbine SCADA data</li>
                <li><strong>Mesoscale models:</strong> High-resolution numerical weather data</li>
                <li><strong>Satellite data:</strong> Global wind speed observations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Correlation Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Linear regression:</strong> Simple ratio method for similar terrain</li>
                <li><strong>Multiple regression:</strong> Using multiple reference sources</li>
                <li><strong>Time series analysis:</strong> Seasonal and annual adjustments</li>
                <li><strong>Wind flow modelling:</strong> CFD-based correlation techniques</li>
                <li><strong>Machine learning:</strong> Advanced pattern recognition methods</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Uncertainty Analysis:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Measurement uncertainty:</strong> 2-3% for calibrated instruments</li>
                <li><strong>Long-term correlation:</strong> 5-7% depending on data quality</li>
                <li><strong>Spatial extrapolation:</strong> 3-5% for nearby locations</li>
                <li><strong>Future climate:</strong> 2-4% over 20-year project life</li>
                <li><strong>Combined uncertainty:</strong> Root sum square for overall estimate</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Energy Yield Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy yield assessment combines wind resource data with turbine performance characteristics to predict long-term electricity generation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Power Curve Application:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Manufacturer curves:</strong> Guaranteed performance at standard conditions</li>
                <li><strong>Air density corrections:</strong> Site altitude and temperature adjustments</li>
                <li><strong>Power curve verification:</strong> IEC 61400-12 measurement standards</li>
                <li><strong>Turbulence corrections:</strong> Adjustments for high TI sites</li>
                <li><strong>Availability factors:</strong> 95-98% typical for modern turbines</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Loss Calculations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wake losses:</strong> 5-15% depending on array layout and spacing</li>
                <li><strong>Electrical losses:</strong> 1-3% in collection and transmission systems</li>
                <li><strong>Environmental losses:</strong> Icing, blade soiling, extreme weather</li>
                <li><strong>Curtailment losses:</strong> Grid constraints and noise limitations</li>
                <li><strong>Performance degradation:</strong> 0.1-0.2% per year typical</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Assessment Deliverables</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>P50 energy estimate:</strong> Expected annual energy production (50% probability)</li>
                <li><strong>P90 energy estimate:</strong> 90% exceedance probability - used for financing</li>
                <li><strong>Capacity factors:</strong> Net and gross energy yield percentages</li>
                <li><strong>Seasonal profiles:</strong> Monthly and quarterly energy patterns</li>
                <li><strong>Sensitivity analysis:</strong> Impact of key assumption changes</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Site Selection Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successful wind project development requires comprehensive site evaluation considering wind resource, technical constraints, and commercial factors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Wind Resource Criteria:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Minimum viable wind:</strong> 6-7 m/s annual average at hub height</li>
                <li><strong>Turbulence limits:</strong> IEC Class A, B, or C turbine selection</li>
                <li><strong>Wind shear:</strong> Acceptable range for selected turbine type</li>
                <li><strong>Extreme wind:</strong> 50-year return period design consideration</li>
                <li><strong>Directional patterns:</strong> Prevailing wind for optimal layout</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Technical Constraints:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Grid connection:</strong> Proximity and capacity of electrical network</li>
                <li><strong>Access routes:</strong> Component delivery logistics</li>
                <li><strong>Geotechnical:</strong> Foundation suitability and costs</li>
                <li><strong>Aviation:</strong> Radar and flight path considerations</li>
                <li><strong>Environmental:</strong> Protected areas and wildlife impacts</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Commercial Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Land agreements:</strong> Lease terms and option agreements</li>
                <li><strong>Planning permission:</strong> Local authority and community engagement</li>
                <li><strong>Power purchase:</strong> Offtake arrangements and pricing</li>
                <li><strong>Subsidy eligibility:</strong> CfD or other support mechanisms</li>
                <li><strong>Project economics:</strong> LCOE competitiveness</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Planning Measurement Campaigns</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install sensors at proposed hub height plus additional heights for shear analysis</li>
                <li>Use redundant sensors for critical measurements to ensure data recovery</li>
                <li>Calibrate instruments before and after campaign for quality assurance</li>
                <li>Consider LIDAR for initial screening before committing to met mast costs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Analysing Wind Data</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check data quality - flag icing events, sensor failures, and anomalies</li>
                <li>Apply appropriate long-term correction using multiple reference sources</li>
                <li>Calculate sector-wise Weibull parameters for directional analysis</li>
                <li>Document all assumptions and methodologies for third-party review</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Short measurement periods</strong> - 6 months insufficient for seasonal capture</li>
                <li><strong>Poor reference data quality</strong> - correlation only as good as reference</li>
                <li><strong>Ignoring turbulence</strong> - high TI sites may require de-rated turbines</li>
                <li><strong>Optimistic availability</strong> - use realistic maintenance and downtime factors</li>
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
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule3Section3;
