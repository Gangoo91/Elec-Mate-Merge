
import React from 'react';
import { Calculator, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ModernTableCard, DataGrid } from '@/components/ui/responsive-table';

const InsulationTablesSection = () => (
  <div className="space-y-6">
    <ModernTableCard
      title="BS 7671 Minimum Insulation Resistance Values"
      icon={<Calculator />}
      variant="info"
    >
      <div className="space-y-4">
        <DataGrid
          headers={['Circuit Voltage', 'Test Voltage', 'Min Resistance']}
          rows={[
            ['SELV (≤50V)', '250V DC', '0.5 MΩ'],
            ['LV (50V-500V)', '500V DC', '1.0 MΩ'],
            ['LV (500V-1000V)', '1000V DC', '1.0 MΩ']
          ]}
        />
        
        <DataGrid
          headers={['Test Type', 'Duration']}
          rows={[
            ['Standard Test', '1 minute'],
            ['Periodic Test', '1 minute'],
            ['Initial Verification', '1 minute'],
            ['Fault Investigation', 'As required']
          ]}
        />
        
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
          <p className="text-yellow-400 font-medium text-sm">
            <strong>Note:</strong> Reading must be stable for final 15 seconds
          </p>
        </div>
      </div>
    </ModernTableCard>

    <ModernTableCard
      title="Temperature Correction Factors"
      icon={<TrendingUp />}
      variant="success"
    >
      <div className="space-y-4">
        <DataGrid
          headers={['Temperature (°C)', 'Correction Factor']}
          rows={[
            ['0', '4.438'],
            ['5', '2.105'],
            ['10', '1.403'],
            ['15', '1.184'],
            ['20', '1.000'],
            ['25', '0.847'],
            ['30', '0.718'],
            ['35', '0.609'],
            ['40', '0.516']
          ]}
        />
        
        <div className="bg-card border border-border rounded-lg p-4">
          <h5 className="font-medium text-foreground mb-3">Correction Formula:</h5>
          <div className="bg-muted rounded-lg p-3 text-sm space-y-2">
            <p className="font-mono text-foreground">R₂₀ = R_measured × 1.07^(20-T_measured)</p>
            <div className="text-white/80 space-y-1">
              <p><strong>Where:</strong></p>
              <p>• R₂₀ = Resistance corrected to 20°C</p>
              <p>• R_measured = Actual measured resistance</p>
              <p>• T_measured = Temperature during test</p>
              <p>• 1.07 = Temperature coefficient for typical insulation</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2 mt-3">
              <p className="text-yellow-400 font-medium text-sm">
                <strong>Example:</strong> 500MΩ at 5°C = 500 × 0.475 = 238MΩ at 20°C
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModernTableCard>

    <ModernTableCard
      title="Typical Insulation Resistance Values"
      icon={<CheckCircle2 />}
      variant="info"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h5 className="font-medium text-foreground mb-3">New Installations</h5>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-white/80">Typical readings:</p>
            <div className="space-y-1">
              <p>• New PVC cables: &gt; 999MΩ</p>
              <p>• XLPE cables: &gt; 999MΩ</p>
              <p>• Rubber cables: 100-999MΩ</p>
              <p>• MICC cables: &gt; 999MΩ</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 mt-3">
              <p className="text-green-400 font-medium text-sm">
                All should exceed 1.0MΩ minimum
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <h5 className="font-medium text-foreground mb-3">Aged Installations</h5>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-white/80">Acceptable ranges:</p>
            <div className="space-y-1">
              <p>• 10-20 years: 10-100MΩ</p>
              <p>• 20-30 years: 2-50MΩ</p>
              <p>• 30+ years: 1-10MΩ</p>
              <p>• Damp conditions: 0.5-5MΩ</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2 mt-3">
              <p className="text-yellow-400 font-medium text-sm">
                Must still meet 1.0MΩ minimum
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <h5 className="font-medium text-foreground mb-3">Problem Indicators</h5>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-white/80">Investigation required:</p>
            <div className="space-y-1">
              <p>• &lt; 1.0MΩ (new installation)</p>
              <p>• &lt; 0.5MΩ (existing installation)</p>
              <p>• Rapidly declining readings</p>
              <p>• Inconsistent phase readings</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 mt-3">
              <p className="text-red-400 font-medium text-sm">
                May indicate insulation failure
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModernTableCard>

    <ModernTableCard
      title="Environmental Factors Affecting Results"
      icon={<AlertTriangle />}
      variant="warning"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-3">Temperature Effects</h5>
            <div className="space-y-2 text-sm">
              <p>• <strong>Cold weather:</strong> Increases resistance readings</p>
              <p>• <strong>Hot weather:</strong> Decreases resistance readings</p>
              <p>• <strong>Correction needed:</strong> When test temperature ≠ 20°C</p>
              <p>• <strong>Seasonal variation:</strong> Can be 10:1 ratio winter to summer</p>
              <p>• <strong>Thermal cycling:</strong> Affects cable ageing rate</p>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-3">Humidity & Contamination</h5>
            <div className="space-y-2 text-sm">
              <p>• <strong>High humidity:</strong> Reduces surface resistance</p>
              <p>• <strong>Condensation:</strong> Can cause very low readings</p>
              <p>• <strong>Dirt/dust:</strong> Creates conductive paths</p>
              <p>• <strong>Salt contamination:</strong> Particularly problematic</p>
              <p>• <strong>Chemical exposure:</strong> Degrades insulation materials</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <h5 className="font-medium text-red-400 mb-3">Test Conditions Best Practice</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h6 className="font-medium text-foreground mb-2">Before Testing:</h6>
              <div className="space-y-1">
                <p>• Allow cables to reach ambient temperature</p>
                <p>• Clean terminations and connections</p>
                <p>• Check for visible moisture or contamination</p>
              </div>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">During Testing:</h6>
              <div className="space-y-1">
                <p>• Record ambient temperature</p>
                <p>• Note humidity conditions</p>
                <p>• Apply test voltage for full duration</p>
              </div>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">After Testing:</h6>
              <div className="space-y-1">
                <p>• Apply temperature correction</p>
                <p>• Consider environmental factors</p>
                <p>• Document any unusual conditions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModernTableCard>
  </div>
);

export default InsulationTablesSection;
