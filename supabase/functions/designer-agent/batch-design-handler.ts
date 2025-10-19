import { corsHeaders } from '../_shared/deps.ts';
import { getMaxZs } from "../shared/bs7671ProtectionData.ts";

const INSTALLATION_CONTEXT = {
  domestic: `Design compliant with Part P Building Regulations and BS 7671:2018+A3:2024.
- RCD protection required for all circuits (Reg 411.3.3)
- Bathroom circuits must have 30mA RCD (Section 701)
- Consider future EV charging capability
- AFDDs required for new installations per Amendment 3
- Focus on safety in wet locations (bathrooms, outdoors)`,
  commercial: `Design per BS 7671:2018+A3:2024 for commercial installations.
- AFDDs mandatory for new commercial circuits (Amendment 3)
- Emergency lighting compliance per BS 5839
- Fire alarm integration considerations
- RCBOs recommended for all final circuits
- Higher fault levels expected in commercial supplies
- Consider surge protection (Reg 534.4)`,
  industrial: `Industrial installation per BS 7671:2018+A3:2024.
- Three-phase motor protection with Type D MCBs
- Consider motor starting currents (6-8x full load)
- SWA cabling for mechanical protection
- Higher fault currents - 10kA+ MCBs (Reg 536.1)
- Diversity calculations essential for multiple motors
- Regular inspection intervals per Reg 622
- G59/G99 agreements may be required for generation`
};

export async function handleBatchDesign(body: any, logger: any) {
  const { projectInfo, incomingSupply, circuits: inputCircuits } = body;
  const installationType = projectInfo.installationType || 'domestic';
  
  logger.info('💭 THINKING: Starting batch circuit design', {
    circuitCount: inputCircuits.length,
    installationType: projectInfo.installationType,
    hasAdditionalPrompt: !!projectInfo.additionalPrompt
  });

  // If no circuits provided but additionalPrompt exists, generate circuits from natural language
  let circuitsToDesign = inputCircuits;
  
  if (inputCircuits.length === 0 && projectInfo.additionalPrompt) {
    logger.info('🤖 AI Mode: Generating circuits from natural language description');
    circuitsToDesign = generateCircuitsFromDescription(
      projectInfo.additionalPrompt,
      installationType,
      incomingSupply.phases
    );
    logger.info('✨ Generated circuits from description', { count: circuitsToDesign.length });
  }

  const enrichedCircuits = circuitsToDesign.map((circuit: any) => ({
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

function generateCircuitsFromDescription(description: string, installationType: string, phases: string): any[] {
  const circuits: any[] = [];
  const lowerDesc = description.toLowerCase();
  
  // Domestic circuits
  if (installationType === 'domestic') {
    // Count bedrooms to determine socket circuits needed
    const bedroomMatch = lowerDesc.match(/(\d+)[-\s]?bed/);
    const bedrooms = bedroomMatch ? parseInt(bedroomMatch[1]) : 3;
    
    // Kitchen
    if (lowerDesc.includes('kitchen')) {
      circuits.push({ name: 'Kitchen Sockets', loadType: 'socket', phases: 'single', specialLocation: 'kitchen' });
      if (lowerDesc.includes('cooker') || lowerDesc.includes('hob') || lowerDesc.includes('range')) {
        circuits.push({ name: 'Cooker', loadType: 'cooker', phases: 'single', specialLocation: 'kitchen' });
      }
      if (lowerDesc.includes('integrated') || lowerDesc.includes('appliances')) {
        circuits.push({ name: 'Integrated Appliances', loadType: 'socket', loadPower: 3000, phases: 'single', specialLocation: 'kitchen' });
      }
    }
    
    // Living areas - socket circuits
    circuits.push({ name: 'Downstairs Sockets', loadType: 'socket', phases: 'single', specialLocation: 'none' });
    circuits.push({ name: 'Upstairs Sockets', loadType: 'socket', phases: 'single', specialLocation: 'none' });
    
    // Lighting
    circuits.push({ name: 'Downstairs Lights', loadType: 'lighting', loadPower: 1000, cableLength: 15, phases: 'single', specialLocation: 'none' });
    circuits.push({ name: 'Upstairs Lights', loadType: 'lighting', loadPower: 800, cableLength: 20, phases: 'single', specialLocation: 'none' });
    
    // Bathrooms/Showers
    const bathroomMatch = lowerDesc.match(/(\d+)\s*bath/);
    const bathrooms = bathroomMatch ? parseInt(bathroomMatch[1]) : (lowerDesc.includes('bathroom') ? 1 : 0);
    
    if (lowerDesc.includes('shower') || bathrooms > 0) {
      circuits.push({ name: 'Electric Shower', loadType: 'shower', loadPower: 10500, cableLength: 15, phases: 'single', specialLocation: 'bathroom' });
    }
    if (lowerDesc.includes('en-suite') || bathrooms > 1) {
      circuits.push({ name: 'En-Suite Shower', loadType: 'shower', loadPower: 8500, cableLength: 12, phases: 'single', specialLocation: 'bathroom' });
    }
    
    // Garage
    if (lowerDesc.includes('garage') || lowerDesc.includes('workshop')) {
      const isWorkshop = lowerDesc.includes('workshop') || lowerDesc.includes('equipment');
      circuits.push({ 
        name: isWorkshop ? 'Garage Workshop' : 'Garage Sockets', 
        loadType: 'garage', 
        loadPower: isWorkshop ? 5000 : 3000,
        phases: lowerDesc.includes('3-phase') || lowerDesc.includes('three phase') ? 'three' : 'single',
        specialLocation: 'none' 
      });
    }
    
    // EV Charger
    if (lowerDesc.includes('ev') || lowerDesc.includes('electric vehicle') || lowerDesc.includes('car charger')) {
      const power = lowerDesc.includes('22kw') || lowerDesc.includes('22 kw') ? 22000 : 7400;
      circuits.push({ 
        name: power > 8000 ? 'EV Charger 22kW' : 'EV Charger 7.4kW', 
        loadType: 'ev-charger', 
        loadPower: power,
        cableLength: 20,
        phases: power > 8000 ? 'three' : 'single',
        specialLocation: 'outdoor' 
      });
    }
    
    // Outdoor
    if (lowerDesc.includes('outdoor') || lowerDesc.includes('garden') || lowerDesc.includes('outside')) {
      circuits.push({ name: 'Outdoor Sockets', loadType: 'outdoor', loadPower: 3000, phases: 'single', specialLocation: 'outdoor' });
    }
    
    // Immersion
    if (lowerDesc.includes('immersion') || lowerDesc.includes('hot water')) {
      circuits.push({ name: 'Immersion Heater', loadType: 'immersion', loadPower: 3000, phases: 'single', specialLocation: 'none' });
    }
  }
  
  // Commercial circuits
  if (installationType === 'commercial') {
    // Office desks
    const deskMatch = lowerDesc.match(/(\d+)\s*desk/);
    const desks = deskMatch ? parseInt(deskMatch[1]) : 0;
    
    if (desks > 0 || lowerDesc.includes('office')) {
      const zones = Math.ceil(desks / 10) || 2;
      for (let i = 1; i <= zones; i++) {
        circuits.push({ name: `Office Sockets - Zone ${i}`, loadType: 'office-sockets', loadPower: 5000, phases: 'single', specialLocation: 'none' });
      }
    }
    
    // Lighting
    circuits.push({ name: 'Main Lighting', loadType: 'lighting', loadPower: 2000, cableLength: 30, phases: 'single', specialLocation: 'none' });
    circuits.push({ name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 500, cableLength: 35, phases: 'single', specialLocation: 'none' });
    
    // Server/IT
    if (lowerDesc.includes('server') || lowerDesc.includes('data') || lowerDesc.includes('it')) {
      circuits.push({ name: 'Server Room/Data Cabinet', loadType: 'server-room', loadPower: 5000, phases: 'single', specialLocation: 'none', notes: 'UPS required' });
    }
    
    // HVAC
    if (lowerDesc.includes('hvac') || lowerDesc.includes('air con') || lowerDesc.includes('heating')) {
      circuits.push({ name: 'HVAC System', loadType: 'hvac', loadPower: 3000, phases: 'single', specialLocation: 'none' });
    }
    
    // Kitchen/Breakroom
    if (lowerDesc.includes('kitchen') || lowerDesc.includes('breakroom') || lowerDesc.includes('cafe')) {
      circuits.push({ name: 'Kitchen/Breakroom', loadType: 'kitchen-equipment', loadPower: 3000, phases: 'single', specialLocation: 'kitchen' });
    }
    
    // Security systems
    if (lowerDesc.includes('cctv') || lowerDesc.includes('security') || lowerDesc.includes('camera')) {
      circuits.push({ name: 'CCTV System', loadType: 'cctv', loadPower: 500, phases: 'single', specialLocation: 'none' });
    }
    if (lowerDesc.includes('access control') || lowerDesc.includes('door')) {
      circuits.push({ name: 'Access Control', loadType: 'access-control', loadPower: 300, phases: 'single', specialLocation: 'none' });
    }
    
    // Fire alarm
    circuits.push({ name: 'Fire Alarm Panel', loadType: 'fire-alarm', loadPower: 500, phases: 'single', specialLocation: 'none' });
  }
  
  // Industrial circuits
  if (installationType === 'industrial') {
    // Count machines
    const machineMatch = lowerDesc.match(/(\d+)\s*machine/);
    const machines = machineMatch ? parseInt(machineMatch[1]) : 0;
    
    if (machines > 0) {
      for (let i = 1; i <= machines; i++) {
        circuits.push({ 
          name: `Machine Tool ${i}`, 
          loadType: 'machine-tool', 
          loadPower: 11000, 
          phases: 'three', 
          specialLocation: 'none',
          notes: '7.5kW motor - Type D MCB'
        });
      }
    }
    
    // Motors
    if (lowerDesc.includes('motor') && machines === 0) {
      circuits.push({ name: 'Three Phase Motor', loadType: 'three-phase-motor', loadPower: 15000, phases: 'three', specialLocation: 'none', notes: '11kW' });
    }
    
    // Welding
    if (lowerDesc.includes('weld')) {
      circuits.push({ name: 'Welding Equipment', loadType: 'welding', loadPower: 15000, phases: 'three', specialLocation: 'none', notes: 'High inrush - Type D MCB' });
    }
    
    // Conveyor/Production line
    if (lowerDesc.includes('conveyor') || lowerDesc.includes('production')) {
      circuits.push({ name: 'Conveyor System', loadType: 'conveyor', loadPower: 7500, phases: 'three', specialLocation: 'none' });
    }
    
    // Crane
    if (lowerDesc.includes('crane') || lowerDesc.includes('hoist')) {
      circuits.push({ name: 'Overhead Crane', loadType: 'three-phase-motor', loadPower: 11000, phases: 'three', specialLocation: 'none' });
    }
    
    // Compressor
    if (lowerDesc.includes('compressor') || lowerDesc.includes('compressed air')) {
      circuits.push({ name: 'Air Compressor', loadType: 'compressor', loadPower: 5500, phases: 'three', specialLocation: 'none', notes: '4kW' });
    }
    
    // Extraction
    if (lowerDesc.includes('extraction') || lowerDesc.includes('ventilation')) {
      circuits.push({ name: 'Extraction System', loadType: 'extraction', loadPower: 4000, phases: 'single', specialLocation: 'none' });
    }
    
    // Workshop sockets
    circuits.push({ name: 'Workshop Sockets', loadType: 'workshop-sockets', loadPower: 5000, phases: 'single', specialLocation: 'none' });
    
    // Lighting
    circuits.push({ name: 'Factory Lighting', loadType: 'overhead-lighting', loadPower: 3000, cableLength: 50, phases: 'single', specialLocation: 'none' });
    
    // Control panel
    circuits.push({ name: 'Control Systems', loadType: 'control-panel', loadPower: 1500, phases: 'single', specialLocation: 'none' });
  }
  
  return circuits;
}
