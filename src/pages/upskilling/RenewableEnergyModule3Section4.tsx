import { ArrowLeft, Settings, Layout, Zap, Shield, Activity, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule3Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the typical minimum spacing between wind turbines in the prevailing wind direction?",
      options: [
        "3-5 rotor diameters",
        "5-7 rotor diameters",
        "7-10 rotor diameters",
        "10-15 rotor diameters"
      ],
      correct: 2,
      explanation: "Wind turbines should typically be spaced 7-10 rotor diameters apart in the prevailing wind direction to minimise wake losses while maintaining economic viability of the wind farm layout."
    },
    {
      id: 2,
      question: "What is the primary impact of wake effects on downstream turbines?",
      options: [
        "Increased power output",
        "Reduced wind speed and increased turbulence",
        "Improved grid stability",
        "Lower maintenance costs"
      ],
      correct: 1,
      explanation: "Wake effects cause reduced wind speeds (velocity deficit) and increased turbulence intensity for downstream turbines, resulting in lower power output and higher fatigue loads."
    },
    {
      id: 3,
      question: "Which wake model is commonly used for initial wind farm layout design?",
      options: [
        "Jensen (Park) model",
        "Computational Fluid Dynamics (CFD)",
        "Large Eddy Simulation (LES)",
        "Weibull distribution"
      ],
      correct: 0,
      explanation: "The Jensen (Park) model is widely used for initial wind farm design due to its simplicity and computational efficiency, though more complex models like CFD are used for detailed analysis."
    },
    {
      id: 4,
      question: "What layout pattern typically minimises wake losses in a wind farm?",
      options: [
        "Grid pattern aligned with prevailing wind",
        "Random turbine placement",
        "Single row perpendicular to wind",
        "Staggered or offset grid pattern"
      ],
      correct: 3,
      explanation: "A staggered or offset grid pattern helps minimise wake interactions by ensuring downstream turbines are not directly in line with upstream turbines, reducing cumulative wake effects."
    },
    {
      id: 5,
      question: "What percentage of total wind farm losses do wake effects typically represent?",
      options: [
        "1-3%",
        "5-15%",
        "20-25%",
        "30-40%"
      ],
      correct: 1,
      explanation: "Wake losses typically account for 5-15% of total wind farm energy production, making layout optimisation crucial for project economics and energy yield maximisation."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Wind Farm Layout and Wake Effects
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Optimising turbine placement and managing wake interactions for maximum energy yield
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Layout Design
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
                  Understand wake effects and their impact on wind farm performance
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Apply layout optimisation principles and spacing guidelines
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Use wake modelling tools and array performance calculation methods
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
                Wind farm layout design is a critical optimisation challenge that balances maximum energy extraction with economic constraints. Wake effects from upstream turbines significantly impact downstream performance, requiring sophisticated modelling and spacing strategies. Effective layout design can improve energy yields by 10-20% compared to poor arrangements, making this knowledge essential for successful wind energy projects.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                Understanding Wake Effects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Wind turbine wakes create complex flow patterns that affect downstream turbines through reduced wind speeds and increased turbulence intensity.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Wake Characteristics:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Velocity deficit:</strong> 20-40% speed reduction immediately downstream</li>
                    <li>• <strong>Wake expansion:</strong> Conical spreading with distance</li>
                    <li>• <strong>Recovery distance:</strong> 7-15 rotor diameters to 95% recovery</li>
                    <li>• <strong>Turbulence intensity:</strong> 50-100% increase in wake region</li>
                    <li>• <strong>Wake meandering:</strong> Lateral movement due to atmospheric turbulence</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Factors Affecting Wake Behaviour:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Thrust coefficient:</strong> Higher thrust creates stronger wakes</li>
                    <li>• <strong>Atmospheric stability:</strong> Stable conditions extend wake length</li>
                    <li>• <strong>Turbulence intensity:</strong> Higher TI promotes faster wake recovery</li>
                    <li>• <strong>Wind shear:</strong> Vertical speed gradients affect wake shape</li>
                    <li>• <strong>Surface roughness:</strong> Terrain influences wake development</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Wake Impact Quantification:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Energy Losses:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Single wake: 10-40% power reduction</li>
                      <li>• Multiple wakes: Cumulative effects can exceed 50%</li>
                      <li>• Array losses: 5-15% of total wind farm output</li>
                      <li>• Directional variation: Losses depend on wind direction</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Fatigue Impacts:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Increased turbulence causes higher fatigue loads</li>
                      <li>• Reduced component lifespan in wake-affected turbines</li>
                      <li>• Higher maintenance and replacement costs</li>
                      <li>• Uneven loading across wind farm fleet</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-green-400" />
                Wake Modelling Approaches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Various wake modelling approaches provide different levels of accuracy and computational complexity for wind farm design and analysis.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Engineering Models:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Jensen (Park) model:</strong> Simple linear wake expansion</li>
                    <li>• <strong>Frandsen model:</strong> Improved turbulence considerations</li>
                    <li>• <strong>Ainslie model:</strong> Eddy viscosity approach</li>
                    <li>• <strong>Fast computation:</strong> Suitable for layout optimisation</li>
                    <li>• <strong>Reasonable accuracy:</strong> ±10-15% for array calculations</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">CFD Modelling:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Reynolds-Averaged Navier-Stokes:</strong> RANS turbulence models</li>
                    <li>• <strong>Large Eddy Simulation:</strong> LES for detailed flow analysis</li>
                    <li>• <strong>Complex terrain:</strong> Accurate for challenging topography</li>
                    <li>• <strong>High computational cost:</strong> Detailed but resource-intensive</li>
                    <li>• <strong>Validation required:</strong> Measurement data for calibration</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Advanced Methods:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Machine learning models:</strong> Data-driven wake prediction</li>
                    <li>• <strong>Actuator line models:</strong> Blade-resolved simulations</li>
                    <li>• <strong>Dynamic wake models:</strong> Time-varying wake behaviour</li>
                    <li>• <strong>Ensemble approaches:</strong> Multiple model combinations</li>
                    <li>• <strong>Real-time adaptation:</strong> SCADA-based wake detection</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Layout className="h-6 w-6 text-purple-400" />
                Layout Optimisation Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Systematic layout optimisation balances wake minimisation with land use constraints, access requirements, and project economics.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Spacing Guidelines:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Prevailing wind direction:</strong> 7-10 rotor diameters minimum</li>
                    <li>• <strong>Cross-wind direction:</strong> 3-5 rotor diameters typical</li>
                    <li>• <strong>Variable spacing:</strong> Adapt to wind rose and terrain</li>
                    <li>• <strong>Boundary effects:</strong> Increased spacing at farm edges</li>
                    <li>• <strong>Economic balance:</strong> More spacing reduces wake losses but increases costs</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Layout Patterns:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Regular grid:</strong> Simple but not always optimal</li>
                    <li>• <strong>Staggered arrangement:</strong> Offset rows to reduce direct wakes</li>
                    <li>• <strong>Irregular clustering:</strong> Adapted to site constraints</li>
                    <li>• <strong>Curved arrays:</strong> Following topographical features</li>
                    <li>• <strong>Optimised layouts:</strong> Algorithm-based positioning</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Optimisation Algorithms:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Metaheuristic Methods:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Genetic algorithms for global optimisation</li>
                      <li>• Particle swarm optimisation techniques</li>
                      <li>• Simulated annealing approaches</li>
                      <li>• Multi-objective optimisation frameworks</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Gradient-Based Methods:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Adjoint-based optimisation</li>
                      <li>• Gradient descent with analytical derivatives</li>
                      <li>• Sequential quadratic programming</li>
                      <li>• Constraint handling and boundary conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-orange-400" />
                Array Performance Calculation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Accurate array performance calculation requires integration of individual turbine performance with wake interactions across all wind conditions.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Calculation Methodology:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Wind resource binning:</strong> Wind speed and direction sectors</li>
                    <li>• <strong>Individual turbine analysis:</strong> Wake-affected wind speeds</li>
                    <li>• <strong>Power curve application:</strong> Site-corrected performance curves</li>
                    <li>• <strong>Frequency weighting:</strong> Probability of each wind condition</li>
                    <li>• <strong>Array summation:</strong> Total wind farm energy yield</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Performance Metrics:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Array efficiency:</strong> Actual vs. no-wake energy production</li>
                    <li>• <strong>Wake loss factors:</strong> Directional and overall wake impacts</li>
                    <li>• <strong>Capacity factors:</strong> Gross and net annual energy yields</li>
                    <li>• <strong>Turbine ranking:</strong> Performance variation across the array</li>
                    <li>• <strong>Sensitivity analysis:</strong> Impact of layout changes</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-2">Software Tools and Validation:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Commercial software:</strong> WindPRO, WAsP, openWind for layout design</li>
                  <li>• <strong>Open-source tools:</strong> FLORIS, PyWake for research applications</li>
                  <li>• <strong>Model validation:</strong> Comparison with operational wind farm data</li>
                  <li>• <strong>Uncertainty quantification:</strong> Monte Carlo analysis of layout performance</li>
                  <li>• <strong>Measurement campaigns:</strong> SCADA-based wake detection and validation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-400" />
                Practical Design Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Real-world wind farm layout must balance aerodynamic optimisation with practical constraints including access, grid connection, and environmental considerations.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Site Constraints:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Topography:</strong> Slope limitations for turbine foundations</li>
                    <li>• <strong>Access roads:</strong> Construction and maintenance vehicle routes</li>
                    <li>• <strong>Setback requirements:</strong> Distance from dwellings and roads</li>
                    <li>• <strong>Environmental exclusions:</strong> Protected areas and habitats</li>
                    <li>• <strong>Geotechnical conditions:</strong> Foundation design requirements</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Infrastructure Planning:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Cable routing:</strong> Underground collection system design</li>
                    <li>• <strong>Substation location:</strong> Central positioning for optimal cabling</li>
                    <li>• <strong>Crane paths:</strong> Heavy lift requirements for installation</li>
                    <li>• <strong>Temporary facilities:</strong> Construction compound positioning</li>
                    <li>• <strong>Grid connection:</strong> Transmission line routing and capacity</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Optimisation Trade-offs:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Energy vs. cost:</strong> Optimal spacing balances wake losses and infrastructure</li>
                    <li>• <strong>Turbine selection:</strong> Larger turbines may allow wider spacing</li>
                    <li>• <strong>Phased development:</strong> Expandable layouts for future growth</li>
                    <li>• <strong>Maintenance access:</strong> Serviceable layouts for long-term operations</li>
                    <li>• <strong>Visual impact:</strong> Landscape integration and planning requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-cyan-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What is the minimum spacing required between wind turbines to avoid significant wake losses?</h4>
                  <p className="text-gray-300 text-sm">
                    In the prevailing wind direction, turbines should be spaced 7-10 rotor diameters apart for acceptable wake losses (10% or less). Cross-wind spacing can be reduced to 3-5 diameters. Modern large turbines (150m+ rotor) may require 8-12 diameters due to longer wake recovery distances.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How do wake losses vary with wind direction?</h4>
                  <p className="text-gray-300 text-sm">
                    Wake losses are highest when wind aligns with turbine rows (can exceed 40% for downstream turbines) and minimal for cross-wind conditions. This is why wind rose analysis is crucial - sites with multiple prevalent wind directions can significantly reduce overall wake losses through optimised layout design.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">Can wake steering or turbine control reduce wake losses?</h4>
                  <p className="text-gray-300 text-sm">
                    Yes, wake steering by yawing upstream turbines 10-30° can deflect wakes away from downstream turbines, potentially increasing total farm output by 2-5%. However, this reduces upstream turbine efficiency, so careful optimisation is required. Advanced control strategies are an active area of research.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How accurate are wake models for energy predictions?</h4>
                  <p className="text-gray-300 text-sm">
                    Engineering wake models (Jensen, Frandsen) typically have ±10-15% accuracy for total array energy calculations. CFD models can achieve ±5-10% but require significantly more computational resources. Accuracy decreases for complex terrain and multiple wake interactions.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What tools are commonly used for wind farm layout optimisation?</h4>
                  <p className="text-gray-300 text-sm">
                    Popular tools include WAsP, WindPRO, OpenWind, and WindFarmer for commercial applications. Open-source options like FLORIS (NREL) and PyWake are increasingly used in research. Many developers also use custom optimisation algorithms combined with these tools for specific site requirements.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How do larger turbines affect wake characteristics and layout design?</h4>
                  <p className="text-gray-300 text-sm">
                    Larger turbines (15MW+) create longer, more persistent wakes but allow fewer turbines for the same capacity. This can reduce total wake losses despite individual wake impacts. Hub heights of 150m+ also access different wind layers, potentially reducing wake interactions in some atmospheric conditions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <SingleQuestionQuiz 
            questions={quizQuestions}
            title="Wind Farm Layout and Wake Effects Quiz"
          />

          <div className="flex justify-between mt-8">
            <Link to="../renewable-energy-module-3-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-3-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default RenewableEnergyModule3Section4;