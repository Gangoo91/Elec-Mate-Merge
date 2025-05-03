
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function useDevelopmentMode() {
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(false);
  const { toast } = useToast();

  // Initialize development mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('elecmate-dev-mode');
    setIsDevelopmentMode(savedMode === 'true');
  }, []);

  // Toggle development mode function
  const toggleDevelopmentMode = () => {
    const newMode = !isDevelopmentMode;
    setIsDevelopmentMode(newMode);
    localStorage.setItem('elecmate-dev-mode', newMode.toString());
    toast({
      title: newMode ? "Development Mode Enabled" : "Development Mode Disabled",
      description: newMode 
        ? "Subscription restrictions have been bypassed for development." 
        : "Subscription restrictions are now active.",
    });
  };

  return {
    isDevelopmentMode,
    toggleDevelopmentMode,
  };
}
