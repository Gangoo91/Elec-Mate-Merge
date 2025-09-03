import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Zap, AlertTriangle, CheckCircle, Clock, PoundSterling } from "lucide-react";
import { getSuitableDevices, getDeviceInfo, getRecommendedDeviceType, getMaxZs } from "@/lib/calculators/bs7671-data/protectiveDevices";

interface ProtectiveDeviceSelectorProps {
  designCurrent: number;
  maxCableCapacity: number;
  loadType: string;
  voltage: number;
  zsValue: number;
  selectedDevice?: string;
  selectedRating?: number;
  onDeviceChange?: (deviceType: string, rating: number) => void;
}

const ProtectiveDeviceSelector: React.FC<ProtectiveDeviceSelectorProps> = ({
  designCurrent,
  maxCableCapacity,
  loadType,
  voltage,
  zsValue,
  selectedDevice,
  selectedRating,
  onDeviceChange
}) => {
  const suitableDevices = getSuitableDevices(designCurrent, maxCableCapacity);
  const recommendedType = getRecommendedDeviceType(designCurrent, loadType, voltage);

  const getDeviceDisplayName = (deviceType: string) => {
    const deviceInfo = getDeviceInfo(deviceType);
    if (!deviceInfo) return deviceType.toUpperCase();
    
    const typeMap: Record<string, string> = {
      'mcb-b': 'MCB Type B',
      'mcb-c': 'MCB Type C', 
      'mcb-d': 'MCB Type D',
      'rcbo-b': 'RCBO Type B',
      'rcbo-c': 'RCBO Type C',
      'bs88-gg': 'BS88 Fuse',
      'mccb': 'MCCB'
    };
    
    return typeMap[deviceType] || deviceType.toUpperCase();
  };

  const getZsCompliance = (deviceType: string, rating: number) => {
    const maxZs = getMaxZs(deviceType, rating, voltage);
    if (maxZs === 0) return null; // Unknown device
    
    const isCompliant = zsValue <= maxZs;
    return {
      isCompliant,
      maxZs,
      margin: ((maxZs - zsValue) / maxZs * 100)
    };
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'moderate': return 'text-amber-400';
      case 'limited': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-amber-400';
      case 'high': return 'text-red-400';
      case 'very-high': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          Protective Device Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suitableDevices.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-amber-400" />
            <p>No suitable protective devices found for {designCurrent.toFixed(1)}A design current</p>
            <p className="text-sm mt-2">Consider reviewing circuit design or cable selection</p>
          </div>
        ) : (
          <div className="space-y-3">
            {suitableDevices.map((device, index) => {
              const deviceInfo = getDeviceInfo(device.deviceType);
              const isRecommended = device.deviceType === recommendedType;
              const zsCompliance = getZsCompliance(device.deviceType, device.recommended);
              
              return (
                <div
                  key={device.deviceType}
                  className={`p-4 rounded-lg border transition-all hover:border-elec-yellow/40 ${
                    isRecommended 
                      ? "border-elec-yellow/40 bg-elec-yellow/5 ring-1 ring-elec-yellow/20" 
                      : "border-gray-600"
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-400" />
                        <span className="font-semibold text-elec-light">
                          {getDeviceDisplayName(device.deviceType)}
                        </span>
                      </div>
                      {isRecommended && (
                        <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
                          RECOMMENDED
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {zsCompliance ? (
                        zsCompliance.isCompliant ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                        )
                      ) : null}
                    </div>
                  </div>

                  {/* Device Ratings */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {device.ratings.map((rating) => {
                        const isSelected = selectedDevice === device.deviceType && selectedRating === rating;
                        const zsCheck = getZsCompliance(device.deviceType, rating);
                        
                        return (
                          <Button
                            key={rating}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className={`h-8 px-3 ${
                              isSelected 
                                ? "bg-elec-yellow text-elec-dark" 
                                : "border-gray-600 hover:border-elec-yellow/50"
                            }`}
                            onClick={() => onDeviceChange?.(device.deviceType, rating)}
                          >
                            <span className="font-medium">{rating}A</span>
                            {zsCheck && !zsCheck.isCompliant && (
                              <AlertTriangle className="h-3 w-3 ml-1 text-red-400" />
                            )}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">
                          Max Zs ({device.recommended}A)
                        </span>
                        <span className="font-mono text-sm">
                          {zsCompliance ? `${zsCompliance.maxZs.toFixed(2)}Ω` : "TBD"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Breaking Cap.</span>
                        <span className="font-mono text-sm">{deviceInfo?.characteristics.breakingCapacity}kA</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Availability</span>
                        <div className={`flex items-center gap-1 text-sm ${getAvailabilityColor(deviceInfo?.procurement.availability || 'moderate')}`}>
                          <Clock className="h-3 w-3" />
                          <span className="font-medium">{deviceInfo?.procurement.availability?.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Cost</span>
                        <div className={`flex items-center gap-1 text-sm ${getCostColor(deviceInfo?.procurement.costRange || 'medium')}`}>
                          <PoundSterling className="h-3 w-3" />
                          <span className="font-medium">{deviceInfo?.procurement.costRange?.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Applications & Considerations */}
                  {deviceInfo && (
                    <div className="space-y-3 pt-3 border-t border-gray-700">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Applications</p>
                        <div className="flex flex-wrap gap-1">
                          {deviceInfo.characteristics.applications.slice(0, 3).map((app, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {deviceInfo.characteristics.considerations.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Key Considerations</p>
                          <ul className="space-y-1">
                            {deviceInfo.characteristics.considerations.slice(0, 2).map((consideration, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-amber-400 mt-0.5">•</span>
                                <span>{consideration}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProtectiveDeviceSelector;