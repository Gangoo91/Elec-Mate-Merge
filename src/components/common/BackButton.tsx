
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  customUrl?: string;
  label?: string;
}

const BackButton = ({ customUrl, label = "Back" }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (customUrl) {
      navigate(customUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleBack}
      className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
};

export default BackButton;
