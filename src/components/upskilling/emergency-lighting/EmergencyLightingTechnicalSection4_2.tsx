import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, CheckCircle2, AlertTriangle, Battery, Building2, Clock, Wrench, TrendingUp, DollarSign } from 'lucide-react';

export const EmergencyLightingTechnicalSection4_2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Technical Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Section 1 - Self-Contained Systems */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">1</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Self-Contained (Single-Point) Systems</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Each luminaire has an integrated battery and charger, operating independently of other emergency fittings. This distributed approach offers simplicity but comes with specific maintenance requirements.
            </p>

            <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-blue-500">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-blue-400 font-semibold text-lg flex items-center gap-2">
                  <Battery className="h-5 w-5" />
                  System Architecture
                </h4>
                <Badge className="bg-blue-600">Independent Operation</Badge>
              </div>
              <p className="text-foreground text-sm mb-3">
                Each emergency luminaire contains its own battery (typically NiCd or NiMH), charging circuit, control electronics, and LED lamp array. Units connect to standard final circuits and automatically switch to battery power during mains failure.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Battery Type:</strong> Nickel-Cadmium (NiCd) or Nickel-Metal Hydride (NiMH) rechargeable cells</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Operating Voltage:</strong> Typically 3.6V, 6V, or 12V DC depending on lamp configuration</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Charging Time:</strong> 24 hours from fully discharged to full capacity per BS 5266-1</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Wiring:</strong> Standard 230V AC supply via local lighting circuit or dedicated emergency circuit</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Advantages
                </h4>
                <ul className="space-y-2 text-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Simple Installation:</strong> Standard wiring from local circuits — no dedicated battery room or specialist cabling required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Independent Operation:</strong> Failure in one unit doesn't affect others. Each luminaire operates autonomously during emergencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Low Capital Cost:</strong> Ideal for small installations (under 50 luminaires) where upfront budget is limited</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Flexible Layout:</strong> Easy to add or relocate individual fittings without affecting system architecture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>No Single Point of Failure:</strong> Decentralised design prevents total system failure from single fault</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Disadvantages
                </h4>
                <ul className="space-y-2 text-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Frequent Battery Replacement:</strong> Every 3–5 years across all fittings, creating significant labour and material costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Temperature Sensitivity:</strong> Battery performance degrades in hot ({'>'}25°C) or cold ({'<'}5°C) environments, reducing autonomy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Labour-Intensive Maintenance:</strong> Testing and servicing multiple individual units throughout building is time-consuming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Higher Long-Term Costs:</strong> Cumulative battery replacements and testing labour exceed initial savings over 15+ years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Limited High-Power Options:</strong> Battery size constraints limit output for large area coverage or high-output applications</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-amber-300 font-semibold mb-1">Cost Analysis - Self-Contained Systems:</p>
                  <p className="text-foreground text-sm mb-2">
                    Typical 100-fitting installation in a medium office building:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-300"><strong className="text-foreground">Initial Installation:</strong> £15,000–£20,000</p>
                      <p className="text-gray-300"><strong className="text-foreground">Battery Replacement (Year 4):</strong> £8,000–£12,000</p>
                      <p className="text-gray-300"><strong className="text-foreground">Annual Testing Labour:</strong> £1,500–£2,500</p>
                    </div>
                    <div>
                      <p className="text-gray-300"><strong className="text-foreground">15-Year Total Cost:</strong> £55,000–£75,000</p>
                      <p className="text-gray-300"><strong className="text-foreground">Average Per Fitting:</strong> £550–£750 lifecycle cost</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">What is one advantage and one disadvantage of self-contained emergency lighting systems?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> <strong>Advantage:</strong> Simple to install with standard wiring, and independent operation means one failure doesn't affect other units. <strong>Disadvantage:</strong> Batteries need replacing every 3–5 years, and maintenance across many fittings is labour-intensive, increasing long-term costs.</p>
            </div>
          </div>
        </div>

        {/* Section 2 - Central Battery Systems */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">2</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Central Battery Systems</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              All emergency luminaires are powered by a centralised battery bank located in a dedicated room, typically connected via enhanced fire-resistant cabling. This architecture suits large, complex installations where reliability and maintenance efficiency are priorities.
            </p>

            <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-purple-500">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-purple-400 font-semibold text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  System Architecture
                </h4>
                <Badge className="bg-purple-600">Centralised Power</Badge>
              </div>
              <p className="text-foreground text-sm mb-3">
                A central battery bank (typically lead-acid or lithium-ion) supplies DC power to slave luminaires throughout the building via dedicated fire-resistant circuits. The battery room houses charging equipment, control panels, and monitoring systems.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Battery Types:</strong> Valve-Regulated Lead-Acid (VRLA), vented lead-acid, or lithium-ion battery banks</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Operating Voltage:</strong> 50V, 110V, or 216V DC depending on system size and lamp requirements</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Battery Room:</strong> Dedicated space with ventilation, fire suppression, and temperature control (15–25°C optimal)</p>
                <p className="text-gray-300 text-sm"><strong className="text-foreground">Cabling:</strong> Enhanced fire-resistant cable (FP200, FP Plus, MICC) with metal support systems throughout</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Advantages
                </h4>
                <ul className="space-y-2 text-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Centralised Maintenance:</strong> All batteries in one accessible location reduces inspection and servicing time by 60–70%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Extended Battery Life:</strong> 10–25 years depending on type (VRLA: 10–12 years, vented lead-acid: 15–25 years, lithium: 15+ years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Higher Reliability:</strong> Professional-grade batteries with redundant charging systems and continuous monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>High-Output Capability:</strong> Can power high-wattage luminaires and specialist equipment (escape route signage, powered exit doors)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Remote Monitoring:</strong> Integration with BMS allows real-time system health monitoring and automatic fault reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Lower Long-Term Costs:</strong> Despite higher installation cost, operational savings over 15–20 years are substantial</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Disadvantages
                </h4>
                <ul className="space-y-2 text-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>High Installation Costs:</strong> Enhanced fire-resistant cabling, dedicated battery room, and specialist equipment increase upfront investment by 40–60%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Central Point of Failure:</strong> Fault in battery room or distribution circuits can affect multiple luminaires (mitigated by circuit segregation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Space Requirements:</strong> Dedicated battery room (typically 6–12m² for medium buildings) must be accessible, ventilated, and secure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Complex Design:</strong> Requires specialist knowledge for battery sizing, circuit design, and fire-resistant cable selection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Battery Disposal Costs:</strong> End-of-life disposal for large lead-acid banks requires specialist contractors and environmental compliance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-amber-300 font-semibold mb-1">Cost Analysis - Central Battery Systems:</p>
                  <p className="text-foreground text-sm mb-2">
                    Typical 300-fitting installation in a large hospital or airport terminal:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-300"><strong className="text-foreground">Initial Installation:</strong> £120,000–£180,000</p>
                      <p className="text-gray-300"><strong className="text-foreground">Battery Replacement (Year 12):</strong> £30,000–£50,000</p>
                      <p className="text-gray-300"><strong className="text-foreground">Annual Testing Labour:</strong> £2,000–£3,500</p>
                    </div>
                    <div>
                      <p className="text-gray-300"><strong className="text-foreground">20-Year Total Cost:</strong> £210,000–£280,000</p>
                      <p className="text-gray-300"><strong className="text-foreground">Average Per Fitting:</strong> £700–£935 lifecycle cost</p>
                      <p className="text-blue-300 text-xs mt-2 italic">*Lower per-fitting cost than self-contained at this scale</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">Why is a central battery system often used in large hospitals or airports?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> Central battery systems provide higher reliability, easier maintenance in a single location, and longer battery life (10–25 years vs 3–5 years). For critical infrastructure like hospitals and airports with hundreds or thousands of luminaires, this centralised approach reduces maintenance labour, ensures consistent performance, and provides professional-grade reliability essential for life safety systems.</p>
            </div>
          </div>
        </div>

        {/* Section 3 - Application Suitability */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">3</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Application Suitability and Selection Criteria</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Choosing between self-contained and central battery systems depends on multiple factors including building size, occupancy risk, maintenance resources, and lifecycle budget. Understanding these criteria ensures optimal system selection.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-5">
                <h4 className="text-blue-400 font-semibold text-lg mb-3 flex items-center gap-2">
                  <Battery className="h-5 w-5" />
                  Self-Contained Systems
                </h4>
                <p className="text-foreground text-sm mb-3 font-medium">Ideal Applications:</p>
                <ul className="space-y-2 text-foreground text-sm mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span><strong>Small-Medium Buildings:</strong> Offices, retail units, restaurants (under 200 luminaires)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span><strong>Educational Facilities:</strong> Schools, colleges, training centres with standard evacuation procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span><strong>Distributed Layouts:</strong> Buildings with multiple separate areas or tenancies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span><strong>Budget-Constrained Projects:</strong> Where capital expenditure is limited but operational costs are acceptable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span><strong>No Battery Room Space:</strong> Existing buildings without suitable dedicated rooms</span>
                  </li>
                </ul>
                <div className="bg-blue-500/20 rounded p-3">
                  <p className="text-blue-200 text-xs font-semibold mb-1">Typical Building Types:</p>
                  <p className="text-foreground text-xs">Small offices • Retail shops • Restaurants • Primary schools • Community centres • Small warehouses</p>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-5">
                <h4 className="text-purple-400 font-semibold text-lg mb-3 flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Central Battery Systems
                </h4>
                <p className="text-foreground text-sm mb-3 font-medium">Ideal Applications:</p>
                <ul className="space-y-2 text-foreground text-sm mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span><strong>Large Complex Buildings:</strong> Airports, shopping centres, universities (200+ luminaires)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span><strong>Healthcare Facilities:</strong> Hospitals, care homes, medical centres with 24/7 operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span><strong>High-Occupancy Venues:</strong> Theatres, cinemas, sports stadiums, conference centres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span><strong>Critical Infrastructure:</strong> Data centres, transport hubs, emergency services buildings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span><strong>Long-Term Investment:</strong> Where lifecycle costs and reliability outweigh upfront savings</span>
                  </li>
                </ul>
                <div className="bg-purple-500/20 rounded p-3">
                  <p className="text-purple-200 text-xs font-semibold mb-1">Typical Building Types:</p>
                  <p className="text-foreground text-xs">Hospitals • Airports • Shopping centres • Hotels • High-rise offices • Universities • Industrial complexes</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-5">
              <h4 className="text-elec-yellow font-semibold text-lg mb-4">Decision Matrix - Key Selection Factors:</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-foreground py-3 pr-4 font-semibold">Factor</th>
                      <th className="text-left text-foreground py-3 px-4 font-semibold">Self-Contained</th>
                      <th className="text-left text-foreground py-3 pl-4 font-semibold">Central Battery</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-gray-300">Building Size</td>
                      <td className="py-3 px-4">{'Small-Medium (<200 fittings)'}</td>
                      <td className="py-3 pl-4 text-green-400">{'Large (200+ fittings)'}</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-gray-300">Installation Cost</td>
                      <td className="py-3 px-4 text-green-400">Low (£150–£200/fitting)</td>
                      <td className="py-3 pl-4">High (£400–£600/fitting)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-gray-300">Maintenance Cost</td>
                      <td className="py-3 px-4">High (labour-intensive)</td>
                      <td className="py-3 pl-4 text-green-400">Low (centralised)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-gray-300">Battery Lifespan</td>
                      <td className="py-3 px-4">3–5 years</td>
                      <td className="py-3 pl-4 text-green-400">10–25 years</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-gray-300">15-Year Lifecycle Cost</td>
                      <td className="py-3 px-4">£550–£750/fitting</td>
                      <td className="py-3 pl-4 text-green-400">£700–£935/fitting (at scale)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-gray-300">Reliability</td>
                      <td className="py-3 px-4">Moderate (distributed failure)</td>
                      <td className="py-3 pl-4 text-green-400">High (professional-grade)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-gray-300">Space Required</td>
                      <td className="py-3 px-4 text-green-400">None</td>
                      <td className="py-3 pl-4">6–12m² battery room</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-gray-300">Monitoring</td>
                      <td className="py-3 px-4">Manual or self-test units</td>
                      <td className="py-3 pl-4 text-green-400">Remote BMS integration</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-gray-300">Best For</td>
                      <td className="py-3 px-4">Simple, cost-sensitive projects</td>
                      <td className="py-3 pl-4 text-green-400">Complex, critical facilities</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Hybrid (Mixed) Approach
              </h4>
              <p className="text-foreground text-sm mb-3">
                Some buildings benefit from combining both systems — central battery for critical high-risk areas and self-contained for less critical zones:
              </p>
              <ul className="text-foreground text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span><strong>Hospital Example:</strong> Central battery for operating theatres, ICU, and main escape routes; self-contained for offices and storage areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span><strong>University Example:</strong> Central battery for lecture halls and laboratories; self-contained for administrative offices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span><strong>Shopping Centre:</strong> Central battery for main mall areas; self-contained for individual retail units</span>
                </li>
              </ul>
              <p className="text-blue-200 text-xs mt-3 italic">
                This approach balances reliability where it matters most with cost-effectiveness in lower-risk areas.
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">Give one example of a building type suited to self-contained systems and one suited to central battery systems.</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> <strong>Self-contained:</strong> A small office building (50–100 fittings) or retail shop where low installation costs, simple wiring, and no battery room space make self-contained units the practical choice. <strong>Central battery:</strong> A large hospital (300+ fittings) where thousands of luminaires need reliable 24/7 backup power, centralised maintenance is more efficient, and long-term operational savings justify higher upfront investment.</p>
            </div>
          </div>
        </div>

        {/* Section 4 - Maintenance and Testing */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold text-sm">4</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Maintenance and Testing Implications</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground leading-relaxed">
              Both system types must comply with BS 5266-8 (EN 50172) testing requirements, but the practical implementation differs significantly. Understanding these differences helps accurately assess long-term operational costs and maintenance resource requirements.
            </p>

            <div className="space-y-3">
              <div className="bg-elec-dark/50 rounded-lg p-5 border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500 text-foreground font-bold text-xs w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">SC</div>
                  <div className="flex-1">
                    <h4 className="text-blue-400 font-semibold text-lg mb-2">Self-Contained Systems - Testing Procedures</h4>
                    <p className="text-foreground text-sm mb-3">
                      Every luminaire must be individually tested at its physical location, requiring technicians to access each fitting throughout the building.
                    </p>
                    
                    <div className="space-y-3 mb-3">
                      <div className="bg-gray-900/50 rounded p-3">
                        <p className="text-elec-yellow text-sm font-semibold mb-1">Monthly Functional Test (per BS 5266-8):</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Simulate mains failure for each unit (test switch or circuit isolation)</li>
                          <li>• Verify lamp illuminates correctly</li>
                          <li>• Check charge indicator operation</li>
                          <li>• Record results for each luminaire</li>
                          <li>• <strong className="text-foreground">Time Required:</strong> 5–8 minutes per fitting (including access and documentation)</li>
                        </ul>
                      </div>

                      <div className="bg-gray-900/50 rounded p-3">
                        <p className="text-elec-yellow text-sm font-semibold mb-1">Annual Duration Test (per BS 5266-8):</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Discharge battery to verify rated duration (1 or 3 hours)</li>
                          <li>• Measure light output at intervals</li>
                          <li>• Allow 24-hour recharge period</li>
                          <li>• Identify units requiring battery replacement</li>
                          <li>• <strong className="text-foreground">Time Required:</strong> 15–20 minutes per fitting spread over 2 days</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-500/20 rounded p-3">
                      <p className="text-blue-200 text-xs font-semibold mb-2">Labour Cost Example - 100 Fitting Installation:</p>
                      <div className="grid md:grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-foreground">Monthly tests: 8–13 hours</p>
                          <p className="text-foreground">Annual tests: 25–33 hours (over 2 days)</p>
                        </div>
                        <div>
                          <p className="text-foreground"><strong>Total Annual Hours:</strong> 121–189 hours</p>
                          <p className="text-foreground"><strong>Annual Cost:</strong> £2,420–£3,780 @£20/hour</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-900/30 border border-amber-500/30 rounded p-3 mt-3">
                      <p className="text-amber-300 text-sm font-medium mb-1">Self-Test Automation Option:</p>
                      <p className="text-foreground text-xs">
                        Self-test units automate monthly and annual testing, reducing labour by 70–80%. Initial cost premium: +£30–£50 per fitting. Recommended for installations over 50 fittings to justify investment through labour savings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-5 border-l-4 border-purple-500">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-500 text-foreground font-bold text-xs w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">CB</div>
                  <div className="flex-1">
                    <h4 className="text-purple-400 font-semibold text-lg mb-2">Central Battery Systems - Testing Procedures</h4>
                    <p className="text-foreground text-sm mb-3">
                      Testing is centralised at the battery room control panel, with remote monitoring of slave luminaires throughout the building.
                    </p>
                    
                    <div className="space-y-3 mb-3">
                      <div className="bg-gray-900/50 rounded p-3">
                        <p className="text-elec-yellow text-sm font-semibold mb-1">Monthly Functional Test:</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Initiate test sequence from battery room control panel</li>
                          <li>• Visual inspection of slave luminaires (random sample or key routes)</li>
                          <li>• System automatically logs circuit status</li>
                          <li>• Review monitoring system reports</li>
                          <li>• <strong className="text-foreground">Time Required:</strong> 30–45 minutes total for entire system</li>
                        </ul>
                      </div>

                      <div className="bg-gray-900/50 rounded p-3">
                        <p className="text-elec-yellow text-sm font-semibold mb-1">Annual Duration Test:</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Full battery discharge test at control panel</li>
                          <li>• Verify all circuits maintain power for rated duration</li>
                          <li>• Measure battery voltage/current throughout discharge</li>
                          <li>• Visual walk-through inspection of critical areas</li>
                          <li>• <strong className="text-foreground">Time Required:</strong> 2–3 hours plus discharge duration</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-purple-500/20 rounded p-3">
                      <p className="text-purple-200 text-xs font-semibold mb-2">Labour Cost Example - 300 Fitting Installation:</p>
                      <div className="grid md:grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-foreground">Monthly tests: 6–9 hours/year</p>
                          <p className="text-foreground">Annual tests: 6–8 hours (including inspection)</p>
                        </div>
                        <div>
                          <p className="text-foreground"><strong>Total Annual Hours:</strong> 12–17 hours</p>
                          <p className="text-foreground"><strong>Annual Cost:</strong> £240–£340 @£20/hour</p>
                          <p className="text-green-300 font-semibold mt-1">85–90% labour reduction vs self-contained</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-900/30 border border-green-500/30 rounded p-3 mt-3">
                      <p className="text-green-300 text-sm font-medium mb-1">Remote Monitoring Advantages:</p>
                      <p className="text-foreground text-xs">
                        Modern central battery systems integrate with Building Management Systems (BMS), providing real-time monitoring, automatic fault alerts, battery health tracking, and comprehensive test logging. This reduces routine visits and enables predictive maintenance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-5 border-l-4 border-elec-yellow">
                <div className="flex items-start gap-3">
                  <Wrench className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-foreground font-semibold text-lg mb-2">Maintenance Resource Comparison</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left text-gray-400 py-2 pr-4 font-medium">Task</th>
                            <th className="text-left text-gray-400 py-2 px-4 font-medium">Self-Contained</th>
                            <th className="text-left text-gray-400 py-2 pl-4 font-medium">Central Battery</th>
                          </tr>
                        </thead>
                        <tbody className="text-foreground text-xs">
                          <tr className="border-b border-gray-700">
                            <td className="py-2 pr-4">Monthly Testing</td>
                            <td className="py-2 px-4">5–8 min/fitting × fittings</td>
                            <td className="py-2 pl-4 text-green-400">30–45 min total system</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 pr-4">Annual Duration Test</td>
                            <td className="py-2 px-4">15–20 min/fitting × fittings</td>
                            <td className="py-2 pl-4 text-green-400">2–3 hours + discharge time</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 pr-4">Battery Replacement Frequency</td>
                            <td className="py-2 px-4">Every 3–5 years (all fittings)</td>
                            <td className="py-2 pl-4 text-green-400">Every 10–25 years (single bank)</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 pr-4">Fault Diagnosis</td>
                            <td className="py-2 px-4">Requires physical inspection of each fitting</td>
                            <td className="py-2 pl-4 text-green-400">Remote monitoring with automatic alerts</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4">Access Requirements</td>
                            <td className="py-2 px-4">Access to every luminaire location</td>
                            <td className="py-2 pl-4 text-green-400">Battery room + visual inspection only</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-elec-yellow font-medium mb-2">Regulatory Compliance:</p>
              <p className="text-foreground text-sm leading-relaxed mb-2">
                <strong>BS 5266-8 (EN 50172):</strong> "Emergency lighting shall be tested monthly for operation and annually for duration. Records of all tests and maintenance shall be kept for the lifetime of the installation or a minimum of 5 years, whichever is longer."
              </p>
              <p className="text-gray-300 text-xs italic">
                Both system types must meet identical testing standards. The difference lies in HOW efficiently these tests can be conducted and documented.
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium mb-2">✅ Quick Check:</p>
              <p className="text-blue-200 text-sm mb-2">Why do self-contained systems often take longer to maintain?</p>
              <p className="text-blue-100 text-sm"><strong>Answer:</strong> Self-contained systems require technicians to physically visit and test each individual luminaire throughout the building, which is time-consuming in large installations (5–8 minutes per fitting monthly, 15–20 minutes annually). Battery replacements must also be carried out at multiple locations every 3–5 years rather than in one central room. This significantly increases labour hours compared to central battery systems where testing is conducted from a single control panel in the battery room.</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
