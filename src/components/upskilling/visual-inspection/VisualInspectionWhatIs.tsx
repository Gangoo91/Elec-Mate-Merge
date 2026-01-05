
import { Eye, CheckCircle } from 'lucide-react';

export const VisualInspectionWhatIs = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Eye className="h-4 w-4" />
        What Is Visual Inspection?
      </h3>
      <p className="text-gray-300 leading-relaxed">
        Visual inspection is the systematic examination of electrical installations to identify visible defects, non-compliance with regulations, and potential safety hazards. It's carried out without dismantling equipment or applying electrical power, relying purely on visual observation and professional judgement.
      </p>
      <div className="ml-4 space-y-3">
        <p className="text-gray-300 mb-2">The inspection focuses on four key areas:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
            <span className="text-gray-300"><strong className="text-foreground">Safety:</strong> Identifying immediate hazards that could cause injury or death</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
            <span className="text-gray-300"><strong className="text-foreground">Compliance:</strong> Verifying installation meets BS 7671 requirements</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
            <span className="text-gray-300"><strong className="text-foreground">Functionality:</strong> Ensuring the installation will operate as intended</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
            <span className="text-gray-300"><strong className="text-foreground">Durability:</strong> Assessing long-term performance and maintenance needs</span>
          </div>
        </div>
      </div>
    </div>
  );
};
