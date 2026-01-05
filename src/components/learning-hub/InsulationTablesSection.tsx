
import React from 'react';
import { Calculator, TrendingUp, AlertTriangle, CheckCircle2, Thermometer, Zap } from 'lucide-react';

const InsulationTablesSection = () => (
  <div className="space-y-6">
    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">BS 7671 Minimum Insulation Resistance Values</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-purple-400 mb-2">Circuit Nominal Voltage vs Test Voltage:</p>
            <div className="space-y-1 text-xs">
              <div className="overflow-x-auto">
                <div className="grid grid-cols-3 gap-2 font-mono min-w-[300px]">
                  <div className="font-medium text-foreground text-xs">Circuit Voltage</div>
                  <div className="font-medium text-foreground text-xs">Test Voltage</div>
                  <div className="font-medium text-foreground text-xs">Min Resistance</div>
                  <div className="text-xs">SELV (≤50V)</div><div className="text-xs">250V DC</div><div className="text-xs">0.5 MΩ</div>
                  <div className="text-xs">LV (50V-500V)</div><div className="text-xs">500V DC</div><div className="text-xs">1.0 MΩ</div>
                  <div className="text-xs">LV (500V-1000V)</div><div className="text-xs">1000V DC</div><div className="text-xs">1.0 MΩ</div>
                </div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded p-2 mt-3">
                <p className="text-red-400 font-medium text-xs">
                  <strong>Important:</strong> These are absolute minimum values. Investigation is required for readings below 2.0MΩ on new installations.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-purple-400 mb-2">Test Duration Requirements:</p>
            <div className="space-y-1 text-xs">
              <div className="overflow-x-auto">
                <div className="grid grid-cols-2 gap-2 min-w-[250px]">
                  <div className="font-medium text-foreground text-xs">Test Type</div>
                  <div className="font-medium text-foreground text-xs">Duration</div>
                  <div className="text-xs">Standard Test</div><div className="text-xs">1 minute</div>
                  <div className="text-xs">Periodic Test</div><div className="text-xs">1 minute</div>
                  <div className="text-xs">Initial Verification</div><div className="text-xs">1 minute</div>
                  <div className="text-xs">Fault Investigation</div><div className="text-xs">As required</div>
                </div>
              </div>
              <p className="text-yellow-400 mt-2">
                <strong>Note:</strong> Reading must be stable for final 15 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">Temperature Correction Factors</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-green-400 mb-2">Temperature vs Correction Factor:</p>
            <div className="space-y-1 text-xs">
              <div className="overflow-x-auto">
                <div className="grid grid-cols-2 gap-2 font-mono min-w-[200px]">
                  <div className="font-medium text-foreground text-xs">Temperature (°C)</div>
                  <div className="font-medium text-foreground text-xs">Correction Factor</div>
                  <div className="text-xs">0</div><div className="text-xs">4.438</div>
                  <div className="text-xs">5</div><div className="text-xs">2.105</div>
                  <div className="text-xs">10</div><div className="text-xs">1.403</div>
                  <div className="text-xs">15</div><div className="text-xs">1.184</div>
                  <div className="text-xs">20</div><div className="text-xs">1.000</div>
                  <div className="text-xs">25</div><div className="text-xs">0.847</div>
                  <div className="text-xs">30</div><div className="text-xs">0.718</div>
                  <div className="text-xs">35</div><div className="text-xs">0.609</div>
                  <div className="text-xs">40</div><div className="text-xs">0.516</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-green-400 mb-2">Correction Formula:</p>
            <div className="space-y-2 text-xs">
              <div className="font-mono bg-muted p-2 rounded text-xs break-all">
                R₂₀ = R_measured × 1.07^(20-T_measured)
              </div>
              <p className="text-xs"><strong>Where:</strong></p>
              <div className="space-y-1 text-xs">
                <p>• R₂₀ = Resistance corrected to 20°C</p>
                <p>• R_measured = Actual measured resistance</p>
                <p>• T_measured = Temperature during test</p>
                <p>• 1.07 = Temperature coefficient for typical insulation</p>
              </div>
              <div className="text-yellow-400 mt-2 p-2 bg-muted rounded">
                <p className="text-xs"><strong>Example:</strong> 500MΩ at 5°C = 500 × 0.475 = 238MΩ at 20°C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 className="h-4 w-4 text-blue-400" />
        <h4 className="font-medium text-blue-400">Professional Assessment Guidelines</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-blue-400 mb-2">New Installations:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Expected readings:</strong></p>
              <p>• New PVC cables: {'>'} 999MΩ</p>
              <p>• XLPE cables: {'>'} 999MΩ</p>
              <p>• Rubber cables: 100-999MΩ</p>
              <p>• MICC cables: {'>'} 999MΩ</p>
              <div className="bg-green-500/10 border border-green-500/20 rounded p-2 mt-2">
                <p className="text-green-400 font-medium">
                  <strong>Acceptable:</strong> ≥ 1.0MΩ minimum
                </p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-2 mt-1">
                <p className="text-yellow-400 font-medium">
                  <strong>Investigation:</strong> 1.0-2.0MΩ range
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-blue-400 mb-2">Existing Installations:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Acceptable ranges by age:</strong></p>
              <p>• {'<'} 10 years: ≥ 2.0MΩ expected</p>
              <p>• 10-20 years: ≥ 1.0MΩ required</p>
              <p>• 20-30 years: ≥ 1.0MΩ required</p>
              <p>• {'>'} 30 years: ≥ 1.0MΩ required</p>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-2 mt-2">
                <p className="text-yellow-400 font-medium">
                  <strong>Note:</strong> Age alone doesn't reduce minimum requirements
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-blue-400 mb-2">Investigation Thresholds:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Immediate investigation:</strong></p>
              <p>• {'<'} 1.0MΩ (any installation)</p>
              <p>• {'<'} 2.0MΩ (new installation)</p>
              <p>• Rapidly declining readings</p>
              <p>• Inconsistent phase readings</p>
              <div className="bg-red-500/10 border border-red-500/20 rounded p-2 mt-2">
                <p className="text-red-400 font-medium">
                  <strong>Reject:</strong> {'<'} 1.0MΩ on LV circuits
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        <h4 className="font-medium text-amber-400">SELV Circuit Special Considerations</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="bg-card rounded p-3">
          <p className="font-medium text-amber-400 mb-2">SELV (≤50V) Circuits Only:</p>
          <div className="space-y-2 text-xs">
            <p>• <strong>Minimum acceptable:</strong> 0.5MΩ (BS 7671 Table 61)</p>
            <p>• <strong>Test voltage:</strong> 250V DC</p>
            <p>• <strong>Typical applications:</strong> Doorbells, thermostats, low voltage lighting</p>
            <div className="bg-red-500/10 border border-red-500/20 rounded p-2 mt-2">
              <p className="text-red-400 font-medium">
                <strong>Warning:</strong> 0.5MΩ is NOT acceptable for standard LV circuits (230V/400V)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <h4 className="font-medium text-orange-400">Environmental Factors Affecting Results</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-orange-400 mb-2">Temperature Effects:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Cold weather:</strong> Increases resistance readings</p>
              <p>• <strong>Hot weather:</strong> Decreases resistance readings</p>
              <p>• <strong>Correction needed:</strong> When test temperature ≠ 20°C</p>
              <p>• <strong>Seasonal variation:</strong> Can be 10:1 ratio winter to summer</p>
              <p>• <strong>Thermal cycling:</strong> Affects cable ageing rate</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-orange-400 mb-2">Humidity & Contamination:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>High humidity:</strong> Reduces surface resistance</p>
              <p>• <strong>Condensation:</strong> Can cause very low readings</p>
              <p>• <strong>Dirt/dust:</strong> Creates conductive paths</p>
              <p>• <strong>Salt contamination:</strong> Particularly problematic</p>
              <p>• <strong>Chemical exposure:</strong> Degrades insulation materials</p>
            </div>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="font-medium text-red-400 mb-2">Test Conditions Best Practice:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Before Testing:</p>
              <p>• Allow cables to reach ambient temperature</p>
              <p>• Clean terminations and connections</p>
              <p>• Check for visible moisture or contamination</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">During Testing:</p>
              <p>• Record ambient temperature</p>
              <p>• Note humidity conditions</p>
              <p>• Apply test voltage for full duration</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">After Testing:</p>
              <p>• Apply temperature correction</p>
              <p>• Consider environmental factors</p>
              <p>• Document any unusual conditions</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Thermometer className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Insulation Material Properties</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-cyan-400 mb-2">Common Insulation Materials:</p>
            <div className="space-y-1 text-xs">
              <div className="overflow-x-auto">
                <div className="grid grid-cols-2 gap-2 min-w-[280px]">
                  <div className="font-medium text-foreground text-xs">Material</div>
                  <div className="font-medium text-foreground text-xs">Typical Resistance</div>
                  <div className="text-xs">PVC</div><div className="text-xs">{'>'} 1000 MΩ</div>
                  <div className="text-xs">XLPE</div><div className="text-xs">{'>'} 5000 MΩ</div>
                  <div className="text-xs">Rubber</div><div className="text-xs">100-1000 MΩ</div>
                  <div className="text-xs">MICC</div><div className="text-xs">{'>'} 10000 MΩ</div>
                  <div className="text-xs">Paper (oil)</div><div className="text-xs">100-5000 MΩ</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-cyan-400 mb-2">Ageing Characteristics:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>PVC:</strong> Gradual decline, moisture sensitive</p>
              <p>• <strong>XLPE:</strong> Excellent long-term stability</p>
              <p>• <strong>Rubber:</strong> Degrades faster, heat sensitive</p>
              <p>• <strong>MICC:</strong> Very stable, moisture resistant</p>
              <p>• <strong>Paper:</strong> Moisture critical, oil condition important</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-indigo-400" />
        <h4 className="font-medium text-indigo-400">Test Equipment Specifications</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-indigo-400 mb-2">Accuracy Requirements:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Voltage accuracy:</strong> ±5% of nominal</p>
              <p>• <strong>Current accuracy:</strong> ±10% of reading</p>
              <p>• <strong>Resistance accuracy:</strong> ±15% of reading</p>
              <p>• <strong>Calibration:</strong> Annual or as per manufacturer</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-indigo-400 mb-2">Test Current Limits:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>250V test:</strong> 1 mA minimum</p>
              <p>• <strong>500V test:</strong> 1 mA minimum</p>
              <p>• <strong>1000V test:</strong> 1 mA minimum</p>
              <p>• <strong>Duration:</strong> Sustain for 60 seconds</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-indigo-400 mb-2">Safety Features:</p>
            <div className="space-y-1 text-xs">
              <p>• <strong>Voltage detection:</strong> Before test application</p>
              <p>• <strong>Discharge circuit:</strong> After test completion</p>
              <p>• <strong>Overload protection:</strong> Current limiting</p>
              <p>• <strong>Visual/audible:</strong> Test in progress indication</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-violet-400" />
        <h4 className="font-medium text-violet-400">Professional Decision Framework</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-violet-400 mb-2">Reading Assessment Process:</p>
            <div className="space-y-2 text-xs">
              <div className="space-y-1">
                <p><strong>≥ 2.0MΩ:</strong> Generally acceptable, document and proceed</p>
                <p><strong>1.0-2.0MΩ:</strong> Investigate further, consider:</p>
                <div className="ml-3 space-y-0.5">
                  <p>• Installation age and history</p>
                  <p>• Environmental conditions</p>
                  <p>• Comparison with similar circuits</p>
                  <p>• Previous test results trend</p>
                </div>
                <p><strong>{'<'} 1.0MΩ:</strong> Unacceptable, requires remedial action</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-violet-400 mb-2">Documentation Requirements:</p>
            <div className="space-y-1 text-xs">
              <p>• Record actual measured values</p>
              <p>• Apply and show temperature corrections</p>
              <p>• Note environmental conditions</p>
              <p>• Document investigation findings</p>
              <p>• Justify acceptance decisions</p>
              <p>• Recommend monitoring intervals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default InsulationTablesSection;
