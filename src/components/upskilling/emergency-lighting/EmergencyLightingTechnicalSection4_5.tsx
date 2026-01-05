import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Wifi, Database, Building2, CheckCircle2 } from 'lucide-react';

export const EmergencyLightingTechnicalSection4_5 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Technical Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Section 1: Purpose of Remote Testing */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-elec-yellow font-bold">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Wifi className="h-5 w-5 text-green-400" />
                Purpose of Remote Testing
              </h3>
            </div>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground">
              Remote systems replace or support manual inspections by automatically carrying out essential tests 
              and maintaining compliance records. These systems transform emergency lighting maintenance from a 
              labour-intensive task into an efficient, automated process.
            </p>

            <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
              <h4 className="font-semibold text-green-300 mb-3">Automated Testing Functions</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Monthly Function Tests:</span>
                    <span className="text-foreground"> System automatically tests each luminaire for 1-2 minutes to verify operation</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Annual Full-Duration Tests:</span>
                    <span className="text-foreground"> Complete 3-hour discharge tests conducted automatically</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Electronic Logging:</span>
                    <span className="text-foreground"> All test results recorded digitally with time stamps for compliance audits</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Instant Fault Alerts:</span>
                    <span className="text-foreground"> Immediate notification when a luminaire or battery fails</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Quick Check
              </h4>
              <p className="text-foreground text-sm mb-2">Which two mandatory tests can remote systems automate?</p>
              <details className="text-foreground text-sm">
                <summary className="cursor-pointer text-elec-yellow hover:text-elec-yellow/80">Show Answer</summary>
                <p className="mt-2 pl-4 border-l-2 border-elec-yellow">
                  Monthly function tests and annual full-duration tests. These are the two primary testing requirements 
                  under BS 5266-1 that remote systems can fully automate, ensuring consistent compliance without manual intervention.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Section 2: Types of Systems */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-elec-yellow font-bold">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Wifi className="h-5 w-5 text-blue-400" />
                Types of Monitoring Systems
              </h3>
            </div>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground">
              There are three main types of remote testing systems, each with different installation requirements 
              and capabilities. The choice depends on building size, existing infrastructure, and budget.
            </p>

            {/* Self-Test Luminaires */}
            <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
              <h4 className="font-semibold text-green-300 mb-3">Self-Test Luminaires</h4>
              <div className="space-y-2 text-foreground text-sm">
                <p>
                  <span className="font-medium text-green-200">Description:</span> Each fitting carries out its own 
                  automated test independently. No central controller required.
                </p>
                <p>
                  <span className="font-medium text-green-200">Indication Method:</span> Pass/fail status shown via 
                  an LED on the luminaire (green = pass, red = fail).
                </p>
                <p>
                  <span className="font-medium text-green-200">Best For:</span> Small to medium sites (50-200 fittings) 
                  where visual checks of LED indicators are manageable.
                </p>
                <p>
                  <span className="font-medium text-green-200">Installation:</span> No additional wiring required beyond 
                  standard emergency lighting circuit.
                </p>
                <p>
                  <span className="font-medium text-green-200">Limitation:</span> Still requires personnel to physically 
                  inspect each luminaire to check LED status.
                </p>
              </div>
            </div>

            {/* Networked Systems */}
            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r">
              <h4 className="font-semibold text-blue-300 mb-3">Networked Systems</h4>
              <div className="space-y-2 text-foreground text-sm">
                <p>
                  <span className="font-medium text-blue-200">Description:</span> All luminaires connected to a central 
                  controller or building management system (BMS) via data cables.
                </p>
                <p>
                  <span className="font-medium text-blue-200">Control Method:</span> Centralised testing, monitoring, 
                  and reporting from a single interface.
                </p>
                <p>
                  <span className="font-medium text-blue-200">Best For:</span> Large sites (200+ fittings), high-security 
                  buildings, or facilities with existing BMS infrastructure.
                </p>
                <p>
                  <span className="font-medium text-blue-200">Installation:</span> Requires data cable runs (typically CAT5/6) 
                  from each luminaire to central controller or network switches.
                </p>
                <p>
                  <span className="font-medium text-blue-200">Advantages:</span> Real-time monitoring, instant alerts, 
                  comprehensive reporting, integration with other building systems.
                </p>
              </div>
            </div>

            {/* Wireless Systems */}
            <div className="bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r">
              <h4 className="font-semibold text-purple-300 mb-3">Wireless Monitoring Systems</h4>
              <div className="space-y-2 text-foreground text-sm">
                <p>
                  <span className="font-medium text-purple-200">Description:</span> Use radio communication (typically 
                  868 MHz or similar licensed bands) to avoid complex cabling.
                </p>
                <p>
                  <span className="font-medium text-purple-200">Communication:</span> Mesh network or star topology 
                  connecting luminaires to wireless gateway.
                </p>
                <p>
                  <span className="font-medium text-purple-200">Best For:</span> Refurbishments, listed buildings, 
                  or sites where data cabling is impractical or costly.
                </p>
                <p>
                  <span className="font-medium text-purple-200">Installation:</span> Minimal additional wiring — only 
                  wireless gateway requires network/internet connection.
                </p>
                <p>
                  <span className="font-medium text-purple-200">Advantages:</span> Fast installation, lower disruption, 
                  ideal for retrofit applications, cloud-based monitoring available.
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-600 text-sm">
                <thead className="bg-elec-dark">
                  <tr>
                    <th className="border border-gray-600 p-3 text-left text-foreground">Feature</th>
                    <th className="border border-gray-600 p-3 text-left text-green-300">Self-Test</th>
                    <th className="border border-gray-600 p-3 text-left text-blue-300">Networked</th>
                    <th className="border border-gray-600 p-3 text-left text-purple-300">Wireless</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr>
                    <td className="border border-gray-600 p-3 font-medium">Installation Complexity</td>
                    <td className="border border-gray-600 p-3 text-green-300">Low</td>
                    <td className="border border-gray-600 p-3 text-yellow-300">High</td>
                    <td className="border border-gray-600 p-3 text-green-300">Medium</td>
                  </tr>
                  <tr className="bg-elec-dark/50">
                    <td className="border border-gray-600 p-3 font-medium">Additional Wiring</td>
                    <td className="border border-gray-600 p-3">None</td>
                    <td className="border border-gray-600 p-3">Data cables required</td>
                    <td className="border border-gray-600 p-3">Gateway only</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 p-3 font-medium">Real-Time Monitoring</td>
                    <td className="border border-gray-600 p-3 text-red-300">No</td>
                    <td className="border border-gray-600 p-3 text-green-300">Yes</td>
                    <td className="border border-gray-600 p-3 text-green-300">Yes</td>
                  </tr>
                  <tr className="bg-elec-dark/50">
                    <td className="border border-gray-600 p-3 font-medium">Ideal Site Size</td>
                    <td className="border border-gray-600 p-3">50-200 fittings</td>
                    <td className="border border-gray-600 p-3">200+ fittings</td>
                    <td className="border border-gray-600 p-3">100+ fittings</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 p-3 font-medium">Best Application</td>
                    <td className="border border-gray-600 p-3">New builds (small)</td>
                    <td className="border border-gray-600 p-3">Large new builds</td>
                    <td className="border border-gray-600 p-3">Refurbishments</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Quick Check
              </h4>
              <p className="text-foreground text-sm mb-2">What is the main difference between a self-test luminaire and a networked system?</p>
              <details className="text-foreground text-sm">
                <summary className="cursor-pointer text-elec-yellow hover:text-elec-yellow/80">Show Answer</summary>
                <p className="mt-2 pl-4 border-l-2 border-elec-yellow">
                  Self-test luminaires operate independently with local LED indication, requiring physical inspection 
                  of each fitting. Networked systems connect all luminaires to a central controller, providing real-time 
                  monitoring, instant alerts, and comprehensive reporting from a single interface without needing to 
                  physically check each luminaire.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Section 3: Reporting and Documentation */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-elec-yellow font-bold">3</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Database className="h-5 w-5 text-yellow-400" />
                Reporting and Documentation
              </h3>
            </div>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground">
              Remote systems generate digital logs which transform compliance documentation from a manual, 
              paper-based process into an efficient, auditable electronic system that meets BS 5266-8 requirements.
            </p>

            <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r">
              <h4 className="font-semibold text-yellow-300 mb-3">Digital Log Capabilities</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Time-Stamped Records:</span>
                    <span className="text-foreground"> Every test recorded with exact date, time, and duration for audit trails</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Instant Failure Identification:</span>
                    <span className="text-foreground"> Failures highlighted immediately, reducing inspection time by 70-80%</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">BMS/Cloud Integration:</span>
                    <span className="text-foreground"> Data accessible via building management dashboards or cloud platforms</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Mobile Access:</span>
                    <span className="text-foreground"> Maintenance teams can access reports and receive alerts via smartphone apps</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">BS 5266-8 Compliance:</span>
                    <span className="text-foreground"> Automatic documentation meets all regulatory requirements without manual record-keeping</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Example Report Output</h4>
              <div className="bg-black/30 p-3 rounded font-mono text-sm text-green-300 overflow-x-auto">
                <div>Emergency Lighting Test Report</div>
                <div>Site: Manchester University - Engineering Block</div>
                <div>Test Type: Monthly Function Test</div>
                <div>Test Date: 15/03/2025 02:00:00</div>
                <div>-------------------------------------------</div>
                <div>Total Luminaires: 347</div>
                <div className="text-green-400">✓ Passed: 344 (99.1%)</div>
                <div className="text-red-400">✗ Failed: 3 (0.9%)</div>
                <div>-------------------------------------------</div>
                <div className="text-red-400">FAILURES:</div>
                <div className="text-red-400">→ Luminaire ID: L2-034 | Location: Floor 2 East Corridor</div>
                <div className="text-red-400">  Reason: Battery voltage low (9.2V)</div>
                <div className="text-red-400">→ Luminaire ID: L3-089 | Location: Floor 3 Lab Room</div>
                <div className="text-red-400">  Reason: LED failure detected</div>
                <div className="text-red-400">→ Luminaire ID: L1-156 | Location: Ground Floor Reception</div>
                <div className="text-red-400">  Reason: No response (check mains supply)</div>
                <div>-------------------------------------------</div>
                <div>Next Test Due: 15/04/2025</div>
                <div>Report Generated: 15/03/2025 02:47:33</div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-300 mb-2">Advantages Over Paper Logbooks</h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">No risk of lost or damaged records</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">Instant access for inspectors or auditors</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">Searchable historical data</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">Trend analysis for predictive maintenance</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">Automated backup and archiving</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">No handwriting legibility issues</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Quick Check
              </h4>
              <p className="text-foreground text-sm mb-2">Why are digital logs preferable to paper logbooks in large sites?</p>
              <details className="text-foreground text-sm">
                <summary className="cursor-pointer text-elec-yellow hover:text-elec-yellow/80">Show Answer</summary>
                <p className="mt-2 pl-4 border-l-2 border-elec-yellow">
                  Digital logs provide instant access to records, cannot be lost or damaged, are searchable for audits, 
                  highlight failures immediately without manual inspection, and ensure consistent BS 5266-8 compliance. 
                  In large sites with hundreds of luminaires, they reduce inspection time by 70-80% compared to manual 
                  paper-based systems.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Section 4: Application Suitability */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-elec-yellow font-bold">4</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-orange-400" />
                Application Suitability
              </h3>
            </div>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground">
              Remote testing systems are not appropriate for every building. The decision depends on site size, 
              occupancy risk, maintenance resources, and budget. Understanding when to recommend these systems 
              is crucial for providing cost-effective solutions.
            </p>

            {/* Best Suited For */}
            <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
              <h4 className="font-semibold text-green-300 mb-3">Highly Suitable Applications</h4>
              <div className="space-y-3">
                <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                  <h5 className="font-medium text-foreground mb-1 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-400" />
                    Airports and Transport Hubs
                  </h5>
                  <p className="text-foreground text-sm">
                    Large areas, 24/7 operation, high occupancy, strict compliance requirements. Typical: 500-2000+ luminaires.
                  </p>
                </div>
                <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                  <h5 className="font-medium text-foreground mb-1 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-red-400" />
                    Hospitals and Healthcare
                  </h5>
                  <p className="text-foreground text-sm">
                    Critical life-safety requirements, vulnerable occupants, can't afford system downtime. Typical: 300-1500 luminaires.
                  </p>
                </div>
                <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                  <h5 className="font-medium text-foreground mb-1 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-purple-400" />
                    Universities and Schools
                  </h5>
                  <p className="text-foreground text-sm">
                    Multiple buildings, large campuses, limited maintenance staff, high public scrutiny. Typical: 200-1000 luminaires.
                  </p>
                </div>
                <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                  <h5 className="font-medium text-foreground mb-1 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-yellow-400" />
                    Shopping Centres and Retail
                  </h5>
                  <p className="text-foreground text-sm">
                    High public occupancy, complex layouts, tenant coordination challenges. Typical: 300-1200 luminaires.
                  </p>
                </div>
                <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                  <h5 className="font-medium text-foreground mb-1 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-green-400" />
                    Hotels and Large Accommodation
                  </h5>
                  <p className="text-foreground text-sm">
                    Guest safety priority, 24/7 operation, testing must not disturb occupants. Typical: 200-800 luminaires.
                  </p>
                </div>
              </div>
            </div>

            {/* Less Critical Applications */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r">
              <h4 className="font-semibold text-orange-300 mb-3">Less Critical Applications</h4>
              <div className="space-y-2 text-foreground text-sm">
                <p>
                  <span className="font-medium text-orange-200">Small Offices:</span> Under 50 luminaires — manual 
                  testing is quick and cost-effective.
                </p>
                <p>
                  <span className="font-medium text-orange-200">Small Retail Units:</span> Limited occupancy, single-floor 
                  premises with straightforward testing requirements.
                </p>
                <p>
                  <span className="font-medium text-orange-200">Low-Occupancy Buildings:</span> Warehouses, storage facilities 
                  with minimal staff presence.
                </p>
                <p className="text-foreground italic mt-3">
                  In these cases, the cost of remote testing systems typically exceeds the labour savings achieved.
                </p>
              </div>
            </div>

            {/* Hybrid Approach */}
            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r">
              <h4 className="font-semibold text-blue-300 mb-3">Hybrid Implementation Strategy</h4>
              <p className="text-foreground text-sm mb-3">
                Some sites benefit from combining manual and remote testing approaches to optimise cost and efficiency:
              </p>
              <div className="space-y-2 text-foreground text-sm">
                <p>
                  <span className="font-medium text-blue-200">Main Building:</span> Networked or wireless system for 
                  primary occupied areas with high luminaire density.
                </p>
                <p>
                  <span className="font-medium text-blue-200">Ancillary Areas:</span> Self-test luminaires or manual 
                  testing for car parks, plant rooms, or storage areas.
                </p>
                <p>
                  <span className="font-medium text-blue-200">Example:</span> A hospital might use a networked system 
                  for wards, corridors, and clinical areas, but manual testing for small equipment stores and roof-level 
                  plant rooms.
                </p>
              </div>
            </div>

            {/* Decision Matrix */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-600 text-sm">
                <thead className="bg-elec-dark">
                  <tr>
                    <th className="border border-gray-600 p-3 text-left text-foreground">Site Characteristic</th>
                    <th className="border border-gray-600 p-3 text-center text-green-300">Remote Testing Recommended</th>
                    <th className="border border-gray-600 p-3 text-center text-orange-300">Manual Testing Acceptable</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr>
                    <td className="border border-gray-600 p-3 font-medium">Number of Luminaires</td>
                    <td className="border border-gray-600 p-3 text-center text-green-300">100+</td>
                    <td className="border border-gray-600 p-3 text-center text-orange-300">&lt; 100</td>
                  </tr>
                  <tr className="bg-elec-dark/50">
                    <td className="border border-gray-600 p-3 font-medium">Occupancy Risk Level</td>
                    <td className="border border-gray-600 p-3 text-center text-green-300">High (public/vulnerable)</td>
                    <td className="border border-gray-600 p-3 text-center text-orange-300">Low (staff only)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 p-3 font-medium">Maintenance Resources</td>
                    <td className="border border-gray-600 p-3 text-center text-green-300">Limited staff availability</td>
                    <td className="border border-gray-600 p-3 text-center text-orange-300">Dedicated maintenance team</td>
                  </tr>
                  <tr className="bg-elec-dark/50">
                    <td className="border border-gray-600 p-3 font-medium">Building Complexity</td>
                    <td className="border border-gray-600 p-3 text-center text-green-300">Multi-storey, large campus</td>
                    <td className="border border-gray-600 p-3 text-center text-orange-300">Single building, simple layout</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 p-3 font-medium">Compliance Scrutiny</td>
                    <td className="border border-gray-600 p-3 text-center text-green-300">High (regulated sector)</td>
                    <td className="border border-gray-600 p-3 text-center text-orange-300">Standard commercial</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Quick Check
              </h4>
              <p className="text-foreground text-sm mb-2">Name one type of site where remote testing provides major benefits.</p>
              <details className="text-foreground text-sm">
                <summary className="cursor-pointer text-elec-yellow hover:text-elec-yellow/80">Show Answer</summary>
                <p className="mt-2 pl-4 border-l-2 border-elec-yellow">
                  Airports, hospitals, universities, shopping centres, or hotels — any building with 100+ luminaires, 
                  high public occupancy, 24/7 operation, or limited maintenance staff. Remote testing reduces labour 
                  costs significantly whilst ensuring consistent compliance and instant fault detection in these complex environments.
                </p>
              </details>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
