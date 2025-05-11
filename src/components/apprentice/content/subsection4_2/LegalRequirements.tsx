
import React from "react";

const LegalRequirements = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Legal Requirements for Working at Height</h3>
      
      <div className="space-y-4">
        <p>
          The Work at Height Regulations 2005 establish specific legal requirements that all electrical 
          contractors must follow when working at height. These regulations are designed to prevent falls 
          and minimize injuries in construction and maintenance activities.
        </p>
        
        <div className="bg-elec-dark/50 p-5 rounded-lg border border-elec-yellow/20">
          <h4 className="font-semibold text-elec-yellow mb-3">Key Legal Requirements</h4>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <span className="font-medium">Hierarchy of Control Measures</span>
              <p className="text-sm mt-1">
                The regulations establish a hierarchy of control measures that must be followed:
                <br />1. Avoid work at height where possible
                <br />2. Use existing safe place of work
                <br />3. Provide equipment to prevent falls
                <br />4. Mitigate distance and consequences of falls
                <br />5. Provide training and instruction
              </p>
            </li>
            <li>
              <span className="font-medium">Risk Assessment Requirements</span>
              <p className="text-sm mt-1">
                A suitable and sufficient risk assessment must be completed before any work at height. 
                This must identify hazards, evaluate risks, and determine necessary control measures.
              </p>
            </li>
            <li>
              <span className="font-medium">Competence Requirements</span>
              <p className="text-sm mt-1">
                Only competent persons with appropriate skills, knowledge, and experience should 
                organize and perform work at height. Specific training requirements apply for 
                different access equipment.
              </p>
            </li>
            <li>
              <span className="font-medium">Equipment Selection and Inspection</span>
              <p className="text-sm mt-1">
                Access equipment must be properly selected for the specific task, inspected before use, 
                and maintained according to manufacturer instructions. Formal documented inspections 
                are required at specified intervals.
              </p>
            </li>
            <li>
              <span className="font-medium">Weather Considerations</span>
              <p className="text-sm mt-1">
                Work at height should not be undertaken in adverse weather conditions that could 
                compromise safety, particularly important for electrical work where wind, rain, 
                and lightning pose additional hazards.
              </p>
            </li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Employer Responsibilities</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Ensure all work at height is properly planned and organized</li>
              <li>Conduct and document thorough risk assessments</li>
              <li>Provide appropriate equipment and ensure it's maintained</li>
              <li>Ensure workers are competent and properly trained</li>
              <li>Establish emergency and rescue procedures</li>
              <li>Consider weather conditions and potential hazards</li>
              <li>Ensure fragile surfaces are identified and addressed</li>
              <li>Provide supervision proportionate to the risk</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Employee Responsibilities</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Use equipment in accordance with training</li>
              <li>Report any safety hazards or defects</li>
              <li>Participate in equipment inspections</li>
              <li>Follow established safe working procedures</li>
              <li>Stop work if conditions become unsafe</li>
              <li>Use provided PPE correctly</li>
              <li>Avoid improper use or modification of equipment</li>
              <li>Maintain good housekeeping at height</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalRequirements;
