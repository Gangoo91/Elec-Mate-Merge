// Parametric Diagram Layout Engine
// Generates BS 7671 compliant single-line diagrams

export interface DiagramElement {
  id: string;
  type: 'mcb' | 'rcbo' | 'rcd' | 'cable' | 'load' | 'earth' | 'consumer-unit';
  x: number;
  y: number;
  props: Record<string, any>;
}

export interface Connection {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'line' | 'neutral' | 'earth';
}

export interface DiagramLayout {
  width: number;
  height: number;
  elements: DiagramElement[];
  connections: Connection[];
  title: string;
  metadata: {
    circuitNumber?: string;
    designedBy?: string;
    date?: string;
  };
}

export interface CircuitData {
  circuitNumber: number;
  name: string;
  voltage: number;
  cableSize: number;
  cpcSize: number;
  cableLength: number;
  loadType: string;
  loadPower: number;
  protectionDevice: {
    type: string;
    rating: number;
    curve?: string;
    kaRating: number;
  };
  rcdProtected: boolean;
  rcdRating?: number;
  ze: number;
}

/**
 * Generate a single-line diagram for one circuit
 * BS 7671 compliant representation
 */
export function generateSingleLineDiagram(
  circuitData: CircuitData
): DiagramLayout {
  const elements: DiagramElement[] = [];
  const connections: Connection[] = [];
  
  const centerX = 250;
  let currentY = 50;
  const ySpacing = 120;
  
  // 1. Incoming supply annotation
  elements.push({
    id: 'supply',
    type: 'consumer-unit' as const,
    x: centerX - 40,
    y: currentY,
    props: {
      width: 80,
      height: 40,
      label: 'From CU',
      mainSwitchRating: 100
    }
  });
  
  currentY += 80;
  
  // 2. Protection device (MCB or RCBO)
  const protectionId = circuitData.rcdProtected ? 'rcbo' : 'mcb';
  if (circuitData.rcdProtected && circuitData.rcdRating) {
    elements.push({
      id: protectionId,
      type: 'rcbo',
      x: centerX - 25,
      y: currentY,
      props: {
        rating: circuitData.protectionDevice.rating,
        curve: circuitData.protectionDevice.curve || 'B',
        rcdRating: circuitData.rcdRating,
        rcdType: 'A',
        label: `Circuit ${circuitData.circuitNumber}`,
        kaRating: circuitData.protectionDevice.kaRating
      }
    });
    currentY += 110;
  } else {
    elements.push({
      id: protectionId,
      type: 'mcb',
      x: centerX - 20,
      y: currentY,
      props: {
        rating: circuitData.protectionDevice.rating,
        curve: circuitData.protectionDevice.curve || 'B',
        label: `Circuit ${circuitData.circuitNumber}`,
        kaRating: circuitData.protectionDevice.kaRating
      }
    });
    currentY += 90;
  }
  
  // Connection from protection to cable
  const cableStartY = currentY;
  
  // 3. Cable run
  const cableEndY = currentY + 150;
  elements.push({
    id: 'cable',
    type: 'cable',
    x: centerX,
    y: currentY,
    props: {
      liveSize: circuitData.cableSize,
      cpcSize: circuitData.cpcSize,
      length: circuitData.cableLength,
      x1: centerX,
      y1: cableStartY,
      x2: centerX,
      y2: cableEndY,
      showAnnotation: true
    }
  });
  
  currentY = cableEndY + 20;
  
  // 4. Load
  elements.push({
    id: 'load',
    type: 'load',
    x: centerX - 20,
    y: currentY,
    props: {
      type: mapLoadType(circuitData.loadType),
      label: circuitData.name,
      rating: circuitData.loadPower
    }
  });
  
  currentY += 80;
  
  // 5. Earth connection
  elements.push({
    id: 'earth',
    type: 'earth',
    x: centerX,
    y: currentY,
    props: {
      size: 30,
      label: `CPC ${circuitData.cpcSize}mm²`
    }
  });
  
  // Generate connections
  connections.push({
    id: 'supply-to-protection',
    from: { x: centerX, y: 90 },
    to: { x: centerX, y: currentY - (circuitData.rcdProtected ? 110 : 90) },
    type: 'line'
  });
  
  return {
    width: 500,
    height: currentY + 100,
    elements,
    connections,
    title: `Circuit ${circuitData.circuitNumber} - ${circuitData.name}`,
    metadata: {
      circuitNumber: String(circuitData.circuitNumber),
      date: new Date().toLocaleDateString('en-GB')
    }
  };
}

function mapLoadType(loadType: string): 'socket' | 'light' | 'cooker' | 'shower' | 'immersion' | 'heating' | 'ev-charger' | 'motor' | 'generic' {
  const mapping: Record<string, any> = {
    'lighting': 'light',
    'socket': 'socket',
    'cooker': 'cooker',
    'shower': 'shower',
    'immersion': 'immersion',
    'heating': 'heating',
    'ev-charger': 'ev-charger',
    'motor': 'motor'
  };
  
  return mapping[loadType.toLowerCase()] || 'generic';
}

/**
 * Generate a multi-circuit consumer unit diagram
 * Shows all circuits in a consumer unit layout
 */
export function generateConsumerUnitDiagram(
  circuits: CircuitData[],
  mainSwitchRating: number = 100
): DiagramLayout {
  const elements: DiagramElement[] = [];
  const connections: Connection[] = [];
  
  const cuWidth = 400;
  const cuHeight = 150 + (Math.ceil(circuits.length / 2) * 100);
  const cuX = 50;
  const cuY = 50;
  
  // 1. Consumer Unit enclosure
  elements.push({
    id: 'consumer-unit',
    type: 'consumer-unit',
    x: cuX,
    y: cuY,
    props: {
      width: cuWidth,
      height: cuHeight,
      mainSwitchRating,
      label: 'Consumer Unit'
    }
  });
  
  // 2. Circuit protection devices in grid layout (2 columns)
  const deviceSpacing = 80;
  const deviceStartY = cuY + 130;
  const deviceStartX = cuX + 60;
  
  circuits.forEach((circuit, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    
    const deviceX = deviceStartX + (col * 200);
    const deviceY = deviceStartY + (row * 100);
    
    if (circuit.rcdProtected && circuit.rcdRating) {
      elements.push({
        id: `circuit-${index}`,
        type: 'rcbo',
        x: deviceX - 25,
        y: deviceY,
        props: {
          rating: circuit.protectionDevice.rating,
          curve: circuit.protectionDevice.curve || 'B',
          rcdRating: circuit.rcdRating,
          label: `C${circuit.circuitNumber}`,
          kaRating: circuit.protectionDevice.kaRating
        }
      });
    } else {
      elements.push({
        id: `circuit-${index}`,
        type: 'mcb',
        x: deviceX - 20,
        y: deviceY,
        props: {
          rating: circuit.protectionDevice.rating,
          curve: circuit.protectionDevice.curve || 'B',
          label: `C${circuit.circuitNumber}`,
          kaRating: circuit.protectionDevice.kaRating
        }
      });
    }
  });
  
  return {
    width: cuWidth + 100,
    height: cuHeight + 100,
    elements,
    connections,
    title: 'Consumer Unit Layout',
    metadata: {
      date: new Date().toLocaleDateString('en-GB')
    }
  };
}
