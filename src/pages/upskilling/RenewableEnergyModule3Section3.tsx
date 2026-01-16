import { ArrowLeft, MapPin, Activity, Zap, FileText, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule3Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the minimum average annual wind speed generally considered viable for commercial wind development?",
      options: [
        "4-5 m/s",
        "6-7 m/s", 
        "8-9 m/s",
        "10-11 m/s"
      ],
      correct: 1,
      explanation: "A minimum average annual wind speed of 6-7 m/s is generally required for commercial viability, though modern turbines can be economic at sites with 5.5 m/s+ with optimal design and economics."
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
      correct: 2,
      explanation: "High turbulence intensity causes increased fatigue loading on turbine components, reducing operational lifespan and increasing maintenance requirements, which significantly impacts project economics."
    },
    {
      id: 3,
      question: "Which tool can measure wind speed at multiple heights without installing met masts?",
      options: [
        "Cup anemometer",
        "Wind vane",
        "LIDAR (Light Detection and Ranging)",
        "Barometric pressure sensor"
      ],
      correct: 2,
      explanation: "LIDAR systems use laser technology to measure wind speeds at multiple heights remotely, providing detailed wind profile data without requiring expensive meteorological masts."
    },
    {
      id: 4,
      question: "What does the Weibull distribution describe in wind energy context?",
      options: [
        "Turbine power output over time",
        "Statistical distribution of wind speeds at a site",
        "Turbulence intensity measurements",
        "Grid connection requirements"
      ],
      correct: 1,
      explanation: "The Weibull distribution statistically describes the frequency of different wind speeds at a site, essential for predicting energy production and turbine selection."
    },
    {
      id: 5,
      question: "Which factor is most critical for accurate long-term wind resource assessment?",
      options: [
        "Single year measurement campaign",
        "Long-term correlation with nearby reference stations",
        "Only using satellite data",
        "Measuring only at turbine hub height"
      ],
      correct: 1,
      explanation: "Long-term correlation with established reference weather stations allows adjustment of short-term measurements to represent typical long-term conditions, critical for bankable energy assessments."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Wind Resource Assessment
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Comprehensive methodologies for evaluating wind resources and site characteristics
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Wind Assessment
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand wind measurement technologies and assessment methodologies
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Apply statistical analysis methods including Weibull distribution for wind characterisation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Evaluate wind resource quality and long-term energy prediction techniques
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Wind resource assessment forms the foundation of successful wind energy projects. Accurate characterisation of wind patterns, speeds, and variability determines site viability, turbine selection, and energy yield predictions. This comprehensive assessment process combines measurement technologies, statistical analysis, and long-term correlation methods to provide bankable resource evaluations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                Wind Measurement Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern wind assessment employs various measurement technologies, each with specific advantages for different assessment phases and site conditions.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Traditional Meteorological Masts:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Cup anemometers:</strong> Mechanical rotation proportional to wind speed</li>
                    <li>• <strong>Wind vanes:</strong> Direction measurement with ±3° accuracy</li>
                    <li>• <strong>Multiple heights:</strong> 60m, 80m, and hub height measurements</li>
                    <li>• <strong>Temperature sensors:</strong> Air density corrections and stability assessment</li>
                    <li>• <strong>Data loggers:</strong> 10-minute average recordings with high availability</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Remote Sensing Technologies:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>LIDAR systems:</strong> Laser-based wind measurement up to 300m height</li>
                    <li>• <strong>SODAR technology:</strong> Acoustic wind profiling with turbulence data</li>
                    <li>• <strong>Ground-based LIDAR:</strong> Scanning multiple directions and heights</li>
                    <li>• <strong>Nacelle-mounted LIDAR:</strong> Forward-looking wind prediction</li>
                    <li>• <strong>Floating LIDAR:</strong> Offshore measurements without fixed platforms</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Measurement Campaign Design:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Duration Requirements:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Minimum 12 months for seasonal variation capture</li>
                      <li>• 24-36 months preferred for bankable assessments</li>
                      <li>• Concurrent reference station data for correlation</li>
                      <li>• Data recovery targets &gt;95% for high confidence</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Quality Assurance:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Instrument calibration and maintenance schedules</li>
                      <li>• Redundant sensors for critical measurements</li>
                      <li>• Ice detection and data flagging systems</li>
                      <li>• Regular site visits and equipment inspection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-green-400" />
                Wind Resource Characterisation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Statistical analysis of wind patterns provides essential insights for energy prediction and turbine selection using established methodologies.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Weibull Distribution Analysis:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Shape parameter (k):</strong> Describes wind variability (1.5-2.5 typical)</li>
                    <li>• <strong>Scale parameter (A):</strong> Related to average wind speed</li>
                    <li>• <strong>Energy calculation:</strong> Integration with turbine power curves</li>
                    <li>• <strong>Frequency analysis:</strong> Hours at different wind speed bins</li>
                    <li>• <strong>Directional analysis:</strong> Wind rose and sector-specific Weibull</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Wind Shear and Turbulence:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Power law exponent:</strong> α = 0.1-0.4 depending on terrain</li>
                    <li>• <strong>Turbulence intensity:</strong> Standard deviation/mean wind speed</li>
                    <li>• <strong>IEC turbulence classes:</strong> A (high), B (medium), C (low)</li>
                    <li>• <strong>Gust factors:</strong> Peak to mean wind speed ratios</li>
                    <li>• <strong>Air density variations:</strong> Temperature and altitude corrections</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-2">UK Wind Resource Mapping:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>NOABL database:</strong> 1km resolution wind speed estimates across UK</li>
                  <li>• <strong>Wind atlas methodology:</strong> Mesoscale and microscale modelling</li>
                  <li>• <strong>Coastal acceleration:</strong> Enhanced speeds due to land-sea interface</li>
                  <li>• <strong>Topographic effects:</strong> Hill acceleration and valley channelling</li>
                  <li>• <strong>Climate change impacts:</strong> Long-term wind pattern trends</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
                Long-term Correlation and Energy Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Long-term correlation techniques adjust short-term measurements to represent typical conditions over the project lifetime, crucial for bankable energy assessments.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Reference Data Sources:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Met Office stations:</strong> 20+ year wind records</li>
                    <li>• <strong>Reanalysis data:</strong> ERA5, MERRA-2 global datasets</li>
                    <li>• <strong>Nearby wind farms:</strong> Operating turbine data</li>
                    <li>• <strong>Mesoscale models:</strong> High-resolution numerical weather data</li>
                    <li>• <strong>Satellite data:</strong> Global wind speed observations</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Correlation Methods:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Linear regression:</strong> Simple ratio method for similar terrain</li>
                    <li>• <strong>Multiple regression:</strong> Using multiple reference sources</li>
                    <li>• <strong>Time series analysis:</strong> Seasonal and annual adjustments</li>
                    <li>• <strong>Wind flow modelling:</strong> CFD-based correlation techniques</li>
                    <li>• <strong>Machine learning:</strong> Advanced pattern recognition methods</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Uncertainty Analysis:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Measurement uncertainty:</strong> ±2-3% for calibrated instruments</li>
                    <li>• <strong>Long-term correlation:</strong> ±5-7% depending on data quality</li>
                    <li>• <strong>Spatial extrapolation:</strong> ±3-5% for nearby locations</li>
                    <li>• <strong>Future climate:</strong> ±2-4% over 20-year project life</li>
                    <li>• <strong>Overall P90 estimate:</strong> Combined uncertainties for banking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-purple-400" />
                Energy Yield Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Energy yield assessment combines wind resource data with turbine performance characteristics to predict long-term electricity generation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Power Curve Application:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Manufacturer curves:</strong> Guaranteed performance at standard conditions</li>
                    <li>• <strong>Air density corrections:</strong> Site altitude and temperature adjustments</li>
                    <li>• <strong>Power curve verification:</strong> IEC 61400-12 measurement standards</li>
                    <li>• <strong>Turbulence corrections:</strong> Adjustments for high TI sites</li>
                    <li>• <strong>Availability factors:</strong> 95-98% for modern turbines</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Loss Calculations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Wake losses:</strong> 5-15% in wind farms depending on layout</li>
                    <li>• <strong>Electrical losses:</strong> 1-3% in collection and transmission</li>
                    <li>• <strong>Environmental losses:</strong> Icing, blade soiling, bird impacts</li>
                    <li>• <strong>Curtailment losses:</strong> Grid constraints and noise limitations</li>
                    <li>• <strong>Performance degradation:</strong> 0.1-0.2% per year typical</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-2">Assessment Deliverables:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>P50 energy estimate:</strong> Expected annual energy production</li>
                  <li>• <strong>P90 energy estimate:</strong> 90% exceedance probability for financing</li>
                  <li>• <strong>Capacity factors:</strong> Net and gross energy yields</li>
                  <li>• <strong>Monthly/seasonal patterns:</strong> Energy production profiles</li>
                  <li>• <strong>Sensitivity analysis:</strong> Impact of key assumption changes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-cyan-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How long should a wind measurement campaign last for a commercial project?</h4>
                  <p className="text-gray-300 text-sm">
                    A minimum of 12 months is required to capture seasonal variations, but 24-36 months is preferred for bankable assessments. This allows for long-term correlation with reference data and reduces uncertainty in energy predictions to acceptable levels for project financing.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What is the accuracy of LIDAR compared to met masts?</h4>
                  <p className="text-gray-300 text-sm">
                    Modern LIDAR systems achieve ±1-2% accuracy compared to calibrated cup anemometers when properly configured. They offer advantages in measuring multiple heights simultaneously and can be deployed more quickly, but require careful validation against traditional measurements for bankable assessments.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How do you account for climate change in long-term wind assessments?</h4>
                  <p className="text-gray-300 text-sm">
                    Climate change impacts are typically incorporated through analysis of long-term trends in reanalysis data, typically showing ±2-4% variation over 20-year periods. Some assessments include specific climate change scenarios, particularly for offshore projects with 25+ year lifespans.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What causes high turbulence intensity and how does it affect wind turbines?</h4>
                  <p className="text-gray-300 text-sm">
                    High turbulence intensity (greater than 20%) is caused by complex terrain, nearby obstacles, or atmospheric instability. It increases fatigue loads on turbine components by 50-100%, reduces power performance, and may require turbines designed for higher turbulence classes, impacting project economics.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How do you validate wind resource models against measurements?</h4>
                  <p className="text-gray-300 text-sm">
                    Model validation involves comparing predicted vs. measured wind speeds at multiple heights and directions. Good models achieve correlation coefficients greater than 0.9 and bias less than 5%. Validation requires at least 6-12 months of data and should cover different seasonal and weather patterns.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What are typical wind resource assessment costs for a commercial project?</h4>
                  <p className="text-gray-300 text-sm">
                    Wind assessment costs typically range from £200-500k for a 50MW onshore project, including met mast installation, monitoring, and analysis. LIDAR-only campaigns may cost 50-70% less but still require some validation measurements. Costs scale with project size and measurement complexity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <SingleQuestionQuiz 
            questions={quizQuestions}
            title="Wind Resource Assessment Quiz"
          />

          <div className="flex justify-between mt-8">
            <Link to="../renewable-energy-module-3-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-3-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule3Section3;