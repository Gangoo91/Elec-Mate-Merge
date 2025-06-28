
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Zap, AlertTriangle } from "lucide-react";

const ThreePhaseInfo = () => {
  return (
    <Card className="border-blue-500/20 bg-blue-500/5">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Info className="h-4 w-4" />
          Three Phase Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-xs">
        <div>
          <h4 className="font-medium text-blue-300 mb-1 flex items-center gap-1">
            <Zap className="h-3 w-3" />
            Key Calculations
          </h4>
          <ul className="space-y-1 text-blue-200">
            <li>• Line Current: I = P / (√3 × V × PF × η)</li>
            <li>• Apparent Power: S = P / PF</li>
            <li>• Phase Voltage: Vph = Vline / √3 (Star)</li>
            <li>• Reactive Power: Q = √(S² - P²)</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-blue-300 mb-1 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            BS 7671 Requirements
          </h4>
          <ul className="space-y-1 text-blue-200">
            <li>• Current density ≤ 6 A/mm² (cables)</li>
            <li>• Phase unbalance < 5% (motors)</li>
            <li>• Power factor > 0.85 (commercial)</li>
            <li>• Voltage limits: +10% / -6%</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-blue-300 mb-1">Applications</h4>
          <ul className="space-y-1 text-blue-200">
            <li>• Industrial motor loads</li>
            <li>• Commercial distribution</li>
            <li>• Large heating systems</li>
            <li>• Power factor correction</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreePhaseInfo;
