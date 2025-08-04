import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { Receipt, Info } from "lucide-react";

interface VATCalculatorProps {
  quoteAmount: number;
  vatRate: number;
  onVATRateChange: (rate: number) => void;
  vatRegistered: boolean;
  onVATRegistrationChange: (registered: boolean) => void;
}

export function VATCalculator({ 
  quoteAmount, 
  vatRate, 
  onVATRateChange, 
  vatRegistered, 
  onVATRegistrationChange 
}: VATCalculatorProps) {
  const vatRateOptions = [
    { value: "0", label: "0% - Not VAT registered" },
    { value: "20", label: "20% - Standard VAT rate" },
    { value: "5", label: "5% - Reduced rate (qualifying work)" },
    { value: "0-zero", label: "0% - Zero rated supplies" }
  ];

  const vatRegistrationOptions = [
    { value: "false", label: "Not VAT registered" },
    { value: "true", label: "VAT registered business" }
  ];

  const vatAmount = vatRegistered ? (quoteAmount * vatRate) / 100 : 0;
  const totalWithVAT = quoteAmount + vatAmount;

  const handleVATRegistrationChange = (value: string) => {
    const isRegistered = value === "true";
    onVATRegistrationChange(isRegistered);
    if (!isRegistered) {
      onVATRateChange(0);
    }
  };

  const handleVATRateChange = (value: string) => {
    if (value === "0-zero") {
      onVATRateChange(0);
    } else {
      onVATRateChange(parseFloat(value));
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-card">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Receipt className="h-5 w-5 text-elec-yellow" />
          VAT Calculation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MobileSelectWrapper
          label="VAT Registration Status"
          placeholder="Select VAT status"
          value={vatRegistered.toString()}
          onValueChange={handleVATRegistrationChange}
          options={vatRegistrationOptions}
          hint="Businesses with turnover over £85,000 must register for VAT"
        />

        {vatRegistered && (
          <MobileSelectWrapper
            label="VAT Rate"
            placeholder="Select VAT rate"
            value={vatRate.toString()}
            onValueChange={handleVATRateChange}
            options={vatRateOptions}
            hint="Most electrical work is subject to standard 20% VAT"
          />
        )}

        {quoteAmount > 0 && (
          <div className="bg-elec-dark/50 rounded-lg p-4 space-y-3">
            <h4 className="text-white font-medium flex items-center gap-2">
              VAT Breakdown
              {vatRate === 5 && (
                <Badge variant="secondary" className="text-xs">Reduced Rate</Badge>
              )}
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-elec-light">
                <span>Net Amount:</span>
                <span>£{quoteAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-elec-light">
                <span>VAT ({vatRate}%):</span>
                <span>£{vatAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-elec-yellow/20 pt-2 flex justify-between text-white font-semibold">
                <span>Total including VAT:</span>
                <span className="text-elec-yellow">£{totalWithVAT.toFixed(2)}</span>
              </div>
            </div>

            {vatRate === 5 && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-3">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-blue-300 font-medium text-sm">Reduced VAT Rate</h5>
                    <p className="text-blue-200/80 text-xs mt-1">
                      5% VAT applies to qualifying energy-saving work, including certain heating and insulation installations. 
                      Verify eligibility before applying reduced rate.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}