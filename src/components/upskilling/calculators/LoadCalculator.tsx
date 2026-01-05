import { useState } from 'react';
import { Calculator, Plus, Minus, RotateCcw, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChargerLoad {
  id: number;
  power: number;
  quantity: number;
}

export const LoadCalculator = () => {
  const [chargerLoads, setChargerLoads] = useState<ChargerLoad[]>([
    { id: 1, power: 7, quantity: 1 }
  ]);
  const [diversityFactor, setDiversityFactor] = useState<number>(100);
  const [safetyFactor, setSafetyFactor] = useState<number>(15);
  const [existingLoad, setExistingLoad] = useState<number>(0);

  const addChargerLoad = () => {
    const newId = Math.max(...chargerLoads.map(c => c.id), 0) + 1;
    setChargerLoads([...chargerLoads, { id: newId, power: 7, quantity: 1 }]);
  };

  const removeChargerLoad = (id: number) => {
    if (chargerLoads.length > 1) {
      setChargerLoads(chargerLoads.filter(c => c.id !== id));
    }
  };

  const updateChargerLoad = (id: number, field: 'power' | 'quantity', value: number) => {
    setChargerLoads(chargerLoads.map(c => 
      c.id === id ? { ...c, [field]: Math.max(0, value) } : c
    ));
  };

  const resetCalculator = () => {
    setChargerLoads([{ id: 1, power: 7, quantity: 1 }]);
    setDiversityFactor(100);
    setSafetyFactor(15);
    setExistingLoad(0);
  };

  // Calculate connected load
  const connectedLoad = chargerLoads.reduce((total, charger) => 
    total + (charger.power * charger.quantity), 0
  );

  // Calculate maximum demand
  const diversityDecimal = diversityFactor / 100;
  const safetyDecimal = (100 + safetyFactor) / 100;
  const chargingDemand = connectedLoad * diversityDecimal;
  const totalMaxDemand = (existingLoad + chargingDemand) * safetyDecimal;

  // Get intelligent feedback
  const getIntelligentFeedback = () => {
    const feedback = [];
    const totalChargers = chargerLoads.reduce((total, charger) => total + charger.quantity, 0);

    // Check for excessive individual charger power
    const highPowerChargers = chargerLoads.filter(charger => charger.power > 22);
    if (highPowerChargers.length > 0) {
      feedback.push({
        type: 'warning',
        title: 'High Power Chargers Detected',
        message: `Chargers above 22kW require special considerations under BS 7671. Consider if rapid charging is necessary and ensure adequate supply capacity.`,
        regulation: 'BS 7671 Section 722'
      });
    }

    // Check diversity factor appropriateness
    if (totalChargers >= 2 && diversityFactor > 90) {
      feedback.push({
        type: 'info',
        title: 'Consider Higher Diversity',
        message: `With ${totalChargers} chargers, you could typically apply 80-85% diversity factor. Current ${diversityFactor}% may be overly conservative.`,
        regulation: 'IET Code of Practice'
      });
    }

    if (totalChargers >= 5 && diversityFactor > 80) {
      feedback.push({
        type: 'info',
        title: 'Diversity Factor Optimisation',
        message: `For ${totalChargers} chargers, consider 70-75% diversity with proper load management systems.`,
        regulation: 'Industry Best Practice'
      });
    }

    // Check supply capacity concerns
    if (totalMaxDemand > 100) {
      feedback.push({
        type: 'warning',
        title: 'High Total Demand',
        message: `${totalMaxDemand.toFixed(1)}kW exceeds typical domestic supply (60-100A). DNO consultation likely required.`,
        regulation: 'G99 Connection Requirements'
      });
    }

    // Check for potential cable rating issues
    const currentDemand = totalMaxDemand / 0.23; // Assuming 230V
    if (currentDemand > 200) {
      feedback.push({
        type: 'warning',
        title: 'High Current Demand',
        message: `${currentDemand.toFixed(0)}A demand requires substantial cable infrastructure. Consider load management or phased installation.`,
        regulation: 'BS 7671 Chapter 52'
      });
    }

    // Safety factor validation
    if (safetyFactor < 10) {
      feedback.push({
        type: 'warning',
        title: 'Low Safety Factor',
        message: 'Safety factor below 10% may not provide adequate margin for future growth and operational variations.',
        regulation: 'BS 7671 Best Practice'
      });
    }

    if (safetyFactor > 25) {
      feedback.push({
        type: 'info',
        title: 'High Safety Factor',
        message: 'Safety factor above 25% may result in oversized installation. Consider if this level is necessary.',
        regulation: 'Cost Optimisation'
      });
    }

    // Check for single high-power domestic installation
    if (totalChargers === 1 && chargerLoads[0]?.power > 11 && existingLoad < 20) {
      feedback.push({
        type: 'info',
        title: 'Single High-Power Domestic Charger',
        message: 'Consider if 7-11kW would meet requirements. Higher power increases infrastructure costs.',
        regulation: 'Domestic Installation Guidance'
      });
    }

    return feedback;
  };

  const feedback = getIntelligentFeedback();
  const currentAt230V = totalMaxDemand / 0.23;
  const currentAt400V = totalMaxDemand / (0.4 * Math.sqrt(3));

  const getDiversityRecommendation = (totalChargers: number) => {
    if (totalChargers === 1) return 100;
    if (totalChargers <= 5) return 85;
    if (totalChargers <= 10) return 75;
    if (totalChargers <= 20) return 70;
    return 65;
  };

  const recommendedDiversity = getDiversityRecommendation(chargerLoads.reduce((sum, c) => sum + c.quantity, 0));

  return (
    <Card className="bg-elec-gray border-elec-yellow/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Calculator className="h-6 w-6 text-elec-yellow" />
          EV Charging Load Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Charger Loads Input */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">EV Charger Loads</h3>
          {chargerLoads.map((charger) => (
            <div key={charger.id} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Power Rating (kW)
                </label>
                <Input
                  type="number"
                  value={charger.power === 0 ? '' : charger.power}
                  onChange={(e) => updateChargerLoad(charger.id, 'power', e.target.value === '' ? 0 : parseFloat(e.target.value))}
                  className="bg-elec-dark border-gray-600 text-foreground"
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Quantity
                </label>
                <Input
                  type="number"
                  value={charger.quantity}
                  onChange={(e) => updateChargerLoad(charger.id, 'quantity', parseInt(e.target.value) || 0)}
                  className="bg-elec-dark border-gray-600 text-foreground"
                  min="1"
                />
              </div>
              <div className="flex items-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeChargerLoad(charger.id)}
                  disabled={chargerLoads.length === 1}
                  className="w-full sm:w-auto"
                >
                  <Minus className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={addChargerLoad}
              className="bg-elec-dark border-elec-yellow text-foreground hover:bg-elec-yellow hover:text-elec-dark"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Charger Type
            </Button>
            <Button
              variant="ghost"
              onClick={resetCalculator}
              className="text-gray-400 hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Existing Load */}
        <div className="space-y-2">
          <label className="block text-lg font-semibold text-foreground">
            Existing Electrical Load (kW)
          </label>
          <Input
            type="number"
            value={existingLoad === 0 ? '' : existingLoad}
            onChange={(e) => setExistingLoad(e.target.value === '' ? 0 : parseFloat(e.target.value))}
            className="bg-elec-dark border-gray-600 text-foreground"
            min="0"
            step="0.1"
            placeholder="Enter existing load (e.g., domestic, commercial)"
          />
        </div>

        {/* Diversity Factor */}
        <div className="space-y-2">
          <label className="block text-lg font-semibold text-foreground">
            Diversity Factor (%)
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={diversityFactor === 0 ? '' : diversityFactor}
              onChange={(e) => setDiversityFactor(e.target.value === '' ? 0 : parseFloat(e.target.value))}
              className="bg-elec-dark border-gray-600 text-foreground"
              min="0"
              max="100"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDiversityFactor(recommendedDiversity)}
              className="bg-elec-dark border-elec-yellow text-foreground hover:bg-elec-yellow hover:text-elec-dark whitespace-nowrap"
            >
              Use Recommended ({recommendedDiversity}%)
            </Button>
          </div>
        </div>

        {/* Safety Factor */}
        <div className="space-y-2">
          <label className="block text-lg font-semibold text-foreground">
            Safety Factor (%)
          </label>
          <Input
            type="number"
            value={safetyFactor}
            onChange={(e) => setSafetyFactor(parseFloat(e.target.value) || 0)}
            className="bg-elec-dark border-gray-600 text-foreground"
            min="0"
            max="50"
          />
        </div>

        {/* Intelligent Feedback */}
        {feedback.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-400" />
              Regulatory Guidance & Recommendations
            </h3>
            {feedback.map((item, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  item.type === 'warning' 
                    ? 'bg-amber-900/20 border-amber-500/30' 
                    : 'bg-blue-900/20 border-blue-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  {item.type === 'warning' ? (
                    <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="space-y-1">
                    <h4 className={`font-semibold ${
                      item.type === 'warning' ? 'text-amber-400' : 'text-blue-400'
                    }`}>
                      {item.title}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {item.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      Reference: {item.regulation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calculation Results */}
        <div className="space-y-4 p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
          <h3 className="text-lg font-semibold text-elec-yellow">Calculation Results</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-medium">Connected Load:</span>
                <span className="text-foreground ml-2">{connectedLoad.toFixed(1)} kW</span>
              </p>
              <p className="text-gray-300">
                <span className="font-medium">After Diversity:</span>
                <span className="text-foreground ml-2">{chargingDemand.toFixed(1)} kW</span>
              </p>
              <p className="text-gray-300">
                <span className="font-medium">With Existing Load:</span>
                <span className="text-foreground ml-2">{(chargingDemand + existingLoad).toFixed(1)} kW</span>
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-elec-yellow font-semibold text-lg">
                Maximum Demand: {totalMaxDemand.toFixed(1)} kW
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Current @ 230V:</span>
                <span className="text-foreground ml-2">{currentAt230V.toFixed(0)} A</span>
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Current @ 400V 3ph:</span>
                <span className="text-foreground ml-2">{currentAt400V.toFixed(0)} A</span>
              </p>
            </div>
          </div>

          {/* Supply Assessment */}
          <div className="mt-4 p-3 rounded border border-amber-500/30 bg-amber-900/20">
            <h4 className="font-semibold text-amber-400 mb-2">Supply Assessment Guide</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>• Typical domestic supply: 60-100A (13.8-23kW @ 230V)</p>
              <p>• Small commercial: 100-200A (23-46kW @ 230V)</p>
              <p>• Your calculated demand: <span className="text-amber-400 font-semibold">{currentAt230V.toFixed(0)}A @ 230V</span></p>
              {currentAt230V > 100 && (
                <p className="text-red-400 font-semibold">⚠️ May require supply upgrade - consult DNO</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
