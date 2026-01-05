
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Delete } from 'lucide-react';

interface MobileNumberPadProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  unit: string;
}

const MobileNumberPad = ({ value, onChange, onClose, unit }: MobileNumberPadProps) => {
  const handleNumberPress = (num: string) => {
    onChange(value + num);
  };

  const handleDecimalPress = () => {
    if (!value.includes('.')) {
      onChange(value + '.');
    }
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange('');
  };

  const buttons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['.', '0', '⌫']
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Number Pad</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="bg-muted p-3 rounded-lg">
          <p className="text-lg font-mono text-center">
            {value || '0'} <span className="text-sm text-muted-foreground">{unit}</span>
          </p>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-3 gap-2">
          {buttons.flat().map((btn, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-12 text-lg font-semibold"
              onClick={() => {
                if (btn === '.') handleDecimalPress();
                else if (btn === '⌫') handleBackspace();
                else handleNumberPress(btn);
              }}
            >
              {btn === '⌫' ? <Delete className="h-5 w-5" /> : btn}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <Button variant="outline" onClick={handleClear} className="flex-1">
            Clear
          </Button>
          <Button onClick={onClose} className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-black">
            Done
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileNumberPad;
