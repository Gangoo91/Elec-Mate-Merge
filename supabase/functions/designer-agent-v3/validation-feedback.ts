/**
 * Validation Feedback System (Phase 2)
 * Converts validation errors into actionable AI prompts for self-correction
 */

import type { ValidationIssue, NormalizedInputs } from './types.ts';

export class ValidationFeedback {
  /**
   * Convert validation issues into a structured correction prompt for AI
   */
  buildCorrectionPrompt(
    issues: ValidationIssue[],
    inputs: NormalizedInputs,
    failedDesign: any
  ): string {
    const parts: string[] = [];

    parts.push('=== DESIGN VALIDATION FAILED ===');
    parts.push('The previous design attempt had the following non-compliances:');
    parts.push('');

    // Group issues by circuit
    const issuesByCircuit = this.groupIssuesByCircuit(issues);

    Object.entries(issuesByCircuit).forEach(([circuitName, circuitIssues]) => {
      parts.push(`Circuit: ${circuitName}`);
      circuitIssues.forEach(issue => {
        parts.push(`  ❌ ${issue.regulation}: ${issue.message}`);
        parts.push(`     Current: ${this.formatValue(issue.currentValue)}`);
        parts.push(`     Required: ${this.formatValue(issue.expectedValue)}`);
        parts.push(`     Fix: ${this.generateFixSuggestion(issue)}`);
      });
      parts.push('');
    });

    parts.push('=== CORRECTION REQUIREMENTS ===');
    parts.push('Re-design ALL circuits to achieve full BS 7671 compliance.');
    parts.push('For each failed circuit, you must:');
    parts.push('1. Identify the root cause of non-compliance');
    parts.push('2. Apply the minimum necessary changes (cable size, MCB rating, etc.)');
    parts.push('3. Re-calculate all values (Ib, In, Iz, VD, Zs)');
    parts.push('4. Explain your corrections in the justifications field');
    parts.push('');
    parts.push('CRITICAL: Do not just increase everything. Apply intelligent corrections.');
    parts.push('');

    return parts.join('\n');
  }

  /**
   * Group issues by circuit for cleaner presentation
   */
  private groupIssuesByCircuit(issues: ValidationIssue[]): Record<string, ValidationIssue[]> {
    const grouped: Record<string, ValidationIssue[]> = {};
    
    issues.forEach(issue => {
      if (!grouped[issue.circuitName]) {
        grouped[issue.circuitName] = [];
      }
      grouped[issue.circuitName].push(issue);
    });

    return grouped;
  }

  /**
   * Format values for display
   */
  private formatValue(value: any): string {
    if (typeof value === 'number') {
      if (value < 10) return value.toFixed(2);
      return value.toFixed(1);
    }
    return String(value);
  }

  /**
   * Generate specific fix suggestion based on issue type
   */
  private generateFixSuggestion(issue: ValidationIssue): string {
    switch (issue.rule) {
      case 'Ib_In_relationship':
        return `Increase MCB rating from ${issue.currentValue}A to next standard size (${this.nextMCBSize(issue.currentValue)}A)`;

      case 'In_Iz_relationship':
        return `Increase cable size from ${issue.currentValue}mm² or reduce MCB rating`;

      case 'voltage_drop':
        return `Increase cable size to reduce voltage drop below ${issue.expectedValue}%`;

      case 'zs_compliance':
        return `Increase cable size (especially CPC) to reduce Zs below ${this.formatValue(issue.expectedValue)}Ω`;

      case 'cable_size_standard':
        return `Use standard cable size: ${this.nearestStandardCable(issue.currentValue)}mm²`;

      case 'mcb_rating_standard':
        return `Use standard MCB rating: ${this.nextMCBSize(issue.currentValue)}A`;

      case 'cpc_size':
        return `Increase CPC to minimum ${this.formatValue(issue.expectedValue)}mm²`;

      default:
        return `Review ${issue.fieldAffected} and adjust according to ${issue.regulation}`;
    }
  }

  /**
   * Get next standard MCB size
   */
  private nextMCBSize(current: number): number {
    const sizes = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100];
    return sizes.find(s => s > current) || 100;
  }

  /**
   * Get nearest standard cable size
   */
  private nearestStandardCable(current: number): number {
    const sizes = [1.0, 1.5, 2.5, 4.0, 6.0, 10.0, 16.0, 25.0, 35.0, 50.0, 70.0, 95.0];
    return sizes.find(s => s >= current) || 95.0;
  }
}
