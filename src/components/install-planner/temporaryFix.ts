// Temporary fix to disable problematic cable selection engine
// This prevents build errors while we transition to the enhanced database

export class SimpleCableSelectionEngine {
  static calculateCableOptions(): any[] {
    // Return empty array to prevent errors
    return [];
  }
  
  static calculateDesignCurrent(): number {
    return 0;
  }
  
  static mapCableType(): string {
    return 'pvc-twin-earth';
  }
  
  static calculateTotalCost(): number {
    return 0;
  }
  
  static mapComplexityToString(): string {
    return 'simple';
  }
  
  static checkEnvironmentalSuitability(): boolean {
    return true;
  }
  
  static checkApplicationSuitability(): boolean {
    return true;
  }
  
  static checkInstallationSuitability(): boolean {
    return true;
  }
}