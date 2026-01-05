
import React from 'react';
import { Calculator, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ModernTableCard, DataGrid } from '@/components/ui/responsive-table';

const ContinuityTablesSection = () => (
  <div className="space-y-6">
    {/* Typical R1+R2 Values Quick Reference */}
    <ModernTableCard
      title="Typical R1+R2 Values - Quick Reference"
      icon={<CheckCircle2 />}
      variant="success"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h5 className="font-medium text-green-400 mb-2">Good Reading</h5>
            <p className="text-2xl font-bold text-foreground mb-1">&lt;0.5Ω</p>
            <p className="text-sm text-gray-300">Most domestic final circuits with reasonable cable lengths</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h5 className="font-medium text-yellow-400 mb-2">Acceptable</h5>
            <p className="text-2xl font-bold text-foreground mb-1">0.5-1.0Ω</p>
            <p className="text-sm text-gray-300">Longer cable runs - verify against maximum values for protective device</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h5 className="font-medium text-red-400 mb-2">Investigate</h5>
            <p className="text-2xl font-bold text-foreground mb-1">&gt;1.0Ω</p>
            <p className="text-sm text-gray-300">Check connections, cable size, and length. Compare against maximum permitted value</p>
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <p className="text-sm text-gray-300">
            <strong className="text-blue-400">Note:</strong> These are typical guidance values. Always compare measured R1+R2 against the maximum value permitted for your specific protective device using the tables below.
          </p>
        </div>
      </div>
    </ModernTableCard>

    <ModernTableCard
      title="Cable Resistance Values (BS 7671 Table 9A)"
      icon={<Calculator />}
      variant="info"
    >
      <div className="space-y-4">
        <h5 className="font-medium text-foreground">Copper Conductors (mΩ/m at 20°C):</h5>
        <DataGrid
          headers={['Size (mm²)', 'Resistance']}
          rows={[
            ['1.0', '18.1 mΩ/m'],
            ['1.5', '12.1 mΩ/m'],
            ['2.5', '7.41 mΩ/m'],
            ['4.0', '4.61 mΩ/m'],
            ['6.0', '3.08 mΩ/m'],
            ['10', '1.83 mΩ/m'],
            ['16', '1.15 mΩ/m'],
            ['25', '0.727 mΩ/m'],
            ['35', '0.524 mΩ/m'],
            ['50', '0.387 mΩ/m']
          ]}
        />
        
        <h5 className="font-medium text-foreground">Temperature Correction Factors:</h5>
        <DataGrid
          headers={['Temp (°C)', 'Factor']}
          rows={[
            ['20', '1.00'],
            ['30', '1.04'],
            ['40', '1.08'],
            ['50', '1.12'],
            ['60', '1.16'],
            ['70', '1.20'],
            ['80', '1.24'],
            ['90', '1.28']
          ]}
        />
        
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
          <p className="text-yellow-400 font-medium text-sm">
            <strong>Formula:</strong> R₂₀ × (230 + T₁) ÷ (230 + T₂)
          </p>
        </div>
      </div>
    </ModernTableCard>

    <ModernTableCard
      title="Maximum R1+R2 Values for Automatic Disconnection"
      icon={<TrendingUp />}
      variant="success"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-foreground mb-3">Type B MCBs (0.4s disconnection) - BS 7671 Table 41.3(a):</h5>
            <DataGrid
              headers={['Rating (A)', 'Max Zs (Ω)']}
              rows={[
                ['6', '7.28'],
                ['10', '4.37'],
                ['16', '2.73'],
                ['20', '2.19'],
                ['25', '1.75'],
                ['32', '1.37'],
                ['40', '1.09'],
                ['50', '0.87']
              ]}
            />
          </div>
          
          <div>
            <h5 className="font-medium text-foreground mb-3">Type C MCBs (0.4s disconnection) - BS 7671 Table 41.3(b):</h5>
            <DataGrid
              headers={['Rating (A)', 'Max Zs (Ω)']}
              rows={[
                ['6', '3.64'],
                ['10', '2.19'],
                ['16', '1.37'],
                ['20', '1.09'],
                ['25', '0.87'],
                ['32', '0.68'],
                ['40', '0.55'],
                ['50', '0.44']
              ]}
            />
          </div>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <h5 className="font-medium text-blue-400 mb-2">Calculation Method:</h5>
          <div className="text-sm space-y-1">
            <p><strong>Formula:</strong> Maximum R1+R2 = U₀ ÷ (Ia × √3) for TN systems</p>
            <p><strong>Where:</strong> U₀ = 230V (line to neutral voltage)</p>
            <p><strong>Ia:</strong> Current causing automatic disconnection in 0.4s</p>
            <p><strong>Example:</strong> 32A Type B MCB: Ia = 160A, so Max R1+R2 = 230 ÷ 160 = 1.44Ω</p>
          </div>
        </div>
      </div>
    </ModernTableCard>

    <ModernTableCard
      title="Ring Circuit Specific Values"
      icon={<CheckCircle2 />}
      variant="default"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-3">Ring Final Circuit Limits:</h5>
            <div className="space-y-2 text-sm">
              <p><strong>Maximum R1+R2:</strong> 1.67Ω (BS 7671 Reg 543.1.4)</p>
              <p><strong>Maximum floor area:</strong> 100m² per ring</p>
              <p><strong>Minimum cable size:</strong> 2.5mm² copper</p>
              <p><strong>Maximum protective device:</strong> 32A (Type B or C)</p>
              <p><strong>Typical cable length:</strong> 106m maximum loop</p>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-3">Expected Test Results:</h5>
            <div className="space-y-2 text-sm">
              <p><strong>2.5mm² ring (both legs):</strong></p>
              <div className="ml-2 space-y-1">
                <p>• R1 end-to-end: ~0.4Ω per 50m</p>
                <p>• R2 end-to-end: ~0.4Ω per 50m</p>
                <p>• Socket test: (R1+R2)/4 ≈ 0.2Ω</p>
              </div>
              <p><strong>1.5mm² CPC variation:</strong></p>
              <div className="ml-2 space-y-1">
                <p>• R2 end-to-end: ~0.6Ω per 50m</p>
                <p>• Socket test: (0.4+0.6)/4 = 0.25Ω</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <h5 className="font-medium text-orange-400 mb-3">Ring Circuit Test Sequence:</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h6 className="font-medium text-foreground mb-2">Step 1: Continuity</h6>
              <div className="space-y-1">
                <p>• Phase leg-to-leg test</p>
                <p>• Neutral leg-to-leg test</p>
                <p>• CPC leg-to-leg test</p>
                <p>• Values should be similar</p>
              </div>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">Step 2: Cross-connection</h6>
              <div className="space-y-1">
                <p>• Connect L1 to N2, L2 to N1</p>
                <p>• Test at each socket outlet</p>
                <p>• All readings should be equal</p>
                <p>• Typically (R1+R1)/4</p>
              </div>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">Step 3: CPC Testing</h6>
              <div className="space-y-1">
                <p>• Connect L1 to CPC2, L2 to CPC1</p>
                <p>• Test at each socket outlet</p>
                <p>• Should give (R1+R2)/4</p>
                <p>• Must be ≤1.67Ω maximum</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModernTableCard>

    <ModernTableCard
      title="Main Protective Bonding Conductor Values"
      icon={<AlertTriangle />}
      variant="warning"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-foreground mb-3">Bonding Conductor Sizing (BS 7671 Table 54.8):</h5>
            <DataGrid
              headers={['Supply Conductor (mm²)', 'Min Bonding (mm²)']}
              rows={[
                ['16 or less', '6'],
                ['25', '6'],
                ['35', '10'],
                ['50', '16'],
                ['70', '16'],
                ['95', '25'],
                ['120', '25'],
                ['150', '35']
              ]}
            />
          </div>
          
          <div>
            <h5 className="font-medium text-foreground mb-3">Expected Resistance Values:</h5>
            <DataGrid
              headers={['Installation', 'Resistance']}
              rows={[
                ['10mm² × 5m', '0.009Ω'],
                ['16mm² × 10m', '0.007Ω'],
                ['25mm² × 15m', '0.004Ω']
              ]}
            />
            <div className="mt-3 space-y-2">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2">
                <p className="text-green-400 font-medium text-sm">
                  <strong>Acceptable range:</strong> 0.001Ω to 0.05Ω typically
                </p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                <p className="text-red-400 font-medium text-sm">
                  <strong>Investigate if:</strong> &gt;0.1Ω or infinite reading
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <h5 className="font-medium text-red-400 mb-3">Bonding Conductor Test Requirements:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h6 className="font-medium text-foreground mb-2">Test Method:</h6>
              <div className="space-y-1">
                <p>• Use continuity tester with adequate current</p>
                <p>• Test between main earthing terminal and bonded service</p>
                <p>• Clean connection points for accurate reading</p>
                <p>• Account for parallel paths through structure</p>
              </div>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">Common Issues:</h6>
              <div className="space-y-1">
                <p>• Corroded connections at pipe work</p>
                <p>• Loose clamp connections</p>
                <p>• Plastic pipe sections interrupting continuity</p>
                <p>• Inadequate conductor size for installation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModernTableCard>
  </div>
);

export default ContinuityTablesSection;
