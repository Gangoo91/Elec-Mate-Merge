
import React from "react";
import { ShieldAlert } from "lucide-react";

const InspectionAndLimitations = () => {
  return (
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
  );
};

export default InspectionAndLimitations;
