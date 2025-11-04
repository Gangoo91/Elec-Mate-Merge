import { CircuitDesign } from '@/types/installation-design';
import { Drawer } from 'vaul';
import { X, FileText, Cable, Shield, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CircuitJustificationSheetProps {
  circuit: CircuitDesign;
  isOpen: boolean;
  onClose: () => void;
}

export const CircuitJustificationSheet = ({ circuit, isOpen, onClose }: CircuitJustificationSheetProps) => {
  if (!circuit) return null;

  const justifications = circuit.justifications;

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-40" />
        <Drawer.Content className="bg-card fixed bottom-0 left-0 right-0 max-h-[90vh] rounded-t-2xl z-50 border-t-4 border-elec-yellow flex flex-col">
          {/* Handle */}
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-elec-light/30 mt-4" />
          
          {/* Header */}
          <div className="p-6 pb-4 border-b border-elec-yellow/20 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-elec-yellow/20 rounded-lg">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-elec-light">Design Justifications</h2>
                  <p className="text-sm text-elec-light/60">Why these decisions were made</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-elec-light/10 rounded-lg transition-colors touch-manipulation"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-elec-light" />
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto flex-1 p-6 space-y-6">
            
            {/* Cable Size Justification */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cable className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-sm font-semibold text-elec-light">Cable Size Selection</h3>
              </div>
              <div className="bg-elec-dark/60 rounded-lg p-4 border border-elec-yellow/20">
                <div className="mb-3">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                    {circuit.cableSize}mm² / {circuit.cpcSize}mm² CPC
                  </Badge>
                </div>
                <p className="text-sm text-elec-light/90 leading-relaxed whitespace-pre-wrap">
                  {justifications?.cableSize && justifications.cableSize !== 'No specific justification provided.' 
                    ? justifications.cableSize 
                    : `${circuit.cableSize}mm² / ${circuit.cpcSize}mm² cable selected to safely carry ${circuit.calculations?.Ib?.toFixed(1)}A design current with adequate voltage drop performance (${circuit.calculations?.voltageDrop?.percent?.toFixed(2)}% actual vs ${circuit.calculations?.voltageDrop?.limit}% limit).`}
                </p>
              </div>
            </div>

            {/* Protection Device Justification */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-sm font-semibold text-elec-light">Protection Device Selection</h3>
              </div>
              <div className="bg-elec-dark/60 rounded-lg p-4 border border-elec-yellow/20">
                <div className="mb-3">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                    {circuit.protectionDevice.rating}A Type {circuit.protectionDevice.curve} {circuit.protectionDevice.type}
                  </Badge>
                </div>
                <p className="text-sm text-elec-light/90 leading-relaxed whitespace-pre-wrap">
                  {justifications?.protection && justifications.protection !== 'No specific justification provided.'
                    ? justifications.protection 
                    : `${circuit.protectionDevice.rating}A Type ${circuit.protectionDevice.curve} ${circuit.protectionDevice.type} provides adequate protection and discrimination for this ${circuit.loadType} circuit, with earth fault loop impedance (${circuit.calculations?.zs?.toFixed(2)}Ω) below maximum permitted (${circuit.calculations?.maxZs?.toFixed(2)}Ω).`}
                </p>
              </div>
            </div>

            {/* RCD Requirements */}
            {circuit.rcdProtected && justifications?.rcd && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <h3 className="text-sm font-semibold text-elec-light">RCD Protection</h3>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                  <div className="mb-3">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      30mA RCD Required
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-100/90 leading-relaxed whitespace-pre-wrap">
                    {justifications.rcd}
                  </p>
                </div>
              </div>
            )}

            {/* Diversity Justification */}
            {circuit.diversityFactor && circuit.diversityFactor < 1.0 && circuit.diversityJustification && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-elec-light">Diversity Applied</h3>
                </div>
                <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                  <div className="mb-3">
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      {(circuit.diversityFactor * 100).toFixed(0)}% Diversity Factor
                    </Badge>
                  </div>
                  <p className="text-sm text-amber-100/90 leading-relaxed whitespace-pre-wrap">
                    {circuit.diversityJustification}
                  </p>
                </div>
              </div>
            )}

            {/* Fault Current Analysis */}
            {circuit.faultCurrentAnalysis && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-elec-yellow" />
                  <h3 className="text-sm font-semibold text-elec-light">Fault Current Analysis</h3>
                </div>
                <div className="bg-elec-dark/60 rounded-lg p-4 border border-elec-yellow/20 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-elec-light/60 mb-1">PSCC at Circuit</p>
                      <p className="text-sm font-semibold text-elec-light">
                        {circuit.faultCurrentAnalysis.psccAtCircuit}kA
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-elec-light/60 mb-1">Device Capacity</p>
                      <p className="text-sm font-semibold text-elec-light">
                        {circuit.faultCurrentAnalysis.deviceBreakingCapacity}kA
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-elec-yellow/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-elec-light/60">Status</span>
                      {circuit.faultCurrentAnalysis.compliant ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          ✓ Compliant
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">
                          ✗ Non-Compliant
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-elec-light/70 leading-relaxed">
                      {circuit.faultCurrentAnalysis.marginOfSafety}
                    </p>
                    <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-light/70 mt-2">
                      {circuit.faultCurrentAnalysis.regulation}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Earthing Requirements */}
            {circuit.earthingRequirements && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <h3 className="text-sm font-semibold text-elec-light">Earthing Requirements</h3>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-green-100/60 mb-1">CPC Size</p>
                      <p className="text-sm font-semibold text-green-100">
                        {circuit.earthingRequirements.cpcSize}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-green-100/60 mb-1">Supp. Bonding</p>
                      <p className="text-sm font-semibold text-green-100">
                        {circuit.earthingRequirements.supplementaryBonding ? 'Required' : 'Not Required'}
                      </p>
                    </div>
                  </div>
                  {circuit.earthingRequirements.bondingConductorSize && (
                    <div>
                      <p className="text-xs text-green-100/60 mb-1">Bonding Conductor</p>
                      <p className="text-sm font-semibold text-green-100">
                        {circuit.earthingRequirements.bondingConductorSize}
                      </p>
                    </div>
                  )}
                  <div className="pt-2 border-t border-green-500/20">
                    <p className="text-xs text-green-100/90 leading-relaxed">
                      {circuit.earthingRequirements.justification}
                    </p>
                    <Badge variant="outline" className="text-xs border-green-500/30 text-green-100/70 mt-2">
                      {circuit.earthingRequirements.regulation}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Installation Guidance */}
            {circuit.installationGuidance && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Cable className="h-4 w-4 text-elec-yellow" />
                  <h3 className="text-sm font-semibold text-elec-light">Installation Guidance</h3>
                </div>
                <div className="bg-elec-dark/60 rounded-lg p-4 border border-elec-yellow/20 space-y-3">
                  <div>
                    <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 mb-2">
                      {circuit.installationGuidance.referenceMethod}
                    </Badge>
                    <p className="text-sm text-elec-light/90">
                      {circuit.installationGuidance.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-elec-yellow/10">
                    <p className="text-xs text-elec-light/60 mb-2">Clip Spacing</p>
                    <p className="text-sm text-elec-light/90">
                      {circuit.installationGuidance.clipSpacing}
                    </p>
                  </div>
                  {circuit.installationGuidance.practicalTips && circuit.installationGuidance.practicalTips.length > 0 && (
                    <div className="pt-2 border-t border-elec-yellow/10">
                      <p className="text-xs text-elec-light/60 mb-2">Practical Tips</p>
                      <ul className="space-y-1">
                        {circuit.installationGuidance.practicalTips.map((tip, idx) => (
                          <li key={idx} className="text-xs text-elec-light/80 flex items-start gap-2">
                            <span className="text-elec-yellow mt-0.5">•</span>
                            <span className="flex-1">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-light/70">
                    {circuit.installationGuidance.regulation}
                  </Badge>
                </div>
              </div>
            )}

            {/* Special Location Compliance */}
            {circuit.specialLocationCompliance?.isSpecialLocation && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-elec-light">Special Location</h3>
                </div>
                <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30 space-y-3">
                  <div className="mb-2">
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      {circuit.specialLocationCompliance.locationType}
                    </Badge>
                  </div>
                  {circuit.specialLocationCompliance.zonesApplicable && (
                    <div className="text-xs text-amber-100/80 mb-2">
                      {circuit.specialLocationCompliance.zonesApplicable}
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-amber-100/60 mb-2">Requirements</p>
                    <ul className="space-y-1">
                      {circuit.specialLocationCompliance.requirements.map((req, idx) => (
                        <li key={idx} className="text-xs text-amber-100/90 flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span className="flex-1">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-100/70 mt-2">
                    {circuit.specialLocationCompliance.regulation}
                  </Badge>
                </div>
              </div>
            )}

            {/* Warnings */}
            {circuit.warnings && circuit.warnings.length > 0 && (
              <div className="space-y-3 pb-6">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-elec-light">Design Warnings</h3>
                </div>
                <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                  <ul className="space-y-2">
                    {circuit.warnings.map((warning, idx) => (
                      <li key={idx} className="text-xs text-amber-100/90 flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">⚠</span>
                        <span className="flex-1">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
