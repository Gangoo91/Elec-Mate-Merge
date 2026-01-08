import React from 'react';
import { Receipt, Info, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";

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
  const vatAmount = vatRegistered ? (quoteAmount * vatRate) / 100 : 0;
  const totalWithVAT = quoteAmount + vatAmount;

  const handleVATRegistrationChange = (checked: boolean) => {
    onVATRegistrationChange(checked);
    if (!checked) {
      onVATRateChange(0);
    } else if (vatRate === 0) {
      onVATRateChange(20);
    }
  };

  const vatRateButtons = [
    { rate: 20, label: "20%", desc: "Standard" },
    { rate: 5, label: "5%", desc: "Reduced" },
    { rate: 0, label: "0%", desc: "Zero" }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-elec-yellow/20 rounded-xl">
          <Receipt className="h-5 w-5 text-elec-yellow" />
        </div>
        <div>
          <h3 className="text-ios-headline font-semibold text-white">VAT Calculation</h3>
          <p className="text-ios-caption-1 text-white/50">Add VAT to your quote</p>
        </div>
      </div>

      {/* VAT Registration Toggle */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-ios-body font-medium text-white">VAT Registered</p>
            <p className="text-ios-caption-1 text-white/50">Turnover &gt;£85,000</p>
          </div>
          <Switch
            checked={vatRegistered}
            onCheckedChange={handleVATRegistrationChange}
            className="data-[state=checked]:bg-elec-yellow"
          />
        </div>
      </div>

      {/* Quick VAT Rate Buttons */}
      <AnimatePresence>
        {vatRegistered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
              VAT Rate
            </p>
            <div className="grid grid-cols-3 gap-2">
              {vatRateButtons.map((btn) => (
                <button
                  key={btn.rate}
                  onClick={() => onVATRateChange(btn.rate)}
                  className={`relative p-4 rounded-2xl border transition-all duration-200 touch-manipulation active:scale-[0.98] ${
                    vatRate === btn.rate
                      ? "bg-elec-yellow/20 border-elec-yellow/50"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {vatRate === btn.rate && (
                    <motion.div
                      layoutId="vat-check"
                      className="absolute top-2 right-2"
                    >
                      <Check className="h-4 w-4 text-elec-yellow" />
                    </motion.div>
                  )}
                  <p className={`text-xl font-bold ${vatRate === btn.rate ? "text-elec-yellow" : "text-white"}`}>
                    {btn.label}
                  </p>
                  <p className="text-ios-caption-2 text-white/50 mt-1">{btn.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Display */}
      {quoteAmount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-ios-body text-white/70">Net Amount</span>
            <span className="text-ios-body font-medium text-white tabular-nums">£{quoteAmount.toFixed(2)}</span>
          </div>

          <div className="h-px bg-white/10" />

          <div className="flex justify-between items-center">
            <span className="text-ios-body text-white/70">VAT ({vatRate}%)</span>
            <span className="text-ios-body font-medium text-white tabular-nums">£{vatAmount.toFixed(2)}</span>
          </div>

          <div className="h-px bg-white/10" />

          <div className="flex justify-between items-center pt-1">
            <span className="text-ios-headline font-semibold text-white">Total</span>
            <span className="text-2xl font-bold text-elec-yellow tabular-nums">£{totalWithVAT.toFixed(2)}</span>
          </div>
        </motion.div>
      )}

      {/* Reduced Rate Info */}
      <AnimatePresence>
        {vatRate === 5 && vatRegistered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-blue-500/20 rounded-lg">
                <Info className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-ios-subhead font-medium text-blue-300">Reduced VAT Rate</p>
                <p className="text-ios-caption-1 text-blue-200/70 mt-1">
                  5% VAT applies to qualifying energy-saving work including heating and insulation. Verify eligibility.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}