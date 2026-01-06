
import { SmartBackButton } from "@/components/ui/smart-back-button";
import TestEquipmentTab from "@/components/apprentice/tools-guide/TestEquipmentTab";

const TestEquipment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 animate-fade-in max-w-6xl">
        <div className="flex justify-start">
          <SmartBackButton />
        </div>

        <div className="bg-elec-gray/50 backdrop-blur border border-elec-yellow/20 rounded-lg shadow-lg">
          <TestEquipmentTab />
        </div>
      </div>
    </div>
  );
};

export default TestEquipment;
