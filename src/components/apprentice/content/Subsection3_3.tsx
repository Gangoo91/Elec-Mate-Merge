
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, ShieldAlert, HardHat, Zap, Cable } from "lucide-react";

const Subsection3_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <CourseContentSection
        title="PPE for Electrical Work"
        description="Proper Personal Protective Equipment (PPE) is essential for electrical work safety. The Electricity at Work Regulations 1989 mandate appropriate PPE use, which serves as the final line of defence against electrical hazards."
        keyPoints={[
          "Understanding PPE categories and their specific applications in electrical work",
          "Selection of appropriate PPE based on risk assessment and voltage levels",
          "Legal requirements for PPE provision and maintenance",
          "Testing and inspection requirements for electrical safety PPE",
          "Limitations of PPE and integration with other safety measures"
        ]}
        icon="shield-alert"
        subsectionId={subsectionId}
      />
      
      {/* First horizontal box - Categories of PPE */}
      <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold text-elec-yellow flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Categories of Electrical Safety PPE
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-3">
            <h4 className="font-semibold">Insulating PPE</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Insulating gloves</span>
                <p className="text-sm mt-1">Must be certified to BS EN 60903 standard with appropriate class rating (Class 00-4)</p>
              </li>
              <li>
                <span className="font-medium">Insulating mats</span>
                <p className="text-sm mt-1">BS EN 61111 rated for the appropriate voltage class</p>
              </li>
              <li>
                <span className="font-medium">Insulated tools</span>
                <p className="text-sm mt-1">VDE/BS EN 60900 rated for either 1000V AC or 1500V DC</p>
              </li>
              <li>
                <span className="font-medium">Insulating blankets</span>
                <p className="text-sm mt-1">For covering exposed live parts, BS EN 61112 compliance</p>
              </li>
            </ul>
          </div>
          <div className="flex-1 space-y-3">
            <h4 className="font-semibold">Arc Flash Protection</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Arc flash rated clothing</span>
                <p className="text-sm mt-1">Rated in cal/cm², typically 8-40 cal/cm² based on risk assessment</p>
              </li>
              <li>
                <span className="font-medium">Face shields</span>
                <p className="text-sm mt-1">Arc rated to protect against thermal energy</p>
              </li>
              <li>
                <span className="font-medium">Arc flash hood/balaclava</span>
                <p className="text-sm mt-1">Protects head and neck from thermal energy</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Second horizontal box - General Safety PPE */}
      <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold text-elec-yellow flex items-center gap-2">
          <HardHat className="h-5 w-5" />
          General Safety PPE Requirements
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-3">
            <h4 className="font-semibold">Head and Eye Protection</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Safety helmets</span>
                <p className="text-sm mt-1">BS EN 397 with electrical insulation properties</p>
              </li>
              <li>
                <span className="font-medium">Safety glasses/goggles</span>
                <p className="text-sm mt-1">BS EN 166 with appropriate impact resistance</p>
              </li>
              <li>
                <span className="font-medium">Face shields</span>
                <p className="text-sm mt-1">For protection against electrical flash, flying particles</p>
              </li>
            </ul>
          </div>
          <div className="flex-1 space-y-3">
            <h4 className="font-semibold">Body and Extremity Protection</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Safety footwear</span>
                <p className="text-sm mt-1">BS EN ISO 20345 with electrical resistance properties</p>
              </li>
              <li>
                <span className="font-medium">Flame-resistant clothing</span>
                <p className="text-sm mt-1">BS EN ISO 11612 compliant for thermal hazards</p>
              </li>
              <li>
                <span className="font-medium">Hi-visibility clothing</span>
                <p className="text-sm mt-1">BS EN ISO 20471 for work near roads or in low light</p>
              </li>
              <li>
                <span className="font-medium">Hearing protection</span>
                <p className="text-sm mt-1">For noisy environments, BS EN 352 rated</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Third horizontal box - Selection and Risk Assessment + Legal Requirements */}
      <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold text-elec-yellow flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Selection and Legal Framework
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-3">
            <h4 className="font-semibold">Voltage Classification</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Low voltage: up to 1000V AC/1500V DC</li>
              <li>High voltage: above 1000V AC/1500V DC</li>
              <li>Different classes of insulating gloves required for different voltage ranges:
                <ul className="list-disc pl-5 mt-1">
                  <li>Class 00: Up to 500V AC</li>
                  <li>Class 0: Up to 1000V AC</li>
                  <li>Class 1: Up to 7500V AC</li>
                  <li>Class 2: Up to 17,000V AC</li>
                  <li>Class 3: Up to 26,500V AC</li>
                  <li>Class 4: Up to 36,000V AC</li>
                </ul>
              </li>
            </ul>
            
            <h4 className="font-semibold mt-4">Arc Flash Risk Assessment</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Arc flash energy calculation</span>
                <p className="text-sm mt-1">Calculate potential incident energy in cal/cm²</p>
              </li>
              <li>
                <span className="font-medium">Arc flash boundaries</span>
                <p className="text-sm mt-1">Define Limited, Restricted, and Prohibited approach boundaries</p>
              </li>
            </ul>
          </div>
          <div className="flex-1 space-y-3">
            <h4 className="font-semibold">Regulatory Framework</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Health and Safety at Work Act 1974</span>
                <p className="text-sm mt-1">General duty of care for employers and employees</p>
              </li>
              <li>
                <span className="font-medium">Electricity at Work Regulations 1989</span>
                <p className="text-sm mt-1">Specific requirements for electrical safety measures</p>
              </li>
              <li>
                <span className="font-medium">Personal Protective Equipment at Work Regulations 1992 (amended 2022)</span>
                <p className="text-sm mt-1">Requirements for PPE provision, maintenance and use</p>
              </li>
              <li>
                <span className="font-medium">Management of Health and Safety at Work Regulations 1999</span>
                <p className="text-sm mt-1">Risk assessment requirements</p>
              </li>
            </ul>
            
            <h4 className="font-semibold mt-4">Employer Duties</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide appropriate PPE free of charge</li>
              <li>Ensure training on proper use</li>
              <li>Maintain PPE in good condition</li>
              <li>Provide storage facilities</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Fourth horizontal box - Inspection, Maintenance and Limitations */}
      <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold text-elec-yellow flex items-center gap-2">
          <ShieldAlert className="h-5 w-5" />
          Inspection, Maintenance and Limitations
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-3">
            <h4 className="font-semibold">Testing and Inspection</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Insulating gloves</span>
                <p className="text-sm mt-1">Visual inspection before each use, air test to check for leaks, formal electrical test every 6 months</p>
              </li>
              <li>
                <span className="font-medium">Insulating mats</span>
                <p className="text-sm mt-1">Visual inspection before use, periodic electrical testing</p>
              </li>
              <li>
                <span className="font-medium">Insulated tools</span>
                <p className="text-sm mt-1">Regular inspection for cracks, cuts or damage to insulation</p>
              </li>
              <li>
                <span className="font-medium">Arc flash PPE</span>
                <p className="text-sm mt-1">Regular inspection for damage, follow manufacturer's guidance on washing/cleaning</p>
              </li>
            </ul>
            
            <h4 className="font-semibold mt-4">Documentation Requirements</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Record of PPE issued to workers</li>
              <li>Inspection and test records</li>
              <li>Training records for PPE use</li>
              <li>Risk assessment documentation</li>
            </ul>
          </div>
          <div className="flex-1 space-y-3">
            <h4 className="font-semibold">Limitations of PPE</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Last line of defence</span>
                <p className="text-sm mt-1">PPE should be used alongside, not instead of, other safety measures</p>
              </li>
              <li>
                <span className="font-medium">Voltage limits</span>
                <p className="text-sm mt-1">Each item of PPE has specific voltage limitations</p>
              </li>
              <li>
                <span className="font-medium">Environmental factors</span>
                <p className="text-sm mt-1">Moisture, contaminants, and temperature can affect performance</p>
              </li>
              <li>
                <span className="font-medium">Aging and deterioration</span>
                <p className="text-sm mt-1">PPE effectiveness decreases over time even if visually undamaged</p>
              </li>
            </ul>
            
            <div className="p-4 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg text-sm mt-4">
              <p className="font-medium mb-1 text-elec-yellow">Safety First Reminder:</p>
              <p>Always follow the hierarchy of control: elimination, substitution, engineering controls, administrative controls, and only then PPE. Never rely solely on PPE when working with electrical systems.</p>
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
