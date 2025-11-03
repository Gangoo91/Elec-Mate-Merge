/**
 * Risk Level Helper Utilities
 * Centralized color and styling functions for risk levels across the app
 */

export type RiskLevel = 'low' | 'medium' | 'high';

export interface RiskLevelColors {
  bg: string;
  text: string;
  border: string;
  badge: string;
  glow: string;
}

/**
 * Get risk level from numeric risk rating (1-25 scale)
 */
export function getRiskLevel(rating: number): RiskLevel {
  if (rating <= 4) return 'low';
  if (rating <= 12) return 'medium';
  return 'high';
}

/**
 * Get comprehensive color classes for a risk rating
 */
export function getRiskColors(rating: number): RiskLevelColors {
  const level = getRiskLevel(rating);
  return getRiskColorsByLevel(level);
}

/**
 * Get comprehensive color classes by risk level
 */
export function getRiskColorsByLevel(level: RiskLevel): RiskLevelColors {
  switch (level) {
    case 'low':
      return {
        bg: 'bg-green-500/90',
        text: 'text-white',
        border: 'border-green-500',
        badge: 'bg-green-100 text-green-800 border-green-500/30',
        glow: 'shadow-[0_0_15px_rgba(34,197,94,0.3)]'
      };
    case 'medium':
      return {
        bg: 'bg-amber-500/90',
        text: 'text-elec-dark',
        border: 'border-amber-500',
        badge: 'bg-amber-100 text-amber-800 border-amber-500/30',
        glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]'
      };
    case 'high':
      return {
        bg: 'bg-red-500/90',
        text: 'text-white',
        border: 'border-red-500',
        badge: 'bg-red-100 text-red-800 border-red-500/30',
        glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse'
      };
  }
}

/**
 * Get risk level label
 */
export function getRiskLevelLabel(level: RiskLevel): string {
  return level.toUpperCase();
}

/**
 * Calculate total hazard count
 */
export function getTotalHazardCount(risks: any[]): number {
  return risks?.length || 0;
}

/**
 * Get highest risk score from array of risks
 */
export function getHighestRiskScore(risks: any[]): number {
  if (!risks || risks.length === 0) return 0;
  return Math.max(...risks.map(r => r.riskRating || 0));
}

/**
 * Get overall risk level for a project
 */
export function getOverallRiskLevel(risks: any[]): RiskLevel {
  const highestScore = getHighestRiskScore(risks);
  return getRiskLevel(highestScore);
}

/**
 * Count total control measures
 */
export function getTotalControlMeasures(risks: any[]): number {
  if (!risks) return 0;
  return risks.reduce((total, risk) => {
    const controls = risk.controls || '';
    // Count by newlines or semicolons
    const controlCount = controls.split(/[\n;]/).filter((c: string) => c.trim().length > 0).length;
    return total + Math.max(controlCount, 1); // At least 1 if controls exist
  }, 0);
}
