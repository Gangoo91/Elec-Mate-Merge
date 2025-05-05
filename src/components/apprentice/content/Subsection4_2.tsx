
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Construction, PenTool, ShieldAlert } from "lucide-react";

interface Subsection4_2Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection4_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection4_2Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Scaffolding and Platforms</h2>
      
      <div className="space-y-4">
        <p>
          When electrical work requires extended time at height or heavy equipment, scaffolding and 
          work platforms provide a safer alternative to ladders. Understanding the different types and 
          safety requirements is essential.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Construction className="h-5 w-5 mr-2" />
              Types of Scaffolding
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Fixed Scaffolding</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Tube and fitting - versatile but labor-intensive</li>
                <li>System scaffolding - modular for faster assembly</li>
                <li>Frame and brace - simple for lower heights</li>
                <li>Only to be erected by competent persons</li>
                <li>Must be inspected before use and weekly thereafter</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Mobile Scaffolding</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Mobile access towers - lightweight aluminum construction</li>
                <li>Height adjustable for various tasks</li>
                <li>Must have brakes on all wheels</li>
                <li>Never move with people or materials on tower</li>
                <li>Requires level, firm ground for stability</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <PenTool className="h-5 w-5 mr-2" />
              Mobile Elevated Work Platforms
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Types of MEWPs</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Scissor lifts - vertical elevation on stable base</li>
                <li>Boom lifts - greater reach and flexibility</li>
                <li>Cherry pickers - for access over obstacles</li>
                <li>Vehicle-mounted - for road and street works</li>
                <li>Push-around vertical platforms - for indoor work</li>
              </ul>
              
              <h4 className="font-semibold mt-4">MEWP Safety</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Operator must be trained and competent</li>
                <li>Pre-use checks essential</li>
                <li>Ground conditions must be suitable</li>
                <li>Harness and lanyard required on boom-type MEWPs</li>
                <li>Awareness of overhead hazards especially power lines</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Electrical Hazards:</h4>
                <p className="text-sm">Always maintain safe distances from overhead power lines when using MEWPs. For lines up to 33kV, maintain at least 3m clearance, and seek specialist advice for work near higher voltage lines.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2" />
            Safety Requirements
          </h3>
          
          <div className="space-y-4">
            <p>All scaffolding and platforms must meet these essential safety requirements:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Construction and Stability</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Guard rails and toe boards</span>
                    <p className="text-sm mt-1">Required on all open sides where someone could fall 2m or more</p>
                  </li>
                  <li>
                    <span className="font-medium">Stable base</span>
                    <p className="text-sm mt-1">Base plates, sole boards on soft ground, adequate ties to structure</p>
                  </li>
                  <li>
                    <span className="font-medium">Safe access</span>
                    <p className="text-sm mt-1">Proper ladders or stairways to access working platforms</p>
                  </li>
                  <li>
                    <span className="font-medium">Sufficient width</span>
                    <p className="text-sm mt-1">Working platforms minimum 600mm wide</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Inspection and Management</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Competent person</span>
                    <p className="text-sm mt-1">Erection, alteration and dismantling only by trained persons</p>
                  </li>
                  <li>
                    <span className="font-medium">Regular inspection</span>
                    <p className="text-sm mt-1">Before first use, every 7 days, and after any event that may affect stability</p>
                  </li>
                  <li>
                    <span className="font-medium">Tagging system</span>
                    <p className="text-sm mt-1">Clear indication of inspection status (green tag for safe to use)</p>
                  </li>
                  <li>
                    <span className="font-medium">Documentation</span>
                    <p className="text-sm mt-1">Inspection records must be maintained on site</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>The Work at Height Regulations 2005 require that work platforms are appropriately selected, all equipment is inspected, and all work at height is properly planned and carried out by competent people. For scaffold towers, follow the manufacturer's instructions and the PASMA guidance for safe assembly and use.</p>
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

export default Subsection4_2;
