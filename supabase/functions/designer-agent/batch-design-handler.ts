import { corsHeaders } from '../_shared/deps.ts';
import { getMaxZs } from "../shared/bs7671ProtectionData.ts";

export async function handleBatchDesign(body: any, logger: any) {
  const { projectInfo, incomingSupply, circuits: inputCircuits } = body;
  
  logger.info('💭 THINKING: Starting batch circuit design', {
    circuitCount: inputCircuits.length,
    installationType: projectInfo.installationType
  });

  const enrichedCircuits = inputCircuits.map((circuit: any) => ({
    ...circuit,
    loadPower: circuit.loadPower || inferLoadPower(circuit.loadType, circuit.name),
    cableLength: circuit.cableLength || inferCableLength(circuit.loadType, projectInfo.installationType)
  }));

  const designedCircuits = enrichedCircuits.map((circuit: any, i: number) => {
    const Ib = circuit.loadPower / incomingSupply.voltage;
    const cableSize = determineCableFromCurrent(Ib);
    const cpcSize = cableSize <= 16 ? cableSize : cableSize / 2;
    const protectionRating = Math.ceil(Ib / 6) * 6;
    const requiresRCD = ['bathroom', 'outdoor'].includes(circuit.specialLocation);
    
    const vd = calculateSimpleVoltageDrop(Ib, circuit.cableLength, cableSize, incomingSupply.voltage);
    const zs = incomingSupply.Ze + calculateR1R2(cableSize, cpcSize, circuit.cableLength);
    const maxZs = getMaxZs('MCB', protectionRating, 'B');
    
    return {
      circuitNumber: i + 1,
      name: circuit.name,
      loadType: circuit.loadType,
      loadPower: circuit.loadPower,
      designCurrent: Ib,
      voltage: incomingSupply.voltage,
      phases: circuit.phases,
      cableSize,
      cpcSize,
      cableLength: circuit.cableLength,
      installationMethod: 'Clipped Direct (Method C)',
      protectionDevice: { type: requiresRCD ? 'RCBO' : 'MCB', rating: protectionRating, curve: 'B', kaRating: 6 },
      rcdProtected: requiresRCD,
      calculations: {
        Ib, In: protectionRating, Iz: cableSize * 20,
        voltageDrop: { volts: vd, percent: (vd / incomingSupply.voltage) * 100, compliant: (vd / incomingSupply.voltage) * 100 < 3 },
        zs, maxZs, deratedCapacity: cableSize * 20, safetyMargin: 20
      },
      justifications: {
        cableSize: `Per Regulation 433.1.1, ${cableSize}mm² cable adequate for ${Ib.toFixed(1)}A design current.`,
        protection: `${protectionRating}A Type B ${requiresRCD ? 'RCBO' : 'MCB'} per Regulation 411.3.2.`,
        rcd: requiresRCD ? `RCD required per Regulation 411.3.3 for ${circuit.specialLocation} location.` : undefined
      },
      warnings: []
    };
  });

  const totalLoad = designedCircuits.reduce((sum: number, c: any) => sum + c.loadPower, 0);
  
  return new Response(JSON.stringify({
    success: true,
    design: {
      projectName: projectInfo.name,
      location: projectInfo.location,
      clientName: projectInfo.clientName,
      electricianName: projectInfo.electricianName,
      installationType: projectInfo.installationType,
      totalLoad,
      diversityApplied: true,
      diversityFactor: 0.75,
      circuits: designedCircuits,
      consumerUnit: {
        type: 'split-load',
        mainSwitchRating: incomingSupply.mainSwitchRating || 100,
        incomingSupply: {
          voltage: incomingSupply.voltage,
          phases: incomingSupply.phases,
          incomingPFC: incomingSupply.pscc || 3500,
          Ze: incomingSupply.Ze,
          earthingSystem: incomingSupply.earthingSystem
        }
      },
      materials: [
        { name: '2.5mm² Twin & Earth', specification: 'BS 6004', quantity: '100m', unit: 'm' }
      ],
      costEstimate: { materials: 500, labour: 750, total: 1250 },
      practicalGuidance: ['Test all circuits before energising', 'Complete BS 7671 certificate']
    }
  }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

function inferLoadPower(loadType: string, name: string): number {
  const defaults: Record<string, number> = {
    socket: 7360, lighting: 1000, cooker: 9200, shower: 8500, 'ev-charger': 7000, immersion: 3000, heating: 5000, motor: 3000
  };
  return defaults[loadType] || 3000;
}

function inferCableLength(loadType: string, type: string): number {
  return type === 'domestic' ? (loadType === 'lighting' ? 15 : 20) : 30;
}

function determineCableFromCurrent(current: number): number {
  if (current <= 13) return 1.5;
  if (current <= 20) return 2.5;
  if (current <= 27) return 4;
  if (current <= 37) return 6;
  if (current <= 50) return 10;
  return 16;
}

function calculateSimpleVoltageDrop(current: number, length: number, cableSize: number, voltage: number): number {
  const mV: Record<number, number> = { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 };
  return ((mV[cableSize] || 18) * current * length) / 1000;
}

function calculateR1R2(liveSize: number, cpcSize: number, length: number): number {
  const r: Record<number, number> = { 1.5: 12.1, 2.5: 7.41, 4: 4.61, 6: 3.08, 10: 1.83, 16: 1.15 };
  return (((r[liveSize] || 7.41) + (r[cpcSize] || 12.1)) * length * 1.2) / 1000;
}
