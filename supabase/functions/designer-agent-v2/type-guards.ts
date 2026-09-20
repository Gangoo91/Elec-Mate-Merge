/**
 * Type Guards for Safe Property Access
 * Prevents null/undefined crashes throughout the codebase
 */

export interface CircuitWithCalculations {
  calculations: {
    Ib: number;
    In: number;
    Iz: number;
    voltageDrop: {
      volts: number;
      percent: number;
      compliant: boolean;
      limit: number;
    };
    zs: number;
    maxZs?: number;
  };
}

export interface CircuitWithProtection {
  protectionDevice: {
    type: string;
    rating: number;
    curve: string;
    kaRating: number;
  };
}

export interface ValidCircuit extends CircuitWithCalculations, CircuitWithProtection {
  name: string;
  loadPower: number;
  loadType: string;
  cableSize: number;
  cpcSize: number;
  cableLength: number;
}

export const TypeGuards = {
  /**
   * Check if circuit has valid calculations object
   */
  hasCalculations(circuit: any): circuit is CircuitWithCalculations {
    return (
      circuit?.calculations &&
      typeof circuit.calculations.Ib === 'number' &&
      typeof circuit.calculations.In === 'number' &&
      typeof circuit.calculations.Iz === 'number' &&
      circuit.calculations.voltageDrop &&
      typeof circuit.calculations.voltageDrop.percent === 'number'
    );
  },

  /**
   * Check if circuit has valid protection device
   */
  hasProtectionDevice(circuit: any): circuit is CircuitWithProtection {
    return (
      circuit?.protectionDevice &&
      typeof circuit.protectionDevice.rating === 'number' &&
      typeof circuit.protectionDevice.type === 'string' &&
      circuit.protectionDevice.rating > 0
    );
  },

  /**
   * Check if circuit is fully valid for design output
   */
  isValidCircuit(circuit: any): circuit is ValidCircuit {
    return (
      circuit &&
      typeof circuit.name === 'string' &&
      circuit.name.trim().length > 0 &&
      typeof circuit.loadPower === 'number' &&
      circuit.loadPower > 0 &&
      typeof circuit.loadType === 'string' &&
      typeof circuit.cableSize === 'number' &&
      typeof circuit.cpcSize === 'number' &&
      typeof circuit.cableLength === 'number' &&
      TypeGuards.hasCalculations(circuit) &&
      TypeGuards.hasProtectionDevice(circuit)
    );
  },

  /**
   * Safe getter for design current with fallback
   */
  getDesignCurrent(circuit: any): string {
    if (circuit?.designCurrentIb && typeof circuit.designCurrentIb === 'string') {
      return circuit.designCurrentIb;
    }
    if (TypeGuards.hasCalculations(circuit)) {
      return circuit.calculations.Ib.toFixed(1);
    }
    return '0.0';
  },

  /**
   * Safe getter for voltage drop with fallback
   */
  getVoltageDropPercent(circuit: any): number {
    if (TypeGuards.hasCalculations(circuit)) {
      return circuit.calculations.voltageDrop.percent;
    }
    return 0;
  },

  /**
   * Check if RAG result is valid
   */
  isValidRAGResult(result: any): boolean {
    return (
      result &&
      Array.isArray(result.regulations) &&
      result.regulations.length > 0
    );
  },

  /**
   * Check if AI response has tool calls
   */
  hasValidToolCall(result: any): boolean {
    return !!(
      result?.aiData?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments
    );
  }
};

/**
 * Apply default values to incomplete circuit
 */
export function applyDefaultCircuitValues(circuit: any): any {
  return {
    name: circuit?.name || 'Unnamed Circuit',
    loadPower: circuit?.loadPower || 1000,
    loadType: circuit?.loadType || 'other',
    cableSize: circuit?.cableSize || 2.5,
    cpcSize: circuit?.cpcSize || 1.5,
    cableLength: circuit?.cableLength || 20,
    phases: circuit?.phases || 1,
    calculations: circuit?.calculations || {
      Ib: 4.3,
      In: 6,
      Iz: 20,
      voltageDrop: { volts: 2.0, percent: 0.87, compliant: true, limit: 3 },
      zs: 1.5,
      maxZs: 7.28
    },
    protectionDevice: circuit?.protectionDevice || {
      type: 'MCB',
      rating: 6,
      curve: 'B',
      kaRating: 6
    },
    rcdProtected: circuit?.rcdProtected ?? false,
    justifications: circuit?.justifications || {},
    warnings: circuit?.warnings || []
  };
}
