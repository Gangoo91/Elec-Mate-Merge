import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';

interface OfflineModeIndicatorProps {
  isOffline: boolean;
}

const OfflineModeIndicator = ({ isOffline }: OfflineModeIndicatorProps) => {
  if (!isOffline) {
    return (
      <Badge variant="outline" className="text-green-600 border-green-600/20 bg-green-600/5">
        <Wifi className="h-3 w-3 mr-1" />
        Online
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="text-orange-600 border-orange-600/20 bg-orange-600/5">
      <WifiOff className="h-3 w-3 mr-1" />
      Offline Mode
    </Badge>
  );
};

export default OfflineModeIndicator;