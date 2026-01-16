import { ArrowLeft, Wind, TrendingUp, Zap, BarChart3, Settings, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule3Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is a power curve primarily used for in wind energy?",
      options: [
        "To measure wind direction changes",
        "To predict electrical output at different wind speeds",
        "To calculate maintenance costs",
        "To determine blade rotation speed"
      ],
      correct: 1,
      explanation: "A power curve shows the relationship between wind speed and electrical power output, allowing engineers to predict energy generation and assess turbine performance under various wind conditions."
    },
    {
      id: 2,
      question: "What is the typical cut-in wind speed for modern commercial wind turbines?",
      options: [
        "1-2 m/s",
        "3-4 m/s",
        "6-7 m/s",
        "10-12 m/s"
      ],
      correct: 1,
      explanation: "Most modern commercial wind turbines have a cut-in speed of 3-4 m/s (approximately 7-9 mph), which is when they begin generating electricity. Below this speed, there isn't enough wind energy to overcome system losses."
    },
    {
      id: 3,
      question: "What does 'capacity factor' represent in wind generation?",
      options: [
        "Maximum power output of the turbine",
        "Ratio of actual energy output to theoretical maximum over a period",
        "Number of turbines in a wind farm",
        "Wind speed measurement accuracy"
      ],
      correct: 1,
      explanation: "Capacity factor is the ratio of actual energy output to the theoretical maximum if the turbine operated at rated power continuously. UK offshore wind farms typically achieve 40-50% capacity factors."
    },
    {
      id: 4,
      question: "How does blade length affect energy capture in wind turbines?",
      options: [
        "Longer blades capture less energy due to weight",
        "Blade length has no effect on energy capture",
        "Longer blades sweep a larger area, capturing more wind energy",
        "Shorter blades are always more efficient"
      ],
      correct: 2,
      explanation: "Longer blades sweep a larger circular area, following the relationship Power ∝ D² (where D is rotor diameter). Modern offshore turbines use blades over 100m long to maximise energy capture."
    },
    {
      id: 5,
      question: "What happens when wind speed exceeds the cut-out speed?",
      options: [
        "The turbine generates maximum power",
        "The turbine shuts down for safety protection",
        "Power output continues to increase",
        "The turbine switches to backup power"
      ],
      correct: 1,
      explanation: "Above cut-out speed (typically 20-25 m/s), turbines automatically shut down to prevent damage from excessive forces. Advanced systems use blade pitching and braking to safely stop rotation."
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
              Wind Generation Principles and Power Curves
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding the science behind wind energy conversion and performance evaluation
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Wind Energy Fundamentals
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
                  Understand the fundamental principles of wind energy conversion to electrical power
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Learn to interpret power curves and their significance in system performance
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify key performance metrics including capacity factor and yield assessment
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
                Wind energy represents one of the most rapidly expanding renewable energy sources globally. Understanding the fundamental principles governing wind energy conversion and the tools used to evaluate turbine performance is essential for anyone working in the renewable energy sector. This section explores the science behind wind generation and introduces the critical concept of power curves for performance assessment.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wind className="h-6 w-6 text-yellow-400" />
                Aerodynamic Principles of Wind Energy Conversion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Wind turbines operate on fundamental aerodynamic principles, converting kinetic energy from moving air into rotational mechanical energy, which is then converted to electricity.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Betz's Law and Theoretical Limits:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Maximum efficiency:</strong> 59.3% (Betz limit) of wind energy can be extracted</li>
                    <li>• <strong>Real-world efficiency:</strong> Modern turbines achieve 35-45% under optimal conditions</li>
                    <li>• <strong>Power equation:</strong> P = ½ × ρ × A × V³ × Cp</li>
                    <li>• <strong>Key insight:</strong> Power increases with the cube of wind speed</li>
                    <li>• <strong>Swept area importance:</strong> Doubling blade length quadruples power capture</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Lift and Drag Forces:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Angle of attack:</strong> Critical for optimising lift-to-drag ratio</li>
                    <li>• <strong>Pitch control:</strong> Active blade angle adjustment for performance</li>
                    <li>• <strong>Tip speed ratio:</strong> Optimal relationship between blade tip speed and wind speed</li>
                    <li>• <strong>Stall prevention:</strong> Managing airflow separation at high angles</li>
                    <li>• <strong>Variable geometry:</strong> Advanced systems adapt to wind conditions</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-2">Wind Energy Formula Breakdown:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>P = ½ × ρ × A × V³ × Cp</strong></p>
                  <ul className="space-y-1">
                    <li>• <strong>P:</strong> Power output (Watts)</li>
                    <li>• <strong>ρ:</strong> Air density (kg/m³) - varies with altitude, temperature, humidity</li>
                    <li>• <strong>A:</strong> Swept area (m²) - π × radius²</li>
                    <li>• <strong>V:</strong> Wind speed (m/s) - most critical factor due to cubic relationship</li>
                    <li>• <strong>Cp:</strong> Power coefficient - efficiency factor (max 0.593)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-green-400" />
                Understanding Power Curves
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Power curves are fundamental tools for understanding and predicting wind turbine performance across different wind conditions.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Cut-in Wind Speed:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Typical range:</strong> 3-4 m/s for modern turbines</li>
                    <li>• <strong>Purpose:</strong> Minimum speed for electricity generation</li>
                    <li>• <strong>Below cut-in:</strong> Turbine remains stationary to avoid wear</li>
                    <li>• <strong>Start-up sequence:</strong> Automated systems monitor wind conditions</li>
                    <li>• <strong>Grid connection:</strong> Synchronisation with electrical grid frequency</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Rated Wind Speed:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Typical range:</strong> 12-16 m/s for most commercial turbines</li>
                    <li>• <strong>Maximum power:</strong> Turbine achieves rated electrical output</li>
                    <li>• <strong>Pitch control:</strong> Blades begin active angle adjustment</li>
                    <li>• <strong>Constant power:</strong> Output maintained despite higher wind speeds</li>
                    <li>• <strong>Design optimisation:</strong> Matched to local wind resource</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Cut-out Wind Speed:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Typical range:</strong> 20-25 m/s for safety protection</li>
                    <li>• <strong>Emergency shutdown:</strong> Automatic turbine shutdown sequence</li>
                    <li>• <strong>Brake systems:</strong> Mechanical and aerodynamic braking</li>
                    <li>• <strong>Blade feathering:</strong> Reducing aerodynamic load</li>
                    <li>• <strong>Restart conditions:</strong> Wind must drop below reset threshold</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-400" />
                Environmental Factors Affecting Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Multiple environmental factors significantly influence wind turbine performance and must be considered in system design and performance prediction.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Air Density Effects:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Altitude impact:</strong> Density decreases ~1.2% per 100m elevation</li>
                    <li>• <strong>Temperature effect:</strong> Cold air is denser, providing more power</li>
                    <li>• <strong>Humidity influence:</strong> Moist air is less dense than dry air</li>
                    <li>• <strong>Seasonal variation:</strong> Winter typically provides higher density</li>
                    <li>• <strong>Correction factors:</strong> Performance curves adjusted for local conditions</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Wind Shear and Turbulence:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Wind shear:</strong> Speed increases with height above ground</li>
                    <li>• <strong>Shear exponent:</strong> Typically 0.1-0.2 for offshore, 0.2-0.4 onshore</li>
                    <li>• <strong>Turbulence intensity:</strong> Affects fatigue loading and performance</li>
                    <li>• <strong>Wake effects:</strong> Downstream turbines experience reduced wind</li>
                    <li>• <strong>Site assessment:</strong> Detailed wind measurement campaigns</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-2">Advanced Blade Design Considerations:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Aerodynamic profiles:</strong> Custom airfoil designs for different blade sections</li>
                  <li>• <strong>Twist distribution:</strong> Optimised angle variation from root to tip</li>
                  <li>• <strong>Chord length:</strong> Blade width variation for optimal performance</li>
                  <li>• <strong>Materials engineering:</strong> Carbon fibre composites for strength and lightness</li>
                  <li>• <strong>Smart blade technology:</strong> Adaptive surfaces and micro-tabs for optimisation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-orange-400" />
                Capacity Factor and Yield Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Capacity factor and energy yield assessments are critical metrics for evaluating wind project viability and long-term performance.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Capacity Factor Analysis:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Definition:</strong> Actual output ÷ Maximum possible output</li>
                    <li>• <strong>UK onshore:</strong> Typically 25-35% capacity factor</li>
                    <li>• <strong>UK offshore:</strong> 40-50% capacity factor achievable</li>
                    <li>• <strong>Best-in-class:</strong> &gt;55% for optimal offshore locations</li>
                    <li>• <strong>Calculation period:</strong> Usually assessed over full annual cycle</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Energy Yield Metrics:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Annual Energy Production (AEP):</strong> Total yearly generation</li>
                    <li>• <strong>Specific yield:</strong> kWh/kW installed capacity per year</li>
                    <li>• <strong>Load factor:</strong> Average load as percentage of peak capacity</li>
                    <li>• <strong>Availability factor:</strong> Operational uptime percentage</li>
                    <li>• <strong>Performance ratio:</strong> Actual vs predicted performance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Case Study: Hornsea One Offshore Wind Farm Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Hornsea One, located 120km off the Yorkshire coast, provides an excellent example of modern offshore wind performance in UK waters.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-yellow-400 font-semibold mb-3">Project Specifications:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Technical Details:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 174 × Siemens Gamesa 7MW turbines</li>
                      <li>• 1,218MW total capacity</li>
                      <li>• 154m rotor diameter</li>
                      <li>• 75m blade length</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Performance Metrics:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 42% average capacity factor (2020-2022)</li>
                      <li>• 4,500 GWh annual generation</li>
                      <li>• 3,700 hours equivalent full load operation</li>
                      <li>• Powers &gt;1 million UK homes</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Key Performance Insights:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Seasonal variation:</strong> Winter capacity factors often exceed 60%</li>
                  <li>• <strong>Wake management:</strong> Advanced layout optimisation reduces array losses to &lt;8%</li>
                  <li>• <strong>Reliability:</strong> &gt;97% availability achieved through predictive maintenance</li>
                  <li>• <strong>Grid stability:</strong> Advanced power electronics provide grid support services</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-cyan-400" />
                Advanced Control Systems and Performance Optimisation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern wind turbines employ sophisticated control systems to optimise performance, protect equipment, and provide grid services.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Active Power Control:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Maximum Power Point Tracking (MPPT):</strong> Optimising rotor speed</li>
                    <li>• <strong>Pitch control:</strong> Individual blade angle adjustment</li>
                    <li>• <strong>Torque control:</strong> Generator load management</li>
                    <li>• <strong>Wind following:</strong> Yaw system for wind direction tracking</li>
                    <li>• <strong>Performance curves:</strong> Real-time optimisation algorithms</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Grid Integration Features:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Power quality:</strong> Low harmonic distortion</li>
                    <li>• <strong>Voltage support:</strong> Reactive power provision</li>
                    <li>• <strong>Frequency response:</strong> Grid stability services</li>
                    <li>• <strong>Fault ride-through:</strong> Staying connected during disturbances</li>
                    <li>• <strong>Curtailment capability:</strong> Rapid power reduction when required</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Condition Monitoring:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Vibration analysis:</strong> Early detection of mechanical issues</li>
                    <li>• <strong>Temperature monitoring:</strong> Thermal management systems</li>
                    <li>• <strong>Oil analysis:</strong> Gearbox and bearing condition assessment</li>
                    <li>• <strong>Performance trends:</strong> Degradation tracking and prediction</li>
                    <li>• <strong>Remote diagnostics:</strong> 24/7 monitoring and analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Wind turbines generate power based on predictable aerodynamic principles, with power output following the cubic relationship to wind speed. Power curves provide essential tools for engineers to estimate energy output, assess efficiency, and predict long-term performance. Understanding these fundamentals enables informed decision-making in wind energy project development and operation.
              </p>
              <p className="text-yellow-400 font-medium">
                The cubic relationship between wind speed and power output makes site selection and wind resource assessment critical factors in project success.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Wind Generation Principles Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule3Section1;