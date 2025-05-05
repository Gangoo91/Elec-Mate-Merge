
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Cable, PlugZap, ShieldAlert } from "lucide-react";

interface Subsection3_3Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection3_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection3_3Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Installation Methods and Techniques</h2>
      
      <div className="space-y-4">
        <p>
          Proper installation techniques are crucial for the integrity and safety of wiring systems.
          Following established methods ensures compliance with regulations and the long-term reliability of the installation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Cable className="h-5 w-5 mr-2" />
              Cable Installation Methods
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Cable Routing Practices</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Run cables horizontally or vertically (not diagonally) in walls</li>
                <li>Maintain minimum bending radii (typically 8× cable diameter for fixed wiring)</li>
                <li>Use appropriate cable ties and fixings without compressing cables</li>
                <li>Avoid excessive tension during installation (max 25N/mm² for copper)</li>
                <li>Route cables away from heat sources and sharp edges</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Separation from Other Services</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Maintain minimum distances from water/gas pipes (typically 150mm)</li>
                <li>Separate power and data/telecoms cables (min 200mm unless shielded)</li>
                <li>Cross other services at right angles when necessary</li>
                <li>Use metallic barriers where required separation cannot be achieved</li>
                <li>Consider electromagnetic compatibility requirements</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Support Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Flat twin & earth cable: max 400mm horizontal, 400mm vertical</li>
                  <li>Armored cable: typically 350mm horizontal, 450mm vertical</li>
                  <li>Additional support needed near terminations</li>
                  <li>Account for cable weight and environmental factors</li>
                  <li>Use fire-rated supports in escape routes</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <PlugZap className="h-5 w-5 mr-2" />
              Termination Techniques
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Proper Connection Methods</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Remove appropriate length of outer sheath (avoid nicking inner insulation)</li>
                <li>Ensure conductors are straight and undamaged before termination</li>
                <li>Strip inner insulation to correct length (no bare conductor exposed)</li>
                <li>Terminate conductors with correct torque (typically 1.2-1.5Nm for larger terminals)</li>
                <li>Maintain correct polarity and conductor identification</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Common Connection Types</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Screw terminals: ensure conductor fully inserted, no stray strands</li>
                <li>Spring-loaded terminals: ensure proper strip length and full insertion</li>
                <li>Crimped connections: use correct crimping tool and die size</li>
                <li>Insulation displacement: follow manufacturer's instructions precisely</li>
                <li>Terminal blocks: ensure rating matches or exceeds circuit requirements</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Critical Issues:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>High-resistance connections cause overheating and fire risk</li>
                  <li>Double terminations in single terminals not generally permitted</li>
                  <li>Secure terminations essential in areas subject to vibration</li>
                  <li>Consider temperature rating of terminals for high-current applications</li>
                  <li>Maintain correct conductor color coding throughout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2" />
            Special Installation Considerations
          </h3>
          
          <div className="space-y-4">
            <p>Certain situations require additional installation considerations to maintain safety and compliance:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Fire Safety Measures</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Fire barriers and penetration seals</span>
                    <p className="text-sm mt-1">Maintain fire compartmentation with appropriate sealing systems</p>
                  </li>
                  <li>
                    <span className="font-medium">Fire-rated cables</span>
                    <p className="text-sm mt-1">Required for emergency systems and escape routes</p>
                  </li>
                  <li>
                    <span className="font-medium">Fixing methods</span>
                    <p className="text-sm mt-1">Fire-resistant fixings for critical systems</p>
                  </li>
                  <li>
                    <span className="font-medium">Escape route protection</span>
                    <p className="text-sm mt-1">Special requirements for wiring in escape routes</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Mechanical Protection</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Protection against impact damage</span>
                    <p className="text-sm mt-1">Additional protection in vulnerable areas</p>
                  </li>
                  <li>
                    <span className="font-medium">Protection from building materials</span>
                    <p className="text-sm mt-1">Avoid damage during plastering, drilling, etc.</p>
                  </li>
                  <li>
                    <span className="font-medium">Expansion provisions</span>
                    <p className="text-sm mt-1">Allow for building movement in long runs</p>
                  </li>
                  <li>
                    <span className="font-medium">Protection in transit floors/walls</span>
                    <p className="text-sm mt-1">Sleeves and bushings for cable protection</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>BS 7671 Section 522 details requirements for selection and erection of wiring systems based on external influences, including mechanical stress, presence of water or corrosive substances, and building construction. Regulation 527 specifically covers fire barriers and protection against thermal effects.</p>
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

export default Subsection3_3;
