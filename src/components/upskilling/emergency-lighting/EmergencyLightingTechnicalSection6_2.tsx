import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, Shield, Bell, FileText, AlertTriangle, Users } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const EmergencyLightingTechnicalSection6_2 = () => {
  const [openChecks, setOpenChecks] = useState<number[]>([]);

  const toggleCheck = (index: number) => {
    setOpenChecks(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Content / Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* RRO Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Shield className="h-5 w-5" />
            1. The Regulatory Reform (Fire Safety) Order 2005
          </h3>
          
          <div className="space-y-3">
            <p className="leading-relaxed">
              The <strong>Regulatory Reform (Fire Safety) Order 2005 (RRO)</strong> is the primary fire safety legislation in England and Wales. 
              It replaced over 70 separate pieces of fire safety law and created a unified, risk-based regulatory framework. The RRO is enforced 
              by Fire and Rescue Authorities and carries significant criminal penalties for non-compliance.
            </p>

            <p className="text-sm leading-relaxed">
              The RRO applies to <strong>all non-domestic premises</strong>, including workplaces, shops, offices, factories, hospitals, schools, 
              hotels, residential care homes, and common areas in multi-occupancy residential buildings (flats, HMOs). It also applies to outdoor 
              spaces if they are part of the premises (car parks, external walkways, temporary structures).
            </p>
            
            <div className="p-4 bg-elec-dark rounded-lg border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">The Responsible Person</p>
              <p className="text-sm leading-relaxed mb-3">
                Article 3 of the RRO defines the "Responsible Person" as the person having control of the premises. This is typically:
              </p>
              <ul className="text-sm space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The employer</strong> — for workplaces with employees</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The building owner or landlord</strong> — for rented premises</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>An occupier with control</strong> — such as a tenant with management responsibilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>A facilities manager</strong> — if formally delegated the role</span>
                </li>
              </ul>
              <p className="text-sm mt-3 leading-relaxed">
                In complex buildings, there may be multiple Responsible Persons with overlapping duties (e.g., a landlord responsible for 
                common areas and tenants responsible for their own spaces). They must cooperate and coordinate their fire safety measures.
              </p>
            </div>

            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
              <p className="font-semibold text-red-400 mb-2">Key Obligations of the Responsible Person:</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Escape routes must be properly illuminated at all times</strong>
                    <p className="text-xs text-gray-300 mt-1">This includes normal lighting during occupation and emergency lighting 
                    on mains failure. Routes must be clearly visible and unobstructed.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Emergency lighting must operate effectively on mains failure</strong>
                    <p className="text-xs text-gray-300 mt-1">Systems must activate automatically within 5 seconds (0.5 seconds for 
                    high-risk areas) and provide specified illuminance levels for the required duration.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Maintenance and testing must be carried out at specified intervals</strong>
                    <p className="text-xs text-gray-300 mt-1">Monthly functional tests, annual full-duration discharge tests, 
                    and records must be maintained as per BS 5266-8.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Keep emergency lighting documentation as part of fire safety records</strong>
                    <p className="text-xs text-gray-300 mt-1">Design documentation, commissioning certificates, test logs, 
                    and maintenance records must be available for inspection.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-900/20 border border-orange-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-300 mb-2">Penalties for Non-Compliance:</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Unlimited fines</strong> (Magistrates' Court up to £5,000 per offence; Crown Court unlimited)</li>
                  <li>• <strong>Imprisonment up to 2 years</strong> for serious breaches</li>
                  <li>• <strong>Prohibition Notices</strong> closing premises immediately</li>
                  <li>• <strong>Enforcement Notices</strong> requiring works within set timescales</li>
                  <li>• <strong>Corporate Manslaughter charges</strong> if death results from gross negligence</li>
                </ul>
              </div>
              <div className="bg-purple-900/20 border border-purple-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Real Financial Impact:</h4>
                <ul className="text-sm space-y-2">
                  <li>• 2023 London hotel: £250,000 fine (inadequate emergency lighting)</li>
                  <li>• 2022 Birmingham warehouse: £180,000 fine + £45,000 costs</li>
                  <li>• 2024 Leeds care home: Director imprisoned 6 months (suspended)</li>
                  <li>• Typical business interruption costs: £5,000-£50,000 per day</li>
                  <li>• Increased insurance premiums: 50-300% following prosecution</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(0)}
              >
                ✅ Quick Check: Who holds the legal duty to ensure emergency lighting is maintained and tested?
              </Button>
              {openChecks.includes(0) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> The <strong>Responsible Person</strong> under the Regulatory Reform (Fire Safety) Order 2005 
                    holds this legal duty. This is typically the employer, building owner, landlord, or facilities manager — whoever has 
                    control of the premises. The duty cannot be delegated away entirely; the Responsible Person remains legally accountable 
                    even if they contract maintenance work to third parties. Failure to maintain emergency lighting is a criminal offence 
                    with potentially serious penalties including fines, imprisonment, and closure of premises.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fire Alarm Coordination */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Bell className="h-5 w-5" />
            2. Coordination with Fire Alarm and Detection Systems
          </h3>
          
          <div className="space-y-3">
            <p className="leading-relaxed">
              Emergency lighting must work in harmony with fire detection and alarm systems to create a cohesive life-safety infrastructure. 
              However, they must also function independently to protect against different failure scenarios. This balance between integration 
              and independence is critical to robust fire safety design.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">Independent Operation Requirements:</h4>
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Emergency lighting must activate automatically on mains failure, regardless of alarm activation.</strong>
                </p>
                <ul className="text-xs space-y-2 text-gray-300">
                  <li>• Power failure may occur without fire (electrical fault, works, power cut)</li>
                  <li>• Fire may not trigger alarms initially (slow-developing fire, detector failure)</li>
                  <li>• Emergency lighting protects during all evacuation scenarios, not just fire</li>
                  <li>• Systems must have separate supply arrangements and fault monitoring</li>
                </ul>
              </div>
              <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">Integrated Operation Benefits:</h4>
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Control interfaces may link alarm and lighting systems for enhanced functionality.</strong>
                </p>
                <ul className="text-xs space-y-2 text-gray-300">
                  <li>• Full-building emergency lighting can trigger on fire alarm activation</li>
                  <li>• Addressable systems can activate specific zones during staged evacuation</li>
                  <li>• Voice alarm systems can coordinate with lighting zone activation</li>
                  <li>• BMS integration enables centralized monitoring and fault reporting</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-dark rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Critical Integration Points:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Fire Alarm Control Panels</strong>
                    <p className="text-sm text-gray-300 mt-1">Panels must remain visible and illuminated by nearby emergency fittings. 
                    Fire wardens and fire service personnel must be able to read panel indicators, acknowledge alarms, and silence 
                    sounders during evacuation. Position emergency luminaires within 2m of panels, providing minimum 5 lux at panel face.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Manual Call Points</strong>
                    <p className="text-sm text-gray-300 mt-1">All manual call points (break glass units) must be clearly visible and 
                    identifiable during emergency operation. Emergency lighting should provide at least 5 lux at each call point location 
                    to enable operation even if normal lighting has failed.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Detector Head Access</strong>
                    <p className="text-sm text-gray-300 mt-1">Maintenance access routes to fire detector heads should have emergency 
                    lighting provision. This ensures maintenance can continue even during power failures or outside normal hours.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Staged Evacuation Systems</strong>
                    <p className="text-sm text-gray-300 mt-1">In tall buildings using staged (phased) evacuation, emergency lighting 
                    circuits may need zoning to match alarm zones. This allows floor-by-floor evacuation coordination and prevents 
                    unnecessary panic on floors not yet required to evacuate.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-300 mb-2">⚠️ Common Integration Mistakes:</h4>
              <ul className="text-sm space-y-2">
                <li>• Wiring emergency lighting through fire alarm isolation switches (dangerous — creates single point of failure)</li>
                <li>• Assuming alarm activation will trigger lighting (systems must be independent for mains-failure scenarios)</li>
                <li>• Inadequate illumination of alarm panels (fire service cannot operate panels in darkness)</li>
                <li>• Failing to test integrated functions during commissioning (integration failures only discovered during emergency)</li>
                <li>• Not documenting interface arrangements (future maintenance engineers don't understand the integration)</li>
              </ul>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(1)}
              >
                ✅ Quick Check: Why must fire alarm panels always be illuminated by emergency lighting?
              </Button>
              {openChecks.includes(1) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Fire alarm control panels must remain visible and operational during evacuation so that 
                    fire wardens, building managers, and fire service personnel can read panel indicators, identify the alarm source, 
                    acknowledge alarms, and silence sounders. If normal lighting fails during a fire, the panel becomes unusable without 
                    emergency lighting, potentially delaying fire service response and hindering effective fire management. BS 5266-1 
                    requires dedicated emergency lighting near all fire safety equipment, with minimum 5 lux at the panel face. This 
                    ensures critical fire safety systems remain operable throughout the emergency.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fire Strategy Integration */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            3. Integration with Evacuation and Fire Strategy Plans
          </h3>
          
          <div className="space-y-3">
            <p className="leading-relaxed">
              Every building must have a <strong>Fire Strategy</strong> (also called Fire Safety Strategy or Fire Engineering Strategy) 
              that documents how fire safety is achieved. Emergency lighting must be specified within this strategy and must support 
              the evacuation methodology the building employs. Mismatch between lighting provision and evacuation strategy creates 
              dangerous gaps in life safety.
            </p>

            <div className="p-4 bg-elec-dark rounded-lg border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-3">The Fire Strategy Must Include:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Clearly illuminated escape routes and final exits</strong>
                    <p className="text-sm text-gray-300 mt-1">All designated escape routes shown on fire strategy drawings must have 
                    emergency lighting to BS 5266-1 standards. This includes corridors, stairways, landings, lobbies, and final exit 
                    doors. The lighting must guide occupants from any location in the building to a place of ultimate safety outside.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Adequate lighting at fire-fighting equipment locations</strong>
                    <p className="text-sm text-gray-300 mt-1">Fire extinguishers, hose reels, dry risers, wet risers, sprinkler valves, 
                    fire blankets, and manual call points must all be illuminated by emergency lighting. BS 5266-1 requires minimum 5 lux 
                    at fire-fighting equipment to enable safe operation during power failure. Emergency luminaires should be positioned to 
                    avoid shadows that could obscure equipment identification or operation instructions.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Provisions for disabled evacuation</strong>
                    <p className="text-sm text-gray-300 mt-1">Refuges (safe waiting areas for disabled persons), evacuation lifts 
                    (where permitted), and disabled-accessible escape routes require enhanced emergency lighting. Refuges need minimum 
                    0.5 lux and must have emergency communication systems (which also require emergency lighting). Evacuation chairs, 
                    if provided, must be stored in illuminated locations with clear signage.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Safe illumination of assembly points</strong>
                    <p className="text-sm text-gray-300 mt-1">If evacuation occurs in darkness (evening, winter, power failure), 
                    external assembly points must be illuminated to enable roll-call, prevent dispersal, and facilitate emergency 
                    service access. This may require external emergency lighting or designated torch/lantern provision for fire 
                    wardens. Large sites may need illuminated muster point signs visible from multiple approach directions.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-900/20 border border-purple-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Simultaneous Evacuation:</h4>
                <p className="text-sm leading-relaxed mb-2">
                  All occupants evacuate immediately when alarm sounds. Common in smaller buildings.
                </p>
                <ul className="text-xs space-y-1 text-gray-300">
                  <li>• Emergency lighting activates throughout entire building</li>
                  <li>• All escape routes must be simultaneously illuminated</li>
                  <li>• Higher luminaire count and battery capacity required</li>
                  <li>• 3-hour duration often necessary due to full building load</li>
                </ul>
              </div>
              <div className="bg-teal-900/20 border border-teal-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-300 mb-2">Staged (Phased) Evacuation:</h4>
                <p className="text-sm leading-relaxed mb-2">
                  Occupants evacuate floor-by-floor or zone-by-zone. Common in tall buildings and hospitals.
                </p>
                <ul className="text-xs space-y-1 text-gray-300">
                  <li>• Zoned emergency lighting matches alarm zones</li>
                  <li>• Core escape routes (stairs) always fully illuminated</li>
                  <li>• Floor-specific circuits activate progressively</li>
                  <li>• Reduced simultaneous load may allow shorter duration</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(2)}
              >
                ✅ Quick Check: Which three locations must always be illuminated under a fire strategy?
              </Button>
              {openChecks.includes(2) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Three critical locations that must always be illuminated are: <strong>(1) Escape routes and 
                    final exits</strong> — to enable safe evacuation to a place of ultimate safety; <strong>(2) Fire-fighting equipment 
                    locations</strong> — including extinguishers, hose reels, call points, and sprinkler valves (minimum 5 lux); and 
                    <strong>(3) Fire alarm control panels and detection equipment</strong> — to enable operation by fire wardens and fire 
                    service (minimum 5 lux). Additional locations such as refuges, changes in level, obstruction hazards, first aid points, 
                    and toilet facilities exceeding 8m² also require emergency lighting, but the three listed above are the absolute minimum 
                    for any fire safety strategy.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fire Risk Assessment */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Users className="h-5 w-5" />
            4. The Role of the Fire Risk Assessment
          </h3>
          
          <div className="space-y-3">
            <p className="leading-relaxed">
              The <strong>Fire Risk Assessment (FRA)</strong> is the foundation of all fire safety provision under the RRO. Article 9 
              requires the Responsible Person to conduct a suitable and sufficient fire risk assessment. Emergency lighting requirements 
              flow directly from this assessment — the FRA determines what level of provision is "adequate" for the specific premises.
            </p>

            <div className="p-4 bg-elec-dark rounded-lg border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-3">The Fire Risk Assessment Process:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Identify fire hazards</strong>
                    <p className="text-sm text-gray-300 mt-1">Sources of ignition, fuel, and oxygen that could lead to fire.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Identify people at risk</strong>
                    <p className="text-sm text-gray-300 mt-1">Employees, visitors, contractors, disabled persons, sleeping occupants — 
                    anyone who may be present. This directly affects emergency lighting duration and coverage requirements.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Evaluate, remove, reduce, and protect from risk</strong>
                    <p className="text-sm text-gray-300 mt-1">Assess whether existing fire precautions are adequate or whether additional 
                    measures (including enhanced emergency lighting) are needed.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Record, plan, instruct, train</strong>
                    <p className="text-sm text-gray-300 mt-1">Document findings, create emergency plans, train staff, and maintain records.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Review regularly</strong>
                    <p className="text-sm text-gray-300 mt-1">FRAs must be reviewed annually or whenever significant changes occur 
                    (building alterations, change of use, after near-miss incidents).</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">FRA Determines Lighting Requirements:</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Duration</strong> — based on building type and evacuation complexity (1 or 3 hours)</li>
                  <li>• <strong>Coverage</strong> — which areas need escape route, open area, or high-risk task lighting</li>
                  <li>• <strong>Enhanced provision</strong> — for vulnerable occupants or complex layouts</li>
                  <li>• <strong>Maintenance frequency</strong> — risk level affects testing intervals</li>
                </ul>
              </div>
              <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">Electricians Should:</h4>
                <ul className="text-sm space-y-2">
                  <li>• Request a copy of the FRA before designing systems</li>
                  <li>• Liaise with fire risk assessors during design phase</li>
                  <li>• Flag any FRA deficiencies that affect lighting requirements</li>
                  <li>• Recommend FRA review if building changes occur during works</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-300 mb-2">⚠️ Common FRA Integration Failures:</h4>
              <ul className="text-sm space-y-2">
                <li>• Electrician not provided with FRA before starting design (working blind to actual risk profile)</li>
                <li>• FRA conducted after installation complete (should inform design, not validate it retrospectively)</li>
                <li>• Generic FRA used without building-specific consideration (template FRAs miss unique hazards)</li>
                <li>• FRA doesn't mention emergency lighting at all (assessor not competent in electrical fire precautions)</li>
                <li>• Changes to building not reflected in FRA review (emergency lighting becomes inadequate after alterations)</li>
              </ul>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(3)}
              >
                ✅ Quick Check: Who determines the specific emergency lighting requirements for each building?
              </Button>
              {openChecks.includes(3) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> The <strong>Fire Risk Assessor</strong> (working on behalf of the Responsible Person) 
                    determines the specific requirements through the fire risk assessment process. The FRA evaluates the building type, 
                    occupancy characteristics, evacuation complexity, vulnerable persons present, and fire hazards to establish what 
                    emergency lighting provision is "suitable and sufficient" for that premises. The electrician then designs and installs 
                    a system that meets these requirements while complying with BS 5266-1 and EN 1838 technical standards. It's a 
                    collaborative process: the FRA defines "what is needed," the standards define "how to achieve it," and the electrician 
                    implements the solution. Never design emergency lighting without first consulting the building's fire risk assessment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enforcement */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Shield className="h-5 w-5" />
            5. Enforcement and Inspections
          </h3>
          
          <div className="space-y-3">
            <p className="leading-relaxed">
              The RRO is enforced by <strong>Fire and Rescue Authorities</strong> (FRAs) — typically the local Fire and Rescue Service. 
              Fire Safety Officers (also called Fire Safety Inspectors or Enforcing Officers) have extensive powers to enter premises, 
              inspect fire safety measures, request documentation, and take enforcement action where necessary.
            </p>

            <div className="p-4 bg-elec-dark rounded-lg border border-red-600/30">
              <p className="font-semibold text-red-400 mb-3">Fire Authority Powers Under the RRO:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Right of Entry (Article 27)</strong>
                    <p className="text-xs text-gray-300 mt-1">Inspectors can enter premises at any reasonable time without notice (or at any 
                    time if they believe there is immediate danger). Obstruction is a criminal offence.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Alterations Notices (Article 29)</strong>
                    <p className="text-xs text-gray-300 mt-1">Require Responsible Person to notify FRA before making structural changes or 
                    changes to fire precautions. Applies to high-risk premises.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Enforcement Notices (Article 30)</strong>
                    <p className="text-xs text-gray-300 mt-1">Specify works or improvements required within a set timeframe (typically 28 days 
                    to 6 months). Failure to comply is a criminal offence.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Prohibition Notices (Article 31)</strong>
                    <p className="text-xs text-gray-300 mt-1">Immediately prohibit use of premises (or parts) where there is serious risk to 
                    life. This can close businesses instantly until remedial works are completed.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Prosecution (Article 32)</strong>
                    <p className="text-xs text-gray-300 mt-1">Responsible Persons can be prosecuted in Magistrates' Court (fines up to £5,000 
                    per offence) or Crown Court (unlimited fines and up to 2 years imprisonment).</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-300 mb-3">Typical Fire Safety Audit Process:</h4>
              <ol className="text-sm space-y-2">
                <li><strong>1. Pre-visit notification</strong> (for routine audits — not required for concern-based visits)</li>
                <li><strong>2. Site walkthrough</strong> — inspector examines escape routes, fire precautions, emergency lighting</li>
                <li><strong>3. Documentation review</strong> — request for FRA, test logs, certificates, maintenance records</li>
                <li><strong>4. Interviews</strong> — discuss procedures with Responsible Person and staff</li>
                <li><strong>5. Audit report</strong> — findings sent within 28 days, may include recommendations or formal notice</li>
                <li><strong>6. Follow-up</strong> — re-inspection to verify compliance with any notices served</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-900/20 border border-purple-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Documents Inspectors Request:</h4>
                <ul className="text-sm space-y-2">
                  <li>• Fire risk assessment (current version)</li>
                  <li>• Emergency lighting test records and logbooks</li>
                  <li>• Installation certificates and commissioning documents</li>
                  <li>• Maintenance contracts and service history</li>
                  <li>• As-built drawings showing emergency lighting layouts</li>
                  <li>• Staff fire safety training records</li>
                  <li>• Fire evacuation procedures and fire action notices</li>
                </ul>
              </div>
              <div className="bg-teal-900/20 border border-teal-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-300 mb-2">Common Audit Failures:</h4>
                <ul className="text-sm space-y-2">
                  <li>• No test records available (failure to maintain logbook)</li>
                  <li>• Tests not conducted at required intervals</li>
                  <li>• Missing installation certificates or design calculations</li>
                  <li>• Emergency lighting not referenced in FRA</li>
                  <li>• Documented faults not rectified within reasonable time</li>
                  <li>• Responsible Person cannot locate or produce records</li>
                  <li>• Maintenance contracts expired or not in place</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2">⚠️ Reality Check:</h4>
              <p className="text-sm leading-relaxed">
                Fire officers treat missing documentation as seriously as non-functioning equipment. The attitude is: "If you can't prove 
                compliance, you aren't compliant." A perfectly working emergency lighting system with no test records, no commissioning 
                certificate, and no FRA integration is considered non-compliant and can result in enforcement action. Document everything, 
                keep records accessible, and ensure the Responsible Person understands their obligation to maintain records for inspection.
              </p>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(4)}
              >
                ✅ Quick Check: What documents do fire inspectors typically request during an audit?
              </Button>
              {openChecks.includes(4) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Fire inspectors typically request: <strong>(1) Fire risk assessment</strong> (current version 
                    showing emergency lighting provision); <strong>(2) Test records and logbooks</strong> (monthly functional tests and 
                    annual discharge tests as per BS 5266-8); <strong>(3) Installation certificates and commissioning documents</strong> 
                    (proving system was designed and installed to BS 5266-1); <strong>(4) Maintenance contracts and service history</strong> 
                    (demonstrating ongoing competent maintenance); <strong>(5) As-built drawings</strong> (showing emergency lighting layouts 
                    integrated with fire strategy); and <strong>(6) Fire evacuation procedures and training records</strong> (proving 
                    occupants understand emergency procedures). Missing any of these documents can result in enforcement action, even if the 
                    physical system works correctly. Good record-keeping is not optional — it's a legal requirement.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
