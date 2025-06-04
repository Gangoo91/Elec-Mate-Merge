
import { EICRProvider } from "@/contexts/EICRContext";
import DigitalEICRForm from "@/components/inspection-testing/eicr/DigitalEICRForm";

const DigitalEICRTool = () => {
  return (
    <EICRProvider>
      <div className="space-y-6 animate-fade-in">
        <DigitalEICRForm />
      </div>
    </EICRProvider>
  );
};

export default DigitalEICRTool;
