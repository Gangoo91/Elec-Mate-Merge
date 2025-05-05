
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, FileSpreadsheet } from "lucide-react";

type Subsection1_2Props = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const Subsection1_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection1_2Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Installation Method Selection and Factors</h2>
      
      <div className="space-y-5">
        <p>
          Selecting the appropriate installation method is crucial for ensuring the safety, longevity, and compliance of an electrical installation.
          This decision is influenced by numerous factors that must be carefully considered during the planning phase.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-5 mt-6">
          <h3 className="text-xl font-bold text-elec-yellow">Key Selection Factors</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">Building Structure</h4>
              <p>The building's construction materials and methods significantly influence installation choices:</p>
              
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><span className="font-medium">Solid Masonry Walls</span> - Require chasing for concealed wiring or surface methods</li>
                <li><span className="font-medium">Cavity Walls</span> - Allow for cable routing within the cavity</li>
                <li><span className="font-medium">Timber Frame</span> - Offers flexibility with pre-first fix installation</li>
                <li><span className="font-medium">Concrete Structures</span> - Often require conduit systems cast within the concrete</li>
                <li><span className="font-medium">Listed Buildings</span> - May have restrictions requiring sympathetic methods</li>
              </ul>
            </div>
            
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">Environmental Factors</h4>
              <p>Local conditions at the installation location affect method selection:</p>
              
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><span className="font-medium">Moisture Levels</span> - Higher IP ratings required in damp or wet conditions</li>
                <li><span className="font-medium">Temperature Extremes</span> - Affect cable current-carrying capacity and material selection</li>
                <li><span className="font-medium">Corrosive Atmospheres</span> - May require special materials or additional protection</li>
                <li><span className="font-medium">External Factors</span> - UV exposure, frost, and weather considerations</li>
                <li><span className="font-medium">Fire Risk Areas</span> - May require fire-rated materials and methods</li>
              </ul>
            </div>
            
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">Accessibility Requirements</h4>
              <p>Consider future maintenance and modification needs:</p>
              
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><span className="font-medium">Maintenance Access</span> - Ease of access for future repairs or modifications</li>
                <li><span className="font-medium">Inspection Requirements</span> - Ability to inspect connections and condition</li>
                <li><span className="font-medium">Expansion Potential</span> - Allow for system growth and changes</li>
              </ul>
            </div>
            
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">Regulatory Compliance</h4>
              <p>Methods must comply with various standards and regulations:</p>
              
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><span className="font-medium">BS 7671</span> - Wiring Regulations requirements</li>
                <li><span className="font-medium">Building Regulations</span> - Part P for domestic installations</li>
                <li><span className="font-medium">Special Location Rules</span> - Bathrooms, swimming pools, agricultural buildings</li>
                <li><span className="font-medium">Fire Regulations</span> - Fire stopping and compartmentation requirements</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Common Installation Methods
          </h3>
          
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Surface Mounting Methods</h4>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-white">Trunking Systems</h5>
                    <p className="text-sm mt-1">PVC or metal trunking provides mechanical protection while allowing future access. Commonly used in commercial environments or where aesthetics is secondary to practicality.</p>
                    
                    <div className="mt-2 space-y-1 text-sm pl-4">
                      <p><span className="text-elec-yellow">Advantages:</span> Accessible, adaptable, no structural damage</p>
                      <p><span className="text-elec-yellow">Disadvantages:</span> Visual impact, dust collection, space requirements</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <h5 className="font-medium text-white">Conduit Systems</h5>
                    <p className="text-sm mt-1">Rigid or flexible conduit provides strong mechanical protection. Metal conduit can offer EMI shielding and serve as a protective conductor.</p>
                    
                    <div className="mt-2 space-y-1 text-sm pl-4">
                      <p><span className="text-elec-yellow">Advantages:</span> Robust protection, rewirable, fire resistance</p>
                      <p><span className="text-elec-yellow">Disadvantages:</span> More labour intensive, bending constraints</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <h5 className="font-medium text-white">Cable Clips and Cleats</h5>
                    <p className="text-sm mt-1">Direct fixing using appropriate clips for the cable type and environment. Simple but offers minimal protection.</p>
                    
                    <div className="mt-2 space-y-1 text-sm pl-4">
                      <p><span className="text-elec-yellow">Advantages:</span> Low cost, quick installation, minimal tools</p>
                      <p><span className="text-elec-yellow">Disadvantages:</span> Limited protection, visible cables, difficult to modify</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Concealed Methods</h4>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-white">Embedded in Structure</h5>
                    <p className="text-sm mt-1">Cables set within plaster, concrete or other building materials. Common in domestic settings where aesthetics are important.</p>
                    
                    <div className="mt-2 space-y-1 text-sm pl-4">
                      <p><span className="text-elec-yellow">Advantages:</span> Aesthetically pleasing, protection from damage</p>
                      <p><span className="text-elec-yellow">Disadvantages:</span> Difficult to modify, potential for damage during installation</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <h5 className="font-medium text-white">Cavity Routing</h5>
                    <p className="text-sm mt-1">Cables run through wall cavities, floor voids, or ceiling spaces. Requires careful planning for maintenance access.</p>
                    
                    <div className="mt-2 space-y-1 text-sm pl-4">
                      <p><span className="text-elec-yellow">Advantages:</span> Hidden installation, minimal wall damage</p>
                      <p><span className="text-elec-yellow">Disadvantages:</span> Access difficulties, potential rodent damage</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <h5 className="font-medium text-white">Under Floor Systems</h5>
                    <p className="text-sm mt-1">Includes raised access floors, floor ducting systems, and in-screed installations for power and data distribution.</p>
                    
                    <div className="mt-2 space-y-1 text-sm pl-4">
                      <p><span className="text-elec-yellow">Advantages:</span> Flexible positioning, high capacity, future adaptability</p>
                      <p><span className="text-elec-yellow">Disadvantages:</span> Higher cost, floor height implications, moisture risks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-elec-yellow/20">
              <div className="flex items-center gap-3 mb-4">
                <FileSpreadsheet className="h-5 w-5 text-elec-yellow" />
                <h4 className="font-semibold text-white">Method Selection Process</h4>
              </div>
              
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <span className="font-medium">Assessment</span>
                  <p className="mt-1">Evaluate the building structure, environment, and client requirements</p>
                </li>
                <li>
                  <span className="font-medium">Regulatory Review</span>
                  <p className="mt-1">Identify applicable regulations and standards for the specific installation</p>
                </li>
                <li>
                  <span className="font-medium">Cost-Benefit Analysis</span>
                  <p className="mt-1">Consider initial installation costs against long-term accessibility and maintenance</p>
                </li>
                <li>
                  <span className="font-medium">Risk Assessment</span>
                  <p className="mt-1">Evaluate potential risks associated with each viable method</p>
                </li>
                <li>
                  <span className="font-medium">Implementation Planning</span>
                  <p className="mt-1">Develop detailed installation plans based on the selected method</p>
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

export default Subsection1_2;
