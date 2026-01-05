
import { HardHat } from 'lucide-react';

export const VisualInspectionSafety = () => {
  const safetyConsiderations = [
    "Never remove covers or barriers during visual inspection unless absolutely necessary",
    "Use appropriate PPE including safety glasses and protective clothing",
    "Be aware of arc flash hazards when examining switchgear",
    "Don't touch any live parts or conductors",
    "Use a torch or inspection light for adequate illumination",
    "Take photographs for record keeping and evidence",
    "Stop immediately if any dangerous conditions are identified",
    "Ensure adequate ventilation when working in confined spaces"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <HardHat className="h-4 w-4" />
        Safety During Visual Inspection
      </h3>
      <p className="text-gray-300 mb-3">Even though visual inspection doesn't involve live testing, safety remains paramount:</p>
      <ul className="space-y-2 ml-4">
        {safetyConsiderations.map((item, index) => (
          <li key={index} className="text-gray-300 flex items-start gap-2">
            <span className="text-elec-yellow mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
      <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4 mt-4">
        <p className="text-orange-200 font-medium">
          <strong>Safety Alert:</strong> Remember that installations may still be energised during visual inspection. Always assume circuits are live unless proven otherwise through proper isolation procedures.
        </p>
      </div>
    </div>
  );
};
