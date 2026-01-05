
import { Camera } from 'lucide-react';

export const VisualInspectionDocumentation = () => {
  const documentationItems = [
    "Visual inspection checklist or schedule",
    "Installation drawings and circuit diagrams", 
    "Previous inspection and test certificates",
    "Manufacturer's installation instructions",
    "Design calculations and specifications",
    "Risk assessments and method statements",
    "Equipment datasheets and compliance certificates",
    "Environmental condition assessments"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Camera className="h-4 w-4" />
        Essential Documentation & Record Keeping
      </h3>
      <p className="text-gray-300 mb-3">Before starting visual inspection, ensure you have access to:</p>
      <ul className="space-y-2 ml-4">
        {documentationItems.map((item, index) => (
          <li key={index} className="text-gray-300 flex items-start gap-2">
            <span className="text-elec-yellow mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
      <div className="space-y-3 mt-4">
        <h4 className="font-semibold text-foreground">Record Keeping Best Practices:</h4>
        <ul className="space-y-2 ml-4">
          <li className="text-gray-300 flex items-start gap-2">
            <span className="text-elec-yellow mt-1">•</span>
            Photograph all defects and non-compliances for evidence
          </li>
          <li className="text-gray-300 flex items-start gap-2">
            <span className="text-elec-yellow mt-1">•</span>
            Use a structured inspection checklist or schedule
          </li>
          <li className="text-gray-300 flex items-start gap-2">
            <span className="text-elec-yellow mt-1">•</span>
            Record environmental conditions that may affect the installation
          </li>
          <li className="text-gray-300 flex items-start gap-2">
            <span className="text-elec-yellow mt-1">•</span>
            Note any limitations or restrictions on the inspection scope
          </li>
        </ul>
      </div>
      <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4 mt-4">
        <p className="text-yellow-200 font-medium">
          <strong>Documentation Rule:</strong> Without proper documentation, you cannot complete a thorough visual inspection or verify compliance with the original design intent. Poor documentation equals poor inspection.
        </p>
      </div>
    </div>
  );
};
