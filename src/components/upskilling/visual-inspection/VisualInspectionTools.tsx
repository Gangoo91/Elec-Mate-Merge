
import { Wrench } from 'lucide-react';

export const VisualInspectionTools = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Wrench className="h-4 w-4" />
        Tools & Equipment for Visual Inspection
      </h3>
      <p className="text-gray-300 mb-3">While visual inspection doesn't require electrical test equipment, you'll need:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#323232] rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Essential Tools</h4>
          <ul className="space-y-2">
            <li className="text-gray-300 flex items-start gap-2 text-sm">
              <span className="text-elec-yellow mt-1">•</span>
              High-quality torch or inspection light
            </li>
            <li className="text-gray-300 flex items-start gap-2 text-sm">
              <span className="text-elec-yellow mt-1">•</span>
              Digital camera for recording defects
            </li>
            <li className="text-gray-300 flex items-start gap-2 text-sm">
              <span className="text-elec-yellow mt-1">•</span>
              Inspection mirror for awkward locations
            </li>
            <li className="text-gray-300 flex items-start gap-2 text-sm">
              <span className="text-elec-yellow mt-1">•</span>
              Measuring tape or ruler
            </li>
          </ul>
        </div>
        <div className="bg-[#323232] rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Safety Equipment</h4>
          <ul className="space-y-2">
            <li className="text-gray-300 flex items-start gap-2 text-sm">
              <span className="text-elec-yellow mt-1">•</span>
              Safety glasses and protective clothing
            </li>
            <li className="text-gray-300 flex items-start gap-2 text-sm">
              <span className="text-elec-yellow mt-1">•</span>
              Insulated screwdrivers (if covers need removing)
            </li>
            <li className="text-gray-300 flex items-start gap-2 text-sm">
              <span className="text-elec-yellow mt-1">•</span>
              Non-contact voltage detector
            </li>
            <li className="text-gray-300 flex items-start gap-2 text-sm">
              <span className="text-elec-yellow mt-1">•</span>
              First aid kit and emergency contact details
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
