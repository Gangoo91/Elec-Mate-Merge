
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Smartphone } from 'lucide-react';

interface PhoneRotationPromptProps {
  onContinuePortrait: () => void;
  testTypeName: string;
}

const PhoneRotationPrompt = ({ onContinuePortrait, testTypeName }: PhoneRotationPromptProps) => {
  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-16 h-16">
              <Smartphone className="w-16 h-16 text-elec-yellow" />
              <div className="absolute -top-2 -right-2 animate-spin">
                <RotateCcw className="w-6 h-6 text-elec-yellow" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Rotate Your Device</h2>
              <p className="text-sm text-muted-foreground">
                For the best testing experience with <strong>{testTypeName}</strong>, 
                please rotate your phone to landscape mode.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  🔄 <strong>Landscape mode</strong> provides:
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1 text-left">
                  <li>• Better visibility of test readings</li>
                  <li>• Easier data entry with number pad</li>
                  <li>• More space for circuit details</li>
                </ul>
              </div>
              
              <Button 
                onClick={onContinuePortrait}
                variant="outline" 
                className="w-full text-sm"
              >
                Continue in Portrait Mode
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneRotationPrompt;
