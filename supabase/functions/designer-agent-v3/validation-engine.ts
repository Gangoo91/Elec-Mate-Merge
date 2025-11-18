/**
 * Phase 4: Validation Engine
 * Hard validation of AI-generated designs against BS 7671 rules
 * Provides deterministic auto-fix suggestions when validation fails
 */

import type { Design, DesignedCircuit, ValidationResult, ValidationIssue } from './types.ts';

const CABLE_SIZES = [1.0, 1.5, 2.5, 4.0, 6.0, 10.0, 16.0, 25.0, 35.0, 50.0, 70.0, 95.0, 120.0];
const MCB_RATINGS = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100];

export class ValidationEngine {
  constructor(private logger: any) {}

  /**
   * Validate entire design against BS 7671 rules
   * PHASE 5: Enhanced with voltage-specific validation
   */
  validate(design: Design, voltage?: number): ValidationResult {
    this.logger.info('Validation starting', {
      circuits: design.circuits.length,
      voltage: voltage || 'unknown'
    });

    const issues: ValidationIssue[] = [];
    
    // Validate each circuit (PHASE 5: Pass voltage for context-aware validation)
    design.circuits.forEach((circuit, idx) => {
      const circuitIssues = this.validateCircuit(circuit, idx, voltage);
      issues.push(...circuitIssues);
    });

    // Determine if design is valid
    const criticalIssues = issues.filter(i => i.severity === 'error');
    const isValid = criticalIssues.length === 0;

    this.logger.info('Validation complete', {
      isValid,
      errors: criticalIssues.length,
      warnings: issues.filter(i => i.severity === 'warning').length
    });

    return {
      isValid,
      issues,
      autoFixSuggestions: isValid ? [] : this.generateAutoFixes(issues)
    };
  }

  /**
   * Validate individual circuit against all BS 7671 rules
   * PHASE 5: Enhanced with voltage-aware validation
   */
  private validateCircuit(circuit: DesignedCircuit, index: number, voltage?: number): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // RULE 1: Ib ≤ In (Design current must not exceed protection device rating)
    if (circuit.calculations.Ib > circuit.calculations.In) {
      issues.push({
        circuitIndex: index,
        circuitName: circuit.name,
        rule: 'Ib_In_relationship',
        regulation: '433.1.1',
        severity: 'error',
        message: `Design current (Ib=${circuit.calculations.Ib.toFixed(1)}A) exceeds protection device rating (In=${circuit.calculations.In}A)`,
        currentValue: circuit.calculations.Ib,
        expectedValue: circuit.calculations.In,
        fieldAffected: 'protectionDevice.rating'
      });
    }

    // RULE 2: In ≤ Iz (Protection device rating must not exceed cable capacity)
    if (circuit.calculations.In > circuit.calculations.Iz) {
      issues.push({
        circuitIndex: index,
        circuitName: circuit.name,
        rule: 'In_Iz_relationship',
        regulation: '433.1.1',
        severity: 'error',
        message: `Protection device rating (In=${circuit.calculations.In}A) exceeds cable capacity (Iz=${circuit.calculations.Iz.toFixed(1)}A)`,
        currentValue: circuit.calculations.In,
        expectedValue: circuit.calculations.Iz,
        fieldAffected: 'cableSize'
      });
    }


    // RULE 3: Voltage drop compliance
    if (circuit.calculations.voltageDrop && !circuit.calculations.voltageDrop.compliant) {
      issues.push({
        circuitIndex: index,
        circuitName: circuit.name,
        rule: 'voltage_drop',
        regulation: '525.1',
        severity: 'error',
        message: `Voltage drop (${circuit.calculations.voltageDrop.percent.toFixed(2)}%) exceeds ${circuit.calculations.voltageDrop.limit}% limit`,
        currentValue: circuit.calculations.voltageDrop.percent,
        expectedValue: circuit.calculations.voltageDrop.limit,
        fieldAffected: 'cableSize'
      });
    }


    // RULE 4: Zs ≤ maxZs (Earth fault loop impedance compliance)
    if (circuit.calculations.zs !== undefined && circuit.calculations.maxZs !== undefined) {
      if (circuit.calculations.zs > circuit.calculations.maxZs) {
        issues.push({
          circuitIndex: index,
          circuitName: circuit.name,
          rule: 'zs_compliance',
        regulation: '411.3.2',
        severity: 'error',
        message: `Zs (${circuit.calculations.zs.toFixed(3)}Ω) exceeds maximum permitted (${circuit.calculations.maxZs.toFixed(3)}Ω)`,
          currentValue: circuit.calculations.zs,
          expectedValue: circuit.calculations.maxZs,
          fieldAffected: 'cableSize'
        });
      }
    }

    // RULE 5: RCD protection for sockets
    if (circuit.loadType?.includes('socket') && circuit.protectionDevice.type !== 'RCBO') {
      issues.push({
        circuitIndex: index,
        circuitName: circuit.name,
        rule: 'rcd_sockets',
        regulation: '411.3.3',
        severity: 'error',
        message: `Socket circuits MUST use RCBO protection per Reg 411.3.3. Current: ${circuit.protectionDevice.type}. Auto-correct to RCBO required.`,
        currentValue: circuit.protectionDevice.type,
        expectedValue: 'RCBO',
        fieldAffected: 'protectionDevice.type'
      });
    }

    // RULE 6: RCD protection for bathrooms
    if (circuit.specialLocation?.includes('bathroom') && circuit.protectionDevice.type !== 'RCBO') {
      issues.push({
        circuitIndex: index,
        circuitName: circuit.name,
        rule: 'rcd_bathroom',
        regulation: '701.411.3.3',
        severity: 'error',
        message: `Bathroom circuits MUST use RCBO protection per Reg 701.411.3.3. Current: ${circuit.protectionDevice.type}. Auto-correct to RCBO required.`,
        currentValue: circuit.protectionDevice.type,
        expectedValue: 'RCBO',
        fieldAffected: 'protectionDevice.type'
      });
    }

    // RULE 7: Cable size must be standard size
    if (!CABLE_SIZES.includes(circuit.cableSize)) {
      issues.push({
        circuitIndex: index,
        circuitName: circuit.name,
        rule: 'standard_cable_size',
        regulation: 'BS 6004',
        severity: 'error',
        message: `Cable size ${circuit.cableSize}mm² is not a standard size`,
        currentValue: circuit.cableSize,
        expectedValue: this.getNextCableSize(circuit.cableSize) || circuit.cableSize,
        fieldAffected: 'cableSize'
      });
    }

    // RULE 8: MCB rating must be standard rating
    if (!MCB_RATINGS.includes(circuit.protectionDevice.rating)) {
      issues.push({
        circuitIndex: index,
        circuitName: circuit.name,
        rule: 'standard_mcb_rating',
        regulation: 'BS EN 60898',
        severity: 'error',
        message: `MCB rating ${circuit.protectionDevice.rating}A is not a standard rating`,
        currentValue: circuit.protectionDevice.rating,
        expectedValue: this.getNextMCBRating(circuit.protectionDevice.rating) || circuit.protectionDevice.rating,
        fieldAffected: 'protectionDevice.rating'
      });
    }

    // RULE 9: CPC size validation (should be appropriate for cable size)
    const expectedCPCSize = this.getMinimumCPCSize(circuit.cableSize);
    if (circuit.cpcSize < expectedCPCSize) {
      issues.push({
        circuitIndex: index,
        circuitName: circuit.name,
        rule: 'cpc_sizing',
        regulation: '543.1.1',
        severity: 'warning',
        message: `CPC size ${circuit.cpcSize}mm² may be undersized for ${circuit.cableSize}mm² cable (minimum ${expectedCPCSize}mm²)`,
        currentValue: circuit.cpcSize,
        expectedValue: expectedCPCSize,
        fieldAffected: 'cpcSize'
      });
    }

    // RULE 10: Safety margin check (warning if < 10%)
    const safetyMargin = ((circuit.calculations.Iz - circuit.calculations.In) / circuit.calculations.In) * 100;
    if (safetyMargin < 10) {
      issues.push({
        circuitIndex: index,
        circuitName: circuit.name,
        rule: 'safety_margin',
        regulation: 'Best Practice',
        severity: 'warning',
        message: `Low safety margin (${safetyMargin.toFixed(1)}%). Consider larger cable for future capacity.`,
        currentValue: safetyMargin,
        expectedValue: 10,
        fieldAffected: 'cableSize'
      });
    }

    // PHASE 5: Voltage-specific validation removed
    // AI designer handles all electrical calculations (Ohm's Law, power calculations, etc.) via RAG
    // Validation should only check BS7671 regulation compliance, not perform electrical engineering calculations

    return issues;
  }

  /**
   * Generate auto-fix suggestions for validation failures
   */
  private generateAutoFixes(issues: ValidationIssue[]): string[] {
    const fixes: string[] = [];
    const fixedCircuits = new Set<number>();

    // Group issues by circuit
    const issuesByCircuit = new Map<number, ValidationIssue[]>();
    issues.forEach(issue => {
      if (!issuesByCircuit.has(issue.circuitIndex)) {
        issuesByCircuit.set(issue.circuitIndex, []);
      }
      issuesByCircuit.get(issue.circuitIndex)!.push(issue);
    });

    // Generate fixes per circuit
    issuesByCircuit.forEach((circuitIssues, circuitIndex) => {
      const circuitName = circuitIssues[0].circuitName;
      
      // Check for cable sizing issues (VD, Zs, In>Iz)
      const needsLargerCable = circuitIssues.some(i => 
        i.rule === 'voltage_drop' || 
        i.rule === 'zs_compliance' || 
        i.rule === 'In_Iz_relationship'
      );

      if (needsLargerCable && !fixedCircuits.has(circuitIndex)) {
        const cableSizeIssue = circuitIssues.find(i => i.fieldAffected === 'cableSize');
        if (cableSizeIssue) {
          const currentSize = cableSizeIssue.currentValue as number;
          const nextSize = this.getNextCableSize(currentSize);
          
          if (nextSize) {
            fixes.push(
              `⚠️ ${circuitName}: Increase cable size from ${currentSize}mm² to ${nextSize}mm² to resolve ${circuitIssues.filter(i => i.fieldAffected === 'cableSize').map(i => i.rule).join(', ')} issues`
            );
            fixedCircuits.add(circuitIndex);
          } else {
            fixes.push(
              `❌ ${circuitName}: Cable size ${currentSize}mm² is insufficient and no larger standard size available - reduce cable length or load`
            );
            fixedCircuits.add(circuitIndex);
          }
        }
      }

      // Check for MCB undersizing (Ib > In)
      const needsLargerMCB = circuitIssues.some(i => i.rule === 'Ib_In_relationship');
      if (needsLargerMCB && !fixedCircuits.has(circuitIndex)) {
        const mcbIssue = circuitIssues.find(i => i.rule === 'Ib_In_relationship');
        if (mcbIssue) {
          const currentRating = mcbIssue.expectedValue as number; // In
          const requiredRating = Math.ceil(mcbIssue.currentValue as number); // Ib
          const nextRating = this.getNextMCBRating(requiredRating);
          
          if (nextRating) {
            fixes.push(
              `⚠️ ${circuitName}: Increase MCB rating from ${currentRating}A to ${nextRating}A to accommodate design current of ${requiredRating}A`
            );
          } else {
            fixes.push(
              `❌ ${circuitName}: Design current ${requiredRating}A exceeds largest standard MCB rating - reduce load`
            );
          }
          fixedCircuits.add(circuitIndex);
        }
      }

      // Check for RCD requirement
      const needsRCD = circuitIssues.some(i => 
        i.rule === 'rcd_sockets' || i.rule === 'rcd_bathroom'
      );
      if (needsRCD && !fixedCircuits.has(circuitIndex)) {
        fixes.push(
          `⚠️ ${circuitName}: Change protection device from MCB to RCBO to comply with RCD requirements (${circuitIssues.find(i => i.rule.startsWith('rcd_'))?.regulation})`
        );
        fixedCircuits.add(circuitIndex);
      }

      // Check for non-standard sizes
      const nonStandardCable = circuitIssues.find(i => i.rule === 'standard_cable_size');
      if (nonStandardCable && !fixedCircuits.has(circuitIndex)) {
        fixes.push(
          `⚠️ ${circuitName}: Use standard cable size ${nonStandardCable.expectedValue}mm² instead of ${nonStandardCable.currentValue}mm²`
        );
        fixedCircuits.add(circuitIndex);
      }

      const nonStandardMCB = circuitIssues.find(i => i.rule === 'standard_mcb_rating');
      if (nonStandardMCB && !fixedCircuits.has(circuitIndex)) {
        fixes.push(
          `⚠️ ${circuitName}: Use standard MCB rating ${nonStandardMCB.expectedValue}A instead of ${nonStandardMCB.currentValue}A`
        );
        fixedCircuits.add(circuitIndex);
      }
    });

    return fixes;
  }

  /**
   * Get next larger cable size
   */
  private getNextCableSize(currentSize: number): number | null {
    const nextSize = CABLE_SIZES.find(size => size > currentSize);
    return nextSize || null;
  }

  /**
   * Get next larger MCB rating
   */
  private getNextMCBRating(currentRating: number): number | null {
    const nextRating = MCB_RATINGS.find(rating => rating > currentRating);
    return nextRating || null;
  }

  /**
   * Get minimum CPC size for given cable size (simplified BS 7671 Table 54.7)
   */
  private getMinimumCPCSize(cableSize: number): number {
    if (cableSize <= 16) return cableSize; // Same as cable
    if (cableSize <= 35) return 16; // 16mm² for cables up to 35mm²
    return cableSize / 2; // Half the cable size for larger cables
  }
}
