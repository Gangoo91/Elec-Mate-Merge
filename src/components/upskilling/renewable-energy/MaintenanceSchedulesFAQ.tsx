import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Calendar, Settings, AlertTriangle, Wrench } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MaintenanceSchedulesFAQ = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Maintenance Schedules FAQ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-400" />
                How often should I perform maintenance on PV systems?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Maintenance frequency depends on system type, location, and environmental factors:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium mb-2">Residential Systems:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Monthly:</strong> Performance monitoring review</li>
                    <li><strong>Quarterly:</strong> Visual inspection</li>
                    <li><strong>Bi-annually:</strong> Detailed electrical checks</li>
                    <li><strong>Annually:</strong> Comprehensive testing and cleaning</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                  <h5 className="text-green-400 font-medium mb-2">Commercial Systems:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Weekly:</strong> Monitoring system checks</li>
                    <li><strong>Monthly:</strong> Visual inspection and cleaning assessment</li>
                    <li><strong>Quarterly:</strong> Electrical testing and calibration</li>
                    <li><strong>Annually:</strong> Full system commissioning re-test</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 bg-yellow-900/20 p-3 rounded border border-yellow-500/30">
                <p className="text-yellow-400 font-medium text-sm">Environmental Adjustments:</p>
                <p className="text-gray-300 text-sm">Increase frequency in dusty, coastal, or high-pollen areas. After severe weather events, conduct immediate inspections.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-purple-400" />
                What's included in a comprehensive visual inspection?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Visual inspections form the foundation of preventive maintenance:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                  <h5 className="text-purple-400 font-medium mb-2">Panel and Mounting Assessment:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Glass condition - cracks, chips, delamination around edges</li>
                    <li>Frame integrity - corrosion, warping, loose corner keys</li>
                    <li>Junction box security - sealing, cable strain relief</li>
                    <li>Mounting hardware - rust, loose bolts, structural movement</li>
                    <li>Array alignment - sagging, wind damage, thermal expansion gaps</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                  <h5 className="text-orange-400 font-medium mb-2">Environmental Factors:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Shading analysis - new vegetation growth, nearby construction</li>
                    <li>Soiling assessment - bird droppings, dust, industrial deposits</li>
                    <li>Pest activity - bird nesting, wasp colonies, rodent damage</li>
                    <li>Weather damage - hail impacts, wind lifting, storm debris</li>
                    <li>Drainage and water management - pooling, ice dams, gutter overflow</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium mb-2">Electrical Components:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Cable condition - UV degradation, mechanical damage, support adequacy</li>
                    <li>Connector integrity - corrosion, looseness, water ingress</li>
                    <li>Inverter condition - cooling, error codes, display functionality</li>
                    <li>Isolator operation - smooth action, contact cleanliness</li>
                    <li>Earthing system - conductor continuity, corrosion protection</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-green-400" />
                How do I know when cleaning is required?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Cleaning requirements vary significantly based on location and environmental conditions:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                  <h5 className="text-green-400 font-medium mb-2">Performance Indicators:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Output reduction:</strong> {">"} 5% decrease compared to clean reference</li>
                    <li><strong>String imbalance:</strong> Significant current differences between strings</li>
                    <li><strong>Visual assessment:</strong> Obvious soiling, bird droppings, or dust accumulation</li>
                    <li><strong>Weather patterns:</strong> Extended dry periods in dusty areas</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-3 rounded border border-yellow-500/30">
                  <h5 className="text-yellow-400 font-medium mb-2">Environmental Triggers:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Coastal areas:</strong> Salt spray and seabird activity - monthly assessment</li>
                    <li><strong>Agricultural regions:</strong> Dust and pollen seasons - bi-monthly checks</li>
                    <li><strong>Industrial areas:</strong> Particulate pollution - monthly monitoring</li>
                    <li><strong>Urban environments:</strong> General pollution and construction dust - quarterly review</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium mb-2">Cleaning Guidelines:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Early morning or late evening cleaning to avoid thermal shock</li>
                    <li>Use deionised water and soft brushes or squeegees</li>
                    <li>Avoid high-pressure washing which can damage seals</li>
                    <li>Document before/after performance measurements</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                What are the signs of system degradation?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Early detection of degradation prevents major failures and optimises system lifespan:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                  <h5 className="text-red-400 font-medium mb-2">Performance Degradation Signs:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Gradual output decline:</strong> {">"} 0.8% per year suggests premature degradation</li>
                    <li><strong>String imbalance:</strong> {">"} 5% variation between similar strings</li>
                    <li><strong>Voltage reduction:</strong> Declining Voc measurements over time</li>
                    <li><strong>Efficiency loss:</strong> Reducing performance ratio below 80%</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                  <h5 className="text-orange-400 font-medium mb-2">Physical Degradation Indicators:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Discolouration:</strong> Browning or darkening of cells</li>
                    <li><strong>Delamination:</strong> Separation of layers, typically at edges</li>
                    <li><strong>Hotspots:</strong> Thermal imaging showing localised heating</li>
                    <li><strong>Corrosion:</strong> Frame oxidation, connection deterioration</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                  <h5 className="text-purple-400 font-medium mb-2">Inverter Degradation:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Efficiency decline:</strong> Reducing conversion efficiency over time</li>
                    <li><strong>Frequent errors:</strong> Increasing fault codes or restart cycles</li>
                    <li><strong>Overheating:</strong> Thermal protection activation</li>
                    <li><strong>Component failure:</strong> Capacitor swelling, fan noise, display issues</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How important are firmware updates for system components?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Firmware updates are critical for security, performance, and regulatory compliance:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium mb-2">Update Benefits:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Grid compliance:</strong> New regulations (G99, G100) implementation</li>
                    <li><strong>Performance optimisation:</strong> Improved MPPT algorithms and efficiency</li>
                    <li><strong>Security patches:</strong> Addressing cybersecurity vulnerabilities</li>
                    <li><strong>Bug fixes:</strong> Resolving known operational issues</li>
                    <li><strong>Feature additions:</strong> New functionality and communication protocols</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                  <h5 className="text-green-400 font-medium mb-2">Update Schedule:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Inverters:</strong> Check for updates quarterly, apply annually</li>
                    <li><strong>Optimisers:</strong> Update when inverter firmware is updated</li>
                    <li><strong>Battery systems:</strong> Monitor monthly, update bi-annually</li>
                    <li><strong>Monitoring systems:</strong> Enable automatic updates for non-critical patches</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-3 rounded border border-yellow-500/30">
                  <h5 className="text-yellow-400 font-medium mb-2">Update Precautions:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Backup current configuration before updating</li>
                    <li>Schedule updates during low production periods</li>
                    <li>Verify system operation after update completion</li>
                    <li>Document firmware versions in maintenance records</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What records should I maintain for each system?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Comprehensive record-keeping ensures warranty compliance, facilitates troubleshooting, and demonstrates due diligence:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <h5 className="text-foreground font-medium mb-2">Technical Documentation:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Installation certificates and commissioning reports</li>
                    <li>System schematics and equipment specifications</li>
                    <li>Test results with timestamps and technician details</li>
                    <li>Performance data and trend analysis</li>
                    <li>Warranty documentation and claim history</li>
                  </ul>
                </div>
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <h5 className="text-foreground font-medium mb-2">Maintenance Records:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Scheduled maintenance activities and results</li>
                    <li>Fault reports and corrective actions</li>
                    <li>Parts replacement history and costs</li>
                    <li>Environmental events and impact assessments</li>
                    <li>Training records for maintenance personnel</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 bg-purple-900/20 p-3 rounded border border-purple-500/30">
                <h5 className="text-purple-400 font-medium mb-2">Digital Asset Management:</h5>
                <p className="text-gray-300">Use cloud-based CMMS (Computerised Maintenance Management Systems) for automated scheduling, mobile access, and compliance reporting. Include photos, thermal images, and GPS coordinates for field documentation.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default MaintenanceSchedulesFAQ;