
import React from 'react';
import { Calculator, TrendingUp, AlertTriangle, CheckCircle2, Target, Zap, Shield, Clock, Thermometer } from 'lucide-react';
import { ModernTableCard, DataGrid } from '@/components/ui/responsive-table';

const PfcTablesSection = () => (
  <div className="space-y-6">
    <ModernTableCard
      title="MCB Minimum PFC Requirements"
      icon={<Calculator />}
      variant="warning"
    >
      <div className="space-y-4">
        <h5 className="font-medium text-foreground">Type B MCBs - Minimum PFC for Magnetic Operation:</h5>
        <DataGrid
          headers={['Rating', 'Min PFC', 'Safety Margin']}
          rows={[
            ['6A', '30A', '5 × In'],
            ['10A', '50A', '5 × In'],
            ['16A', '80A', '5 × In'],
            ['20A', '100A', '5 × In'],
            ['25A', '125A', '5 × In'],
            ['32A', '160A', '5 × In'],
            ['40A', '200A', '5 × In'],
            ['50A', '250A', '5 × In'],
            ['63A', '315A', '5 × In']
          ]}
        />
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <p className="text-blue-400 font-medium text-sm">
            <strong>Type B Characteristics:</strong> Magnetic operation at 3-5 × In. Values shown are lower limits for reliable instantaneous operation.
          </p>
        </div>
        
        <h5 className="font-medium text-foreground">Type C MCBs - Minimum PFC for Magnetic Operation:</h5>
        <DataGrid
          headers={['Rating', 'Min PFC', 'Safety Margin']}
          rows={[
            ['6A', '60A', '10 × In'],
            ['10A', '100A', '10 × In'],
            ['16A', '160A', '10 × In'],
            ['20A', '200A', '10 × In'],
            ['25A', '250A', '10 × In'],
            ['32A', '320A', '10 × In'],
            ['40A', '400A', '10 × In'],
            ['50A', '500A', '10 × In'],
            ['63A', '630A', '10 × In']
          ]}
        />
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <p className="text-blue-400 font-medium text-sm">
            <strong>Type C Characteristics:</strong> Magnetic operation at 5-10 × In. Higher PFC required due to motor starting applications.
          </p>
        </div>
      </div>
    </ModernTableCard>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-blue-400" />
        <h4 className="font-medium text-blue-400">Fuse Minimum PFC Requirements</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-4">
            <p className="font-medium text-blue-400 mb-3">BS 88 Fuses - 0.4 Second Disconnection:</p>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">Rating</div>
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">Min PFC</div>
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">Multiplier</div>
                <div>6A</div><div>43A</div><div>7.2 × In</div>
                <div>10A</div><div>72A</div><div>7.2 × In</div>
                <div>16A</div><div>115A</div><div>7.2 × In</div>
                <div>20A</div><div>144A</div><div>7.2 × In</div>
                <div>25A</div><div>180A</div><div>7.2 × In</div>
                <div>32A</div><div>230A</div><div>7.2 × In</div>
                <div>40A</div><div>288A</div><div>7.2 × In</div>
                <div>50A</div><div>360A</div><div>7.2 × In</div>
                <div>63A</div><div>454A</div><div>7.2 × In</div>
                <div>80A</div><div>576A</div><div>7.2 × In</div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded p-4">
            <p className="font-medium text-blue-400 mb-3">BS 1361 Fuses - 0.4 Second Disconnection:</p>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">Rating</div>
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">Min PFC</div>
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">Multiplier</div>
                <div>5A</div><div>23A</div><div>4.6 × In</div>
                <div>15A</div><div>69A</div><div>4.6 × In</div>
                <div>20A</div><div>92A</div><div>4.6 × In</div>
                <div>30A</div><div>138A</div><div>4.6 × In</div>
                <div>45A</div><div>207A</div><div>4.6 × In</div>
                <div>60A</div><div>276A</div><div>4.6 × In</div>
                <div>80A</div><div>368A</div><div>4.6 × In</div>
                <div>100A</div><div>460A</div><div>4.6 × In</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-blue-400 mb-3">BS 3036 Semi-Enclosed Fuses - 0.4 Second Disconnection:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">Rating</div>
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">Min PFC</div>
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">Multiplier</div>
                <div>5A</div><div>35A</div><div>7.0 × In</div>
                <div>15A</div><div>105A</div><div>7.0 × In</div>
                <div>20A</div><div>140A</div><div>7.0 × In</div>
                <div>30A</div><div>210A</div><div>7.0 × In</div>
                <div>45A</div><div>315A</div><div>7.0 × In</div>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
              <p className="text-red-400 font-medium text-xs mb-2">BS 3036 Limitations:</p>
              <div className="space-y-1 text-xs">
                <p>• Not suitable for new installations</p>
                <p>• Higher PFC requirements than other fuses</p>
                <p>• Limited breaking capacity</p>
                <p>• Ageing effects on performance</p>
                <p>• Replace with modern alternatives where possible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Target className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">RCBO and Combined Protection Requirements</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-4">
            <p className="font-medium text-green-400 mb-3">RCBO Minimum PFC Requirements:</p>
            <div className="space-y-2">
              <p className="text-xs text-gray-400 mb-2">RCBOs combine MCB and RCD functions - must meet both requirements:</p>
              <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">Rating</div>
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">Type B</div>
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">Type C</div>
                <div className="font-medium text-foreground border-b border-gray-600 pb-1">RCD Test</div>
                <div>6A</div><div>30A</div><div>60A</div><div>150A</div>
                <div>10A</div><div>50A</div><div>100A</div><div>150A</div>
                <div>16A</div><div>80A</div><div>160A</div><div>150A</div>
                <div>20A</div><div>100A</div><div>200A</div><div>150A</div>
                <div>25A</div><div>125A</div><div>250A</div><div>150A</div>
                <div>32A</div><div>160A</div><div>320A</div><div>150A</div>
                <div>40A</div><div>200A</div><div>400A</div><div>150A</div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded p-4">
            <p className="font-medium text-green-400 mb-3">RCD Operating Requirements:</p>
            <div className="space-y-3 text-xs">
              <div>
                <p className="font-medium text-foreground mb-1">30mA RCD Test Current:</p>
                <p>• Test current: 150A (5 × 30mA)</p>
                <p>• Operating time: ≤40ms at 5 × IΔn</p>
                <p>• Ensures reliable RCD operation</p>
                <p>• Independent of overcurrent protection</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">100mA RCD Test Current:</p>
                <p>• Test current: 500A (5 × 100mA)</p>
                <p>• Operating time: ≤40ms at 5 × IΔn</p>
                <p>• Fire protection applications</p>
                <p>• Higher PFC often available</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">300mA RCD Test Current:</p>
                <p>• Test current: 1500A (5 × 300mA)</p>
                <p>• Operating time: ≤40ms at 5 × IΔn</p>
                <p>• Equipment protection applications</p>
                <p>• Usually adequate PFC available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Time/Current Characteristics and PFC Relationships</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-card rounded p-4">
          <p className="font-medium text-purple-400 mb-3">MCB Operating Regions:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-2">Thermal Region (Overload):</p>
              <div className="space-y-1">
                <p>• Current range: 1.13 to 1.45 × In</p>
                <p>• Operating time: 1-60 minutes</p>
                <p>• Temperature dependent</p>
                <p>• Not suitable for fault protection</p>
                <p>• PFC irrelevant in this region</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Thermal-Magnetic Region:</p>
              <div className="space-y-1">
                <p>• Type B: 3-5 × In</p>
                <p>• Type C: 5-10 × In</p>
                <p>• Type D: 10-20 × In</p>
                <p>• Operating time: 0.1-10 seconds</p>
                <p>• Mixed thermal and magnetic operation</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Magnetic Region (Fault):</p>
              <div className="space-y-1">
                <p>• Type B: &gt;5 × In</p>
                <p>• Type C: &gt;10 × In</p>
                <p>• Type D: &gt;20 × In</p>
                <p>• Operating time: &lt;0.1 seconds</p>
                <p>• Instantaneous operation required</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-purple-400 mb-3">Fuse Time/Current Relationships:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-2">Low Current Operation:</p>
              <div className="space-y-1">
                <p>• Current: 1.6-4 × In (depending on fuse type)</p>
                <p>• Operating time: Minutes to hours</p>
                <p>• Suitable for overload protection</p>
                <p>• Not adequate for fault protection</p>
                <p>• Time depends on ambient temperature</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">High Current Operation:</p>
              <div className="space-y-1">
                <p>• Current: &gt;4-7 × In (varies by type)</p>
                <p>• Operating time: Milliseconds to seconds</p>
                <p>• Effective fault current protection</p>
                <p>• Requires adequate PFC for fast operation</p>
                <p>• Pre-arcing and arcing time considerations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-yellow-400" />
        <h4 className="font-medium text-yellow-400">PFC Assessment Guidelines</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-3 w-3 text-green-400" />
              <p className="font-medium text-green-400">Excellent Performance</p>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>PFC ≥ 10 × Minimum Required:</strong></p>
              <div className="space-y-1">
                <p>• Instantaneous magnetic operation guaranteed</p>
                <p>• Excellent discrimination margins</p>
                <p>• Future-proof against supply variations</p>
                <p>• Optimal safety performance</p>
                <p>• No further action required</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded p-2 mt-2">
                <p className="text-green-400 font-medium text-xs">Example: 32A Type B MCB with 1600A PFC (10× margin)</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-3 w-3 text-yellow-400" />
              <p className="font-medium text-yellow-400">Acceptable Performance</p>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>PFC = 2-10 × Minimum Required:</strong></p>
              <div className="space-y-1">
                <p>• Meets BS 7671 requirements</p>
                <p>• Good safety performance assured</p>
                <p>• Some discrimination margins available</p>
                <p>• Monitor for supply changes over time</p>
                <p>• Consider improvements if practical</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-2 mt-2">
                <p className="text-yellow-400 font-medium text-xs">Example: 32A Type B MCB with 320A PFC (2× margin)</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-3 w-3 text-red-400" />
              <p className="font-medium text-red-400">Marginal/Unacceptable</p>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>PFC &lt; 2 × Minimum Required:</strong></p>
              <div className="space-y-1">
                <p>• May not comply with BS 7671</p>
                <p>• Investigate and improve immediately</p>
                <p>• Consider protective device changes</p>
                <p>• Supply upgrade may be required</p>
                <p>• Document limitations and actions</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded p-2 mt-2">
                <p className="text-red-400 font-medium text-xs">Example: 32A Type B MCB with 200A PFC (1.25× margin)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Thermometer className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Temperature Correction Factors</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-card rounded p-4">
          <p className="font-medium text-cyan-400 mb-3">Cable Resistance Temperature Correction:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-2">Standard Test Conditions:</p>
              <div className="space-y-1">
                <p>• Cable tables based on 20°C conductor temperature</p>
                <p>• Actual operating temperature typically 70°C</p>
                <p>• Correction factor required for accuracy</p>
                <p>• Formula: R₂ = R₁ × (230 + t₂)/(230 + t₁)</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Correction Factors:</p>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="font-medium text-foreground">Temperature</div>
                <div className="font-medium text-foreground">Factor</div>
                <div>20°C</div><div>1.00</div>
                <div>30°C</div><div>1.04</div>
                <div>50°C</div><div>1.12</div>
                <div>70°C</div><div>1.20</div>
                <div>90°C</div><div>1.28</div>
              </div>
            </div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3 mt-3">
            <p className="text-orange-400 font-medium text-xs">
              <strong>Practical Impact:</strong> 70°C operation increases resistance by 20%, reducing PFC by ~17%. Always consider operating temperature in critical installations.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-4 w-4 text-indigo-400" />
        <h4 className="font-medium text-indigo-400">Worked PFC Calculation Examples</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-card rounded p-4">
          <p className="font-medium text-indigo-400 mb-3">Example 1: Domestic Ring Final Circuit</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-2">Installation Data:</p>
              <div className="space-y-1">
                <p>• System: TN-C-S (PME)</p>
                <p>• Ze (external impedance): 0.35Ω</p>
                <p>• Circuit: Kitchen ring final</p>
                <p>• Cable: 2.5mm² T&E, 32m total length</p>
                <p>• Protection: 32A Type B MCB</p>
                <p>• R1+R2 end-to-end: 0.92Ω (from tables)</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Calculation Steps:</p>
              <div className="space-y-1">
                <p>• Ring circuit factor = 0.25 (quarter end-to-end)</p>
                <p>• Circuit R1+R2 = 0.92 × 0.25 = 0.23Ω</p>
                <p>• Earth fault loop impedance Zs = Ze + R1+R2</p>
                <p>• Zs = 0.35 + 0.23 = 0.58Ω</p>
                <p>• PFC = 230V ÷ 0.58Ω = <strong>397A</strong></p>
                <p>• Assessment: 397A &gt; 160A minimum ✓</p>
                <p>• Safety margin: 397÷160 = <strong>2.5×</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-indigo-400 mb-3">Example 2: Commercial Lighting Circuit</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-2">Installation Data:</p>
              <div className="space-y-1">
                <p>• System: TN-S (separate neutral and earth)</p>
                <p>• Ze (external impedance): 0.8Ω</p>
                <p>• Circuit: Office lighting radial</p>
                <p>• Cable: 1.5mm² T&E, 45m length</p>
                <p>• Protection: 10A Type B MCB</p>
                <p>• R1+R2 from tables: 24.2Ω/km at 20°C</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Calculation Steps:</p>
              <div className="space-y-1">
                <p>• Circuit R1+R2 = 24.2 × 0.045km = 1.09Ω</p>
                <p>• Temperature correction (70°C): 1.09 × 1.2 = 1.31Ω</p>
                <p>• Earth fault loop impedance Zs = Ze + R1+R2</p>
                <p>• Zs = 0.8 + 1.31 = 2.11Ω</p>
                <p>• PFC = 230V ÷ 2.11Ω = <strong>109A</strong></p>
                <p>• Assessment: 109A &gt; 50A minimum ✓</p>
                <p>• Safety margin: 109÷50 = <strong>2.2×</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-indigo-400 mb-3">Example 3: TT System Outbuilding</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-2">Installation Data:</p>
              <div className="space-y-1">
                <p>• System: TT (earth electrode system)</p>
                <p>• Ze (including earth electrode): 15Ω</p>
                <p>• Circuit: Garage socket outlet</p>
                <p>• Cable: 2.5mm² SWA, 25m length</p>
                <p>• Protection: 20A Type B MCB + 30mA RCD</p>
                <p>• R1+R2 from tables: 15.2Ω/km at 20°C</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Calculation Steps:</p>
              <div className="space-y-1">
                <p>• Circuit R1+R2 = 15.2 × 0.025km = 0.38Ω</p>
                <p>• Earth fault loop impedance Zs = Ze + R1+R2</p>
                <p>• Zs = 15 + 0.38 = 15.38Ω</p>
                <p>• PFC = 230V ÷ 15.38Ω = <strong>15A</strong></p>
                <p>• Assessment: 15A &lt; 100A minimum ✗</p>
                <p>• <strong>RCD protection essential</strong></p>
                <p>• 30mA RCD provides adequate protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PfcTablesSection;
