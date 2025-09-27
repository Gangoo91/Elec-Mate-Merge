import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { 
  Smartphone, 
  Mic, 
  Camera, 
  MapPin,
  Calendar,
  Zap
} from "lucide-react";

interface MobileOptimizedInputProps {
  type: 'text' | 'select' | 'textarea' | 'date' | 'number';
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  enableVoiceInput?: boolean;
  enableLocationHelp?: boolean;
  enableCameraInput?: boolean;
  icon?: React.ReactNode;
  hint?: string;
}

const MobileOptimizedInput: React.FC<MobileOptimizedInputProps> = ({
  type,
  label,
  value,
  onChange,
  placeholder,
  options = [],
  enableVoiceInput = false,
  enableLocationHelp = false,
  enableCameraInput = false,
  icon,
  hint
}) => {
  const handleVoiceInput = () => {
    // Voice input implementation would go here
    console.log('Voice input activated');
  };

  const handleLocationHelp = () => {
    // Location assistance would go here
    console.log('Location help activated');
  };

  const handleCameraInput = () => {
    // Camera input for reading labels/QR codes
    console.log('Camera input activated');
  };

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <MobileSelectWrapper
            label={label}
            placeholder={placeholder}
            value={value}
            onValueChange={onChange}
            options={options}
            icon={icon}
            hint={hint}
          />
        );
      default:
        return (
          <MobileInputWrapper
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
            icon={icon}
            hint={hint}
          />
        );
    }
  };

  return (
    <div className="space-y-3">
      {renderInput()}
      
      {/* Mobile Enhancement Tools */}
      {(enableVoiceInput || enableLocationHelp || enableCameraInput) && (
        <div className="flex flex-wrap gap-2">
          {enableVoiceInput && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceInput}
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            >
              <Mic className="h-4 w-4 mr-2" />
              Voice
            </Button>
          )}
          
          {enableLocationHelp && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLocationHelp}
              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Location
            </Button>
          )}
          
          {enableCameraInput && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCameraInput}
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
            >
              <Camera className="h-4 w-4 mr-2" />
              Scan
            </Button>
          )}
        </div>
      )}

      {/* Mobile UI Indicators */}
      <div className="lg:hidden flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Smartphone className="h-3 w-3" />
          <span>Mobile optimized</span>
        </div>
        
        {value && (
          <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
            ✓ Completed
          </Badge>
        )}
      </div>
    </div>
  );
};

export default MobileOptimizedInput;