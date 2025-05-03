
import { ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useInactivityDetection } from "@/hooks/useInactivityDetection";

interface InactivityHandlerProps {
  isStudying: boolean;
  isVideoContent: boolean;
  onStopStudy: () => void;
  children: (isInactive: boolean) => ReactNode; // Updated typing for render prop
}

const InactivityHandler = ({ 
  isStudying, 
  isVideoContent, 
  onStopStudy, 
  children 
}: InactivityHandlerProps) => {
  const { toast } = useToast();
  
  // Set up inactivity detection - don't stop timer for video content
  const { isInactive } = useInactivityDetection({
    timeoutSeconds: 30,
    isVideoContent,
    onInactive: () => {
      if (isStudying) {
        onStopStudy();
        toast({
          title: "Study session paused",
          description: "Your study session was paused due to inactivity.",
        });
      }
    }
  });

  return <>{children(isInactive)}</>;
};

export default InactivityHandler;
