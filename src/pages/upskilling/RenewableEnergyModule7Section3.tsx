import { ArrowLeft, ArrowRight, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section3Questions } from '@/data/upskilling/renewableEnergyModule7QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import MaintenanceSchedulesPractical from '@/components/upskilling/renewable-energy/MaintenanceSchedulesPractical';
import MaintenanceSchedulesFAQ from '@/components/upskilling/renewable-energy/MaintenanceSchedulesFAQ';

const RenewableEnergyModule7Section3 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Maintenance Schedules (Visual, Electrical, Firmware)
                </h1>
                <p className="text-xl text-gray-400">
                  Creating proactive maintenance plans for renewable energy systems
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 7
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 3
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Ongoing maintenance keeps systems safe, efficient, and complaint-free. A structured approach to maintenance 
                ensures optimal performance and prevents costly failures.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Create and follow a proactive maintenance plan</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Distinguish between visual, electrical, and software tasks</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Recognise signs of system degradation</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Visual Maintenance Checks</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Regular visual inspections are the first line of defence against system degradation and the most cost-effective maintenance activity:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Panel and Mounting Inspection:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Corrosion assessment:</strong> Check mounting hardware, rails, and clamps for rust or galvanic corrosion</li>
                    <li><strong>Frame integrity:</strong> Inspect for cracks, warping, or loose corner keys in panel frames</li>
                    <li><strong>Glass condition:</strong> Look for cracks, chips, or delamination around edges</li>
                    <li><strong>Junction box security:</strong> Verify tight sealing and cable strain relief</li>
                    <li><strong>Grounding system:</strong> Check equipment grounding conductors and bond connections</li>
                    <li><strong>Drainage paths:</strong> Ensure water can drain freely without pooling</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">Environmental Factors:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Vegetation monitoring:</strong> Document new shading from tree growth or seasonal changes</li>
                    <li><strong>Soiling analysis:</strong> Assess bird droppings, dust, pollen, or industrial deposits</li>
                    <li><strong>Pest control:</strong> Check for bird nesting, wasp colonies, or rodent intrusion under arrays</li>
                    <li><strong>Weather damage:</strong> Look for hail damage, wind lifting, or storm-related displacement</li>
                    <li><strong>Thermal effects:</strong> Check for discolouration indicating overheating or hotspots</li>
                    <li><strong>Access safety:</strong> Verify safe working conditions and fall protection anchor points</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-yellow-400 mb-3">Cable and Connection Assessment:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">DC Cables:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• UV degradation of cable jackets</li>
                      <li>• Mechanical damage from wildlife</li>
                      <li>• Connector corrosion or looseness</li>
                      <li>• Cable support adequacy</li>
                      <li>• Conduit integrity and sealing</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">AC Connections:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Inverter ventilation and cooling</li>
                      <li>• AC disconnect operation</li>
                      <li>• Meter and monitoring connections</li>
                      <li>• Earthing system continuity</li>
                      <li>• Surge protection devices</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <h4 className="font-semibold text-purple-400 mb-3">Inspection Frequency Guidelines:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Monthly:</strong> Basic visual checks, monitoring system review</p>
                  <p><strong>Quarterly:</strong> Detailed panel and mounting inspection</p>
                  <p><strong>Bi-annually:</strong> Electrical connections, inverter cleaning</p>
                  <p><strong>Annually:</strong> Comprehensive system assessment with testing</p>
                  <p><strong>After severe weather:</strong> Immediate damage assessment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Electrical Testing and Firmware Updates</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Systematic electrical testing validates system performance and identifies degradation before it affects energy yield:</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Essential Electrical Tests:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Insulation resistance (IR):</strong> Min 1MΩ @ 500V DC, test annually or after faults</li>
                    <li><strong>String performance:</strong> Voc and Isc measurements under known irradiance conditions</li>
                    <li><strong>Earth fault loop impedance:</strong> Verify protective device operation times</li>
                    <li><strong>Voltage drop assessment:</strong> DC and AC side measurements under load</li>
                    <li><strong>Power quality analysis:</strong> THD, power factor, and frequency measurements</li>
                    <li><strong>Arc fault detection:</strong> Test AFCI operation and sensitivity</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">Performance Analysis:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Performance ratio (PR):</strong> Target {">"} 80% for well-maintained systems</li>
                    <li><strong>String current balancing:</strong> Variations {">"} 5% indicate issues</li>
                    <li><strong>Inverter efficiency:</strong> Monitor conversion efficiency trends</li>
                    <li><strong>Temperature coefficients:</strong> Verify against manufacturer specifications</li>
                    <li><strong>Degradation rates:</strong> Expect 0.5-0.8% annual decline</li>
                    <li><strong>Availability metrics:</strong> Track system uptime and fault frequency</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                <h4 className="font-semibold text-orange-400 mb-3">Software and Firmware Maintenance:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Firmware Updates:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Inverter firmware for grid compliance</li>
                      <li>• Optimiser communication protocols</li>
                      <li>• Battery management system updates</li>
                      <li>• Smart meter integration improvements</li>
                      <li>• Security patches and bug fixes</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Data Systems:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Monitoring platform configuration</li>
                      <li>• Data logging verification</li>
                      <li>• Communication pathway testing</li>
                      <li>• Alert threshold calibration</li>
                      <li>• Historical data backup</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                <h4 className="font-semibold text-red-400 mb-3">Critical Test Equipment Requirements:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-medium mb-2">For PV Systems:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• PV analyser with I-V curve capability</li>
                      <li>• Insulation resistance tester (1000V)</li>
                      <li>• True RMS clamp meters (DC capable)</li>
                      <li>• Irradiance meter (calibrated annually)</li>
                      <li>• Thermal imaging camera (optional but valuable)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Maintenance Planning and Documentation</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Planned vs Reactive Maintenance Strategy:</h4>
                <p className="text-sm mb-3">
                  Planned maintenance schedules prevent issues before they occur, while reactive maintenance 
                  responds to failures. A good ratio is 80% planned, 20% reactive maintenance for optimal cost-effectiveness.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Planned Maintenance Benefits:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Predictable costs and scheduling</li>
                      <li>• Extended equipment lifespan</li>
                      <li>• Optimised energy generation</li>
                      <li>• Warranty compliance</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Reactive Maintenance Risks:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Higher repair costs</li>
                      <li>• Extended system downtime</li>
                      <li>• Potential safety hazards</li>
                      <li>• Lost revenue from reduced generation</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <h4 className="font-semibold text-purple-400 mb-3">Comprehensive Documentation Requirements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Technical Records:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Installation certificates and commissioning reports</li>
                      <li>• As-built drawings and equipment specifications</li>
                      <li>• Test results with date stamps and technician details</li>
                      <li>• Performance trending and degradation analysis</li>
                      <li>• Component serial numbers and installation dates</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Operational Records:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Maintenance schedules and completed work orders</li>
                      <li>• Fault reports and corrective actions taken</li>
                      <li>• Parts replacement history and costs</li>
                      <li>• Weather events and impact assessments</li>
                      <li>• Training records for maintenance personnel</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-3">Digital Maintenance Management:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-medium mb-2">Modern Tools and Technologies:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Computerised Maintenance Management Systems (CMMS)</li>
                      <li>• Mobile apps for field data collection</li>
                      <li>• Drone inspections for large installations</li>
                      <li>• Predictive analytics for failure forecasting</li>
                      <li>• Cloud-based document storage and access</li>
                      <li>• Automated reporting and compliance tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Real World Scenario</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-md p-4">
                <p className="text-sm">
                  <strong>Case Study:</strong> A client reported system underperformance—traced to outdated 
                  inverter firmware and unnoticed shading from plant growth. Regular maintenance would have 
                  identified both issues before they significantly impacted generation.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Routine maintenance saves long-term costs and ensures consistent generation performance. 
                A systematic approach combining visual, electrical, and software maintenance tasks creates 
                a comprehensive maintenance strategy.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
          <MaintenanceSchedulesPractical />
          <MaintenanceSchedulesFAQ />
          <SingleQuestionQuiz 
            questions={section3Questions}
            title="Maintenance Schedules Quiz"
          />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../renewable-energy-module-7-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-7-section-4">
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

export default RenewableEnergyModule7Section3;