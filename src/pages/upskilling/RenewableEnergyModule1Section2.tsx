import { ArrowLeft, Sun, Wind, Droplets, TreePine, Zap, BarChart3, Lightbulb, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section2Questions } from '@/data/upskilling/renewableEnergyModule1QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule1Section2 = () => {
  // Transform quiz data to match SingleQuestionQuiz format
  const quizQuestions = section2Questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  }));

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/renewable-energy-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Overview of Key Systems – Solar PV, Wind, Hydro, Biomass
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding how each renewable technology works, their applications, and comparative strengths
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Technology Overview
              </Badge>
            </div>
          </div>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify how each renewable technology converts natural resources into electricity
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand typical applications and output characteristics of each system
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Compare the strengths and limitations of different renewable technologies
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Renewable energy isn't one-size-fits-all. Different technologies harness different natural resources and are suited to different applications and environments. This section explores the most widely adopted renewable energy systems, examining their operating principles, typical applications, and relative advantages. Understanding these fundamentals is essential for selecting appropriate technologies for specific projects and understanding their role in the energy mix.
              </p>
            </CardContent>
          </Card>

          {/* Solar PV */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sun className="h-6 w-6 text-yellow-400" />
                Solar PV: Photovoltaic Technology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Solar photovoltaic (PV) systems convert sunlight directly into electricity using the photovoltaic effect, where photons knock electrons loose from atoms in semiconductor materials.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">How It Works:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Photovoltaic cells made from silicon semiconductors</li>
                    <li>• Photons create electron-hole pairs in the material</li>
                    <li>• Built-in electric field separates charge carriers</li>
                    <li>• Direct current (DC) electricity flows to external circuit</li>
                    <li>• Inverters convert DC to AC for grid connection</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Key Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• PV modules (panels) with multiple cells</li>
                    <li>• Mounting systems and tracking mechanisms</li>
                    <li>• DC optimisers and power electronics</li>
                    <li>• Inverters for AC conversion</li>
                    <li>• Monitoring and safety systems</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                <h4 className="text-yellow-400 font-semibold mb-2">Applications & Scale:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Residential (1-10kW)</h5>
                    <p className="text-gray-300">Rooftop systems for homes</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Commercial (10kW-5MW)</h5>
                    <p className="text-gray-300">Business and industrial installations</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Utility Scale (5MW+)</h5>
                    <p className="text-gray-300">Solar farms and large installations</p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Real-World Performance:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Capacity Factor:</strong> 15-25% (UK average)</li>
                    <li>• <strong>Module Efficiency:</strong> 15-22% (commercial panels)</li>
                    <li>• <strong>System Lifespan:</strong> 25-30 years with warranty</li>
                    <li>• <strong>Annual Degradation:</strong> 0.5-0.8% per year</li>
                  </ul>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>UK Peak Output:</strong> Summer midday (1000W/m²)</li>
                    <li>• <strong>Winter Performance:</strong> 20-30% of summer levels</li>
                    <li>• <strong>Installation Cost:</strong> £1,000-2,000/kW (residential)</li>
                    <li>• <strong>Grid Parity:</strong> Achieved in most UK regions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wind */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wind className="h-6 w-6 text-yellow-400" />
                Wind: Mechanical-to-Electrical Conversion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Wind turbines harness kinetic energy from moving air, converting it to rotational mechanical energy, then to electricity through generators.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Operating Principle:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Aerodynamic blade design creates lift force</li>
                    <li>• Rotor assembly converts wind to rotation</li>
                    <li>• Gearbox increases rotational speed</li>
                    <li>• Generator converts mechanical to electrical energy</li>
                    <li>• Power electronics condition output</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Turbine Types:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Horizontal axis (most common)</li>
                    <li>• Vertical axis (Darrieus, Savonius)</li>
                    <li>• Onshore installations</li>
                    <li>• Offshore wind farms</li>
                    <li>• Small-scale distributed systems</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                <h4 className="text-yellow-400 font-semibold mb-2">Performance Factors:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>Wind Speed:</strong> Power output proportional to wind speed cubed (P ∝ v³)</p>
                  <p><strong>Cut-in Speed:</strong> Minimum wind speed for generation (typically 3-4 m/s)</p>
                  <p><strong>Rated Speed:</strong> Wind speed for maximum output (typically 12-15 m/s)</p>
                  <p><strong>Cut-out Speed:</strong> Maximum safe operating speed (typically 25 m/s)</p>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">UK Wind Industry Facts:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Installed Capacity:</strong> 28.8GW (2023)</li>
                    <li>• <strong>Offshore Potential:</strong> World's largest offshore market</li>
                    <li>• <strong>Capacity Factor:</strong> 25-35% onshore, 45-55% offshore</li>
                    <li>• <strong>Turbine Size:</strong> 2-15MW (offshore up to 15MW+)</li>
                  </ul>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Hub Heights:</strong> 80-150m+ for modern turbines</li>
                    <li>• <strong>Rotor Diameter:</strong> 100-200m+ (offshore)</li>
                    <li>• <strong>Best UK Regions:</strong> Scotland, Wales, SW England</li>
                    <li>• <strong>Planning Distance:</strong> Typically 350m+ from dwellings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hydro */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Droplets className="h-6 w-6 text-cyan-400" />
                Hydro: Harnessing Water Flow for Steady Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Hydroelectric systems convert the potential and kinetic energy of flowing water into electricity, providing one of the most reliable renewable energy sources.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-3">System Types:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Large scale:</strong> Dams with reservoirs (&gt;30MW)</li>
                    <li>• <strong>Small scale:</strong> Run-of-river systems (&lt;30MW)</li>
                    <li>• <strong>Micro hydro:</strong> Very small installations (&lt;100kW)</li>
                    <li>• <strong>Pumped storage:</strong> Energy storage and generation</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-3">Key Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Water intake and diversion structures</li>
                    <li>• Penstocks (pressure pipes)</li>
                    <li>• Turbines (Pelton, Francis, Kaplan types)</li>
                    <li>• Generators and power electronics</li>
                    <li>• Control systems and tailrace</li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                <h4 className="text-cyan-400 font-semibold mb-2">Advantages:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <ul className="text-gray-300 space-y-1">
                    <li>• Very long lifespan (50-100 years)</li>
                    <li>• High efficiency (&gt;90%)</li>
                    <li>• Predictable output based on water flow</li>
                    <li>• Fast response for grid balancing</li>
                  </ul>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Low operating and maintenance costs</li>
                    <li>• Can provide flood control</li>
                    <li>• Water storage for multiple uses</li>
                    <li>• Black start capability</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-cyan-400 font-semibold mb-3">UK Hydro Landscape:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Total Capacity:</strong> ~1.9GW (large scale)</li>
                    <li>• <strong>Small Hydro:</strong> ~500MW additional capacity</li>
                    <li>• <strong>Best Regions:</strong> Scotland, Wales, Northern England</li>
                    <li>• <strong>Pumped Storage:</strong> 2.8GW (Dinorwig, Ffestiniog)</li>
                  </ul>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Annual Generation:</strong> ~2% of UK electricity</li>
                    <li>• <strong>Planning Considerations:</strong> Environmental impact assessments</li>
                    <li>• <strong>Fish Ladders:</strong> Required for river installations</li>
                    <li>• <strong>Grid Services:</strong> Essential for frequency response</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Biomass */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TreePine className="h-6 w-6 text-green-400" />
                Biomass: Burning Organic Material for Heat and Power
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Biomass energy systems burn organic materials to produce heat and electricity, offering a renewable alternative that can provide controllable, dispatchable power.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-green-400 font-semibold mb-3">Fuel Sources:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Wood chips, pellets, and forestry residues</li>
                    <li>• Agricultural residues (straw, husks)</li>
                    <li>• Energy crops (miscanthus, switchgrass)</li>
                    <li>• Organic waste and biogas</li>
                    <li>• Municipal solid waste (MSW)</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-green-400 font-semibold mb-3">Conversion Technologies:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Direct combustion in boilers</li>
                    <li>• Gasification for syngas production</li>
                    <li>• Pyrolysis for bio-oil</li>
                    <li>• Anaerobic digestion for biogas</li>
                    <li>• Co-firing with coal</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                <h4 className="text-green-400 font-semibold mb-2">Benefits Beyond Energy:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>Waste Management:</strong> Converts organic waste into useful energy</p>
                  <p><strong>Rural Development:</strong> Creates local jobs and income streams</p>
                  <p><strong>Carbon Cycle:</strong> CO₂ neutral when sustainably managed</p>
                  <p><strong>Security:</strong> Locally available fuel source</p>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">UK Biomass Implementation:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Drax Power Station:</strong> World's largest biomass plant</li>
                    <li>• <strong>Renewable Heat Incentive:</strong> Government support scheme</li>
                    <li>• <strong>Anaerobic Digestion:</strong> 600+ plants operational</li>
                    <li>• <strong>Wood Pellet Imports:</strong> Mainly from North America</li>
                  </ul>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>CHP Applications:</strong> Combined heat and power systems</li>
                    <li>• <strong>Agricultural Waste:</strong> Straw, poultry litter utilisation</li>
                    <li>• <strong>Forest Residues:</strong> Sustainable forestry byproducts</li>
                    <li>• <strong>Energy Crops:</strong> Miscanthus, short rotation coppice</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Matrix */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-yellow-400" />
                Technology Comparison Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-white p-3">System</th>
                      <th className="text-left text-green-400 p-3">Pros</th>
                      <th className="text-left text-red-400 p-3">Cons</th>
                      <th className="text-left text-yellow-400 p-3">Typical Scale</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium text-yellow-400">Solar PV</td>
                      <td className="p-3">
                        <ul className="text-xs space-y-1">
                          <li>• Highly scalable</li>
                          <li>• Low maintenance</li>
                          <li>• Modular design</li>
                          <li>• Silent operation</li>
                        </ul>
                      </td>
                      <td className="p-3">
                        <ul className="text-xs space-y-1">
                          <li>• Intermittent output</li>
                          <li>• Weather dependent</li>
                          <li>• Land use intensive</li>
                          <li>• Evening peak mismatch</li>
                        </ul>
                      </td>
                      <td className="p-3">1kW - 1GW+</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium text-yellow-400">Wind</td>
                      <td className="p-3">
                        <ul className="text-xs space-y-1">
                          <li>• High capacity factors</li>
                          <li>• Clean generation</li>
                          <li>• Offshore potential</li>
                          <li>• Complementary to solar</li>
                        </ul>
                      </td>
                      <td className="p-3">
                        <ul className="text-xs space-y-1">
                          <li>• Visual impact</li>
                          <li>• Noise considerations</li>
                          <li>• Wind variability</li>
                          <li>• Bird/bat impact</li>
                        </ul>
                      </td>
                      <td className="p-3">100kW - 1GW+</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium text-cyan-400">Hydro</td>
                      <td className="p-3">
                        <ul className="text-xs space-y-1">
                          <li>• Stable baseload</li>
                          <li>• Very long lifespan</li>
                          <li>• High efficiency</li>
                          <li>• Grid services</li>
                        </ul>
                      </td>
                      <td className="p-3">
                        <ul className="text-xs space-y-1">
                          <li>• Site limited</li>
                          <li>• Ecological risks</li>
                          <li>• High capital cost</li>
                          <li>• Social displacement</li>
                        </ul>
                      </td>
                      <td className="p-3">1MW - 22GW</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-green-400">Biomass</td>
                      <td className="p-3">
                        <ul className="text-xs space-y-1">
                          <li>• Waste utilisation</li>
                          <li>• Storable fuel</li>
                          <li>• Dispatchable power</li>
                          <li>• Rural development</li>
                        </ul>
                      </td>
                      <td className="p-3">
                        <ul className="text-xs space-y-1">
                          <li>• Some emissions</li>
                          <li>• Land use concerns</li>
                          <li>• Fuel logistics</li>
                          <li>• Ash disposal</li>
                        </ul>
                      </td>
                      <td className="p-3">100kW - 700MW</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Each renewable technology fills a different niche in the energy system. Solar and wind provide low-cost, scalable generation but with variable output. Hydro offers stable, controllable power but is limited by geographical constraints. Biomass provides dispatchable renewable energy while addressing waste management challenges.
              </p>
              <p className="text-yellow-400 font-medium">
                No single renewable technology is perfect for all applications, but the right combination can unlock grid resilience and enable a sustainable energy future.
              </p>
            </CardContent>
          </Card>

          {/* FAQ Section */}
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
                  <h4 className="text-cyan-400 font-semibold mb-2">Which renewable technology is best for homes?</h4>
                  <p className="text-gray-300 text-sm">
                    Solar PV is typically the most suitable for homes due to its scalability, modularity, and ease of installation on rooftops. Heat pumps can also be excellent for heating and hot water. The choice depends on your property's orientation, roof space, energy usage patterns, and local planning restrictions.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How efficient are solar panels in the UK?</h4>
                  <p className="text-gray-300 text-sm">
                    Modern solar panels achieve 15-22% efficiency, with a UK capacity factor of 15-25%. Despite less sunshine than sunnier countries, solar is still economically viable in the UK, generating about 1,000kWh per year per kW installed in southern England and 800-900kWh/kW in Scotland.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">Why is offshore wind more expensive than onshore?</h4>
                  <p className="text-gray-300 text-sm">
                    Offshore wind requires specialised vessels for installation, subsea cables for grid connection, offshore substations, and more complex maintenance access. However, offshore winds are stronger and more consistent, leading to higher capacity factors (45-55% vs 25-35% onshore) that offset some of the additional costs.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">Is biomass really renewable if it produces CO₂?</h4>
                  <p className="text-gray-300 text-sm">
                    Biomass is considered renewable because the CO₂ released when burning was recently absorbed from the atmosphere during plant growth, creating a short carbon cycle. However, this assumes sustainable sourcing - if biomass comes from deforestation or diverts food crops, it may not provide net climate benefits.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How long do renewable energy systems last?</h4>
                  <p className="text-gray-300 text-sm">
                    Lifespans vary significantly: solar panels 25-30 years, wind turbines 20-25 years, small hydro 50+ years, and large hydro 50-100+ years. While upfront costs may be higher, the long lifespan and minimal fuel costs often make renewables cheaper over their lifetime compared to fossil fuel alternatives.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">Can renewables really replace all fossil fuel power generation?</h4>
                  <p className="text-gray-300 text-sm">
                    Studies suggest renewables could provide 80-100% of electricity needs with the right mix of technologies, storage, grid flexibility, and demand management. The key challenges are seasonal storage for extended periods without wind or sun, and ensuring adequate system inertia and grid services traditionally provided by conventional power plants.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                Test your understanding of renewable energy system fundamentals with this interactive quiz.
              </p>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Renewable Energy Systems Quiz"
              />
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Link to="/study-centre/upskilling/renewable-energy-module-1-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/renewable-energy-module-1-section-3">
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

export default RenewableEnergyModule1Section2;