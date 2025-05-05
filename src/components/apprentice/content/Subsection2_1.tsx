
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Cable, Calculator } from "lucide-react";

interface Subsection2_1Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection2_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection2_1Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Cable Types and Calculation Principles</h2>
      
      <div className="space-y-5">
        <p>
          Selecting the appropriate cable type and size is critical for safe, efficient electrical installations.
          Different cables are designed for specific applications based on their construction, insulation properties,
          and current-carrying capacities.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-5 mt-6">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Cable className="h-5 w-5 mr-2" />
            Common Cable Types and Applications
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">PVC Flat Twin & Earth</h4>
              
              <div className="space-y-2">
                <p>The most common domestic cable for fixed wiring installations.</p>
                
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Grey PVC insulated and sheathed</li>
                  <li>Typically 1mm², 1.5mm², 2.5mm², 4mm², 6mm², 10mm²</li>
                  <li>Maximum operating temperature: 70°C</li>
                  <li>Non-flame retardant standard version</li>
                </ul>
                
                <div className="bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-semibold text-elec-yellow mb-1">Common Applications:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Lighting circuits (typically 1mm² or 1.5mm²)</li>
                    <li>Socket circuits (typically 2.5mm²)</li>
                    <li>Cooker circuits (typically 6mm² or 10mm²)</li>
                    <li>Shower circuits (typically 6mm² or 10mm²)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">LSZH (Low Smoke Zero Halogen)</h4>
              
              <div className="space-y-2">
                <p>Used where fire safety is a significant concern, particularly in public buildings and escape routes.</p>
                
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Emits minimal smoke and no toxic halogen gases in fire</li>
                  <li>Available in similar sizes to standard PVC cable</li>
                  <li>Typically white or light grey in colour</li>
                  <li>Higher temperature rating than standard PVC</li>
                </ul>
                
                <div className="bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-semibold text-elec-yellow mb-1">Common Applications:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Schools, hospitals, and care homes</li>
                    <li>High-rise buildings</li>
                    <li>Underground transport systems</li>
                    <li>Any location where evacuation may be delayed</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">SWA (Steel Wire Armoured)</h4>
              
              <div className="space-y-2">
                <p>Heavy-duty cable with mechanical protection provided by steel wire armour.</p>
                
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>PVC or XLPE insulated cores</li>
                  <li>Steel wire armour for mechanical protection</li>
                  <li>Available from 1.5mm² up to 300mm²</li>
                  <li>Suitable for direct burial</li>
                </ul>
                
                <div className="bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-semibold text-elec-yellow mb-1">Common Applications:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Underground supplies</li>
                    <li>External lighting and power</li>
                    <li>Industrial installations</li>
                    <li>Areas with risk of mechanical damage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">FP (Fire Performance) Cables</h4>
              
              <div className="space-y-2">
                <p>Designed to maintain circuit integrity during a fire, allowing essential systems to continue functioning.</p>
                
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Mineral insulated or special polymer insulants</li>
                  <li>Survival times from 30 minutes to 3 hours</li>
                  <li>Categories: standard (PH), enhanced (E), and circuit integrity (CI)</li>
                  <li>Red or orange sheath for easy identification</li>
                </ul>
                
                <div className="bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-semibold text-elec-yellow mb-1">Common Applications:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Fire alarm systems</li>
                    <li>Emergency lighting</li>
                    <li>Smoke extraction systems</li>
                    <li>Firefighting lifts and equipment</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">Flexible Cords</h4>
              
              <div className="space-y-2">
                <p>Used for connecting portable appliances and equipment where flexibility is required.</p>
                
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Multi-stranded conductors for flexibility</li>
                  <li>Various types: H03VV-F, H05VV-F, H07RN-F</li>
                  <li>Different temperature and environmental ratings</li>
                  <li>Size range typically 0.5mm² to 2.5mm²</li>
                </ul>
                
                <div className="bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-semibold text-elec-yellow mb-1">Common Applications:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Appliance connections</li>
                    <li>Pendant light fittings</li>
                    <li>Extension leads</li>
                    <li>Power tools and portable equipment</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">Data and Communication Cables</h4>
              
              <div className="space-y-2">
                <p>Specialised cables for transmitting signals and data with minimal interference.</p>
                
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>CAT5e, CAT6, CAT6a, CAT7, CAT8 classifications</li>
                  <li>Twisted pair construction to reduce interference</li>
                  <li>Shielded (STP) and unshielded (UTP) versions</li>
                  <li>LSZH or PVC outer sheaths</li>
                </ul>
                
                <div className="bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-semibold text-elec-yellow mb-1">Common Applications:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Ethernet networks</li>
                    <li>Telephone systems</li>
                    <li>Building management systems</li>
                    <li>Audio-visual installations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Cable Calculation Principles
          </h3>
          
          <div className="space-y-5 mt-4">
            <p>
              Proper cable sizing ensures safety, compliance with regulations, and optimum performance. 
              Several factors must be considered when calculating the appropriate cable size:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Design Current and Thermal Considerations</h4>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-white">Design Current (Ib)</h5>
                    <p className="text-sm mt-1">The maximum current expected to flow under normal operation, calculated based on the connected load.</p>
                    <p className="text-sm mt-1">For motor circuits, starting currents must be considered. For multiple outlets, diversity factors may be applied.</p>
                  </div>
                  
                  <div className="mt-3">
                    <h5 className="font-medium text-white">Current-Carrying Capacity (Iz)</h5>
                    <p className="text-sm mt-1">The maximum current a cable can safely carry continuously without exceeding its temperature rating.</p>
                    <p className="text-sm mt-1">Found in tables in BS 7671 Appendix 4, based on installation method and cable type.</p>
                  </div>
                  
                  <div className="bg-elec-dark/70 p-3 rounded-md mt-3 text-sm">
                    <p className="font-semibold text-elec-yellow mb-1">Requirement:</p>
                    <p>The cable's current-carrying capacity (Iz) must be greater than or equal to the design current (Ib):</p>
                    <p className="font-medium mt-1 text-center">Iz ≥ Ib</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Correction Factors</h4>
                
                <div className="space-y-3">
                  <p className="text-sm">Various environmental and installation conditions can reduce a cable's current-carrying capacity:</p>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium text-white">Ambient Temperature (Ca)</h5>
                    <p className="text-sm mt-1">Applies when ambient temperature differs from the reference temperature (30°C for most cables).</p>
                    <p className="text-sm mt-1">Higher temperatures reduce current-carrying capacity; lower temperatures increase it.</p>
                  </div>
                  
                  <div className="space-y-2 mt-2">
                    <h5 className="font-medium text-white">Grouping Factor (Cg)</h5>
                    <p className="text-sm mt-1">Applied when multiple cables are installed together, causing mutual heating.</p>
                    <p className="text-sm mt-1">Depends on the number of circuits and their arrangement.</p>
                  </div>
                  
                  <div className="space-y-2 mt-2">
                    <h5 className="font-medium text-white">Thermal Insulation (Ci)</h5>
                    <p className="text-sm mt-1">Applied when cables are surrounded by thermal insulation, restricting heat dissipation.</p>
                    <p className="text-sm mt-1">Can significantly reduce current-carrying capacity.</p>
                  </div>
                  
                  <div className="bg-elec-dark/70 p-3 rounded-md mt-3 text-sm">
                    <p className="font-semibold text-elec-yellow mb-1">Application:</p>
                    <p>The tabulated current-carrying capacity must be multiplied by all applicable correction factors:</p>
                    <p className="font-medium mt-1 text-center">Iz = It × Ca × Cg × Ci × ...</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Voltage Drop Considerations</h4>
                
                <div className="space-y-3">
                  <p className="text-sm">BS 7671 specifies maximum voltage drop limits from the supply point to the load:</p>
                  
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><span className="font-medium">Lighting circuits:</span> 3% (6.9V in a 230V system)</li>
                    <li><span className="font-medium">Other uses:</span> 5% (11.5V in a 230V system)</li>
                  </ul>
                  
                  <div className="mt-3">
                    <h5 className="font-medium text-white">Calculation Method</h5>
                    <p className="text-sm mt-1">Voltage drop (V) = Design current (A) × mV/A/m value × length (m) ÷ 1000</p>
                    <p className="text-sm mt-1">The mV/A/m values are found in BS 7671 Appendix 4, Tables 4D1 to 4D6.</p>
                  </div>
                  
                  <div className="bg-elec-dark/70 p-3 rounded-md mt-3 text-sm">
                    <p className="font-semibold text-elec-yellow mb-1">Example:</p>
                    <p>For a 20m 2.5mm² cable carrying 20A with an mV/A/m value of 18:</p>
                    <p className="mt-1">Voltage drop = 20A × 18mV/A/m × 20m ÷ 1000 = 7.2V</p>
                    <p className="mt-1">This is acceptable for power (7.2V &lt; 11.5V) but not for lighting (7.2V &gt; 6.9V).</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Overload and Short-Circuit Protection</h4>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-white">Overload Protection</h5>
                    <p className="text-sm mt-1">The protective device rating (In) must satisfy:</p>
                    <p className="text-sm font-medium mt-1 text-center">Ib ≤ In ≤ Iz</p>
                  </div>
                  
                  <div className="mt-3">
                    <h5 className="font-medium text-white">Short-Circuit Protection</h5>
                    <p className="text-sm mt-1">The protective device must interrupt the fault current before the cable reaches its maximum short-circuit temperature.</p>
                    <p className="text-sm mt-1">The breaking capacity of the device must exceed the prospective short-circuit current at its point of installation.</p>
                  </div>
                  
                  <div className="bg-elec-dark/70 p-3 rounded-md mt-3 text-sm">
                    <p className="font-semibold text-elec-yellow mb-1">Disconnection Time:</p>
                    <p>For fault protection, disconnection times specified in BS 7671 must be met:</p>
                    <ul className="list-disc pl-5 space-y-0.5 mt-1">
                      <li>TN systems: 0.4 seconds for circuits up to 32A</li>
                      <li>TT systems: 0.2 seconds when using an RCD</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-elec-yellow/20">
              <h4 className="font-semibold text-white mb-3">Cable Selection Process</h4>
              
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <span className="font-medium">Calculate Design Current</span>
                  <p className="mt-1">Determine the maximum load current, accounting for diversity factors if applicable.</p>
                </li>
                <li>
                  <span className="font-medium">Select Protective Device</span>
                  <p className="mt-1">Choose a device rating (In) greater than or equal to the design current (Ib).</p>
                </li>
                <li>
                  <span className="font-medium">Determine Minimum Cable Size</span>
                  <p className="mt-1">Find a cable size with a current-carrying capacity (Iz) greater than the protective device rating (In).</p>
                </li>
                <li>
                  <span className="font-medium">Apply Correction Factors</span>
                  <p className="mt-1">Adjust the tabulated current-carrying capacity for ambient temperature, grouping, etc.</p>
                </li>
                <li>
                  <span className="font-medium">Check Voltage Drop</span>
                  <p className="mt-1">Verify that the voltage drop does not exceed permitted limits.</p>
                </li>
                <li>
                  <span className="font-medium">Check Fault Protection</span>
                  <p className="mt-1">Ensure the cable can withstand fault currents for the disconnection time of the protective device.</p>
                </li>
                <li>
                  <span className="font-medium">Consider Other Factors</span>
                  <p className="mt-1">Account for future expansion, cable management, cost, and environmental considerations.</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-6 border-t border-elec-yellow/20">
        <Button
          variant="study"
          className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          onClick={markAsComplete}
          disabled={isCompleted}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Subsection2_1;
