
import { useTrainingActivityMonitor } from '@/hooks/useTrainingActivityMonitor';

/**
 * Component that monitors training activity across the application
 * This is a "virtual" component that doesn't render anything visible
 */
const TrainingActivityMonitor = () => {
  // Use the monitor hook
  useTrainingActivityMonitor();
  
  // This component doesn't render anything visible
  return null;
};

export default TrainingActivityMonitor;
