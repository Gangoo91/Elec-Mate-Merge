
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlugZap, Power, Pocket } from "lucide-react";

interface Subsection7_2Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection7_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection7_2Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Power Circuits</h2>
      
      <div className="space-y-4">
        <p>
          Power circuits provide electricity to socket outlets and fixed appliances in domestic and commercial installations.
          Understanding their design principles, cable sizing, and protection requirements is essential for safe installations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Pocket className="h-5 w-5 mr-2" />
              Socket Outlet Circuits
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Ring Final Circuits</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Standard rating: 30/32A protection</li>
                <li>Cable specification: 2.5mm² twin and earth minimum</li>
                <li>Maximum floor area served: 100m²</li>
                <li>Connected through ring arrangement</li>
                <li>Unlimited socket outlets permitted (practical limitations apply)</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Radial Circuits</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>20A radial: 2.5mm² cable, maximum 20m² floor area</li>
                <li>32A radial: 4.0mm² cable, maximum 50m² floor area</li>
                <li>Single run of cable from consumer unit</li>
                <li>Suitable for defined areas (garages, outbuildings)</li>
                <li>Alternative to ring circuit in specific applications</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Installation Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>RCD protection required (30mA for domestic use)</li>
                  <li>Fused connection units for fixed appliances</li>
                  <li>Spur connections (fused and unfused options)</li>
                  <li>Maximum of one unfused spur per socket position</li>
                  <li>Socket height typically 450mm above floor level</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <PlugZap className="h-5 w-5 mr-2" />
              Fixed Appliance Circuits
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Dedicated Circuits</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cooker circuits: 6.0mm² cable, 32/45A protection</li>
                <li>Shower circuits: sized according to power rating</li>
                <li>Storage heater circuits: typically 2.5mm² for single units</li>
                <li>Water heater circuits: fused according to appliance rating</li>
                <li>Single point per circuit for high-power appliances</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Circuit Selection Factors</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Power rating of the appliance</li>
                <li>Duty cycle (continuous or intermittent use)</li>
                <li>Distance from consumer unit (voltage drop considerations)</li>
                <li>Future expansion needs</li>
                <li>Environmental conditions affecting installation</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Cable Sizing Considerations:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Current-carrying capacity under installation conditions</li>
                  <li>Voltage drop limitations (maximum 3% for lighting, 5% for power)</li>
                  <li>Thermal constraints and grouping factors</li>
                  <li>Fault current protection coordination</li>
                  <li>Installation method effects on cable rating</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <Power className="h-5 w-5 mr-2" />
            Modern Power Requirements
          </h3>
          
          <div className="space-y-4">
            <p>Modern buildings have increased power requirements due to technological advances:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Contemporary Installations</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Electric vehicle charging</span>
                    <p className="text-sm mt-1">Dedicated circuits with specific protection requirements</p>
                  </li>
                  <li>
                    <span className="font-medium">Home office demands</span>
                    <p className="text-sm mt-1">Increased socket provision and data integration</p>
                  </li>
                  <li>
                    <span className="font-medium">Kitchen appliance growth</span>
                    <p className="text-sm mt-1">Multiple socket outlets and dedicated circuits</p>
                  </li>
                  <li>
                    <span className="font-medium">Renewable integration</span>
                    <p className="text-sm mt-1">Connections for solar, battery storage, heat pumps</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Circuit Protection Advances</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Arc fault detection</span>
                    <p className="text-sm mt-1">AFDD protection for fire prevention</p>
                  </li>
                  <li>
                    <span className="font-medium">Surge protection</span>
                    <p className="text-sm mt-1">SPDs for sensitive electronic equipment</p>
                  </li>
                  <li>
                    <span className="font-medium">Smart monitoring</span>
                    <p className="text-sm mt-1">Circuit-level consumption monitoring</p>
                  </li>
                  <li>
                    <span className="font-medium">Selective coordination</span>
                    <p className="text-sm mt-1">Enhanced discrimination between protective devices</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>BS 7671 requires that every socket outlet circuit serving general-purpose socket outlets not exceeding 32A shall be protected by an RCD with a rated residual operating current not exceeding 30mA. The number of socket outlets per circuit should be determined based on anticipated load and the capability of the circuit protective device.</p>
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

export default Subsection7_2;
