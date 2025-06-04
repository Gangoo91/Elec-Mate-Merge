
import { EICRProvider } from "@/contexts/EICRContext";
import DigitalEICRForm from "@/components/inspection-testing/eicr/DigitalEICRForm";

const DigitalEICRTool = () => {
  return (
    <EICRProvider>
      <div className="min-h-screen bg-elec-dark">
        <DigitalEICRForm />
      </div>
    </EICRProvider>
  );
};

export default DigitalEICRTool;
