// Circuit validation and cross-referencing utilities for multi-photo analysis
import { twinAndEarthCpcFor, normaliseCableSize } from './twinAndEarth';

export interface DetectedCircuit {
  circuitNumber: string;
  circuitDescription: string;
  circuitType: string;
  protectiveDeviceType: string;
  protectiveDeviceRating: string;
  protectiveDeviceKaRating: string;
  liveSize: string;
  cpcSize: string;
  confidence: 'high' | 'medium' | 'low';
  notes?: string;
  sourcePhotoIndex?: number;
}

export interface MergedCircuit extends DetectedCircuit {
  overallConfidence: 'high' | 'medium' | 'low';
  detectionCount: number;
  conflicts?: {
    field: string;
    values: Array<{ value: string; count: number; photoIndexes: number[] }>;
  }[];
}

/**
 * Normalize circuit values for comparison
 */
const normalizeValue = (value: string | undefined): string => {
  if (!value) return '';
  return value.toLowerCase().trim().replace(/\s+/g, ' ');
};

/**
 * Calculate similarity between two strings (0-1)
 */
const stringSimilarity = (a: string, b: string): number => {
  const normalize = (s: string) => s.toLowerCase().trim();
  const normA = normalize(a);
  const normB = normalize(b);
  
  if (normA === normB) return 1.0;
  if (normA.includes(normB) || normB.includes(normA)) return 0.8;
  
  // Levenshtein-like basic similarity
  const maxLen = Math.max(normA.length, normB.length);
  if (maxLen === 0) return 1.0;
  
  let matches = 0;
  const minLen = Math.min(normA.length, normB.length);
  for (let i = 0; i < minLen; i++) {
    if (normA[i] === normB[i]) matches++;
  }
  
  return matches / maxLen;
};

/**
 * Determine if two circuits are the same based on circuit number and description
 */
const isSameCircuit = (a: DetectedCircuit, b: DetectedCircuit): boolean => {
  // Circuit number must match exactly
  if (normalizeValue(a.circuitNumber) !== normalizeValue(b.circuitNumber)) {
    return false;
  }
  
  // Description should be similar (allow for minor variations)
  const descSimilarity = stringSimilarity(
    a.circuitDescription || '',
    b.circuitDescription || ''
  );
  
  return descSimilarity > 0.6;
};

/**
 * Get most common value from array with counts
 */
const getMostCommon = <T extends string>(values: T[]): T => {
  const counts = new Map<T, number>();
  values.forEach(v => counts.set(v, (counts.get(v) || 0) + 1));
  
  let maxCount = 0;
  let mostCommon = values[0];
  
  counts.forEach((count, value) => {
    if (count > maxCount) {
      maxCount = count;
      mostCommon = value;
    }
  });
  
  return mostCommon;
};

/**
 * Calculate overall confidence based on detection count and individual confidences
 */
const calculateOverallConfidence = (
  circuits: DetectedCircuit[]
): 'high' | 'medium' | 'low' => {
  const detectionCount = circuits.length;
  const confidenceCounts = {
    high: circuits.filter(c => c.confidence === 'high').length,
    medium: circuits.filter(c => c.confidence === 'medium').length,
    low: circuits.filter(c => c.confidence === 'low').length
  };
  
  // Multiple high-confidence detections
  if (detectionCount >= 2 && confidenceCounts.high >= 2) return 'high';
  if (detectionCount >= 3 && confidenceCounts.high >= 1) return 'high';
  
  // Multiple detections with at least one high
  if (detectionCount >= 2 && confidenceCounts.high >= 1) return 'medium';
  
  // Single high-confidence detection
  if (detectionCount === 1 && confidenceCounts.high === 1) return 'medium';
  
  return 'low';
};

/**
 * Check for conflicts in a specific field across multiple detections
 */
const checkFieldConflicts = (
  circuits: DetectedCircuit[],
  field: keyof DetectedCircuit
): MergedCircuit['conflicts'][0] | null => {
  const values = circuits.map(c => normalizeValue(c[field] as string)).filter(v => v);
  const uniqueValues = new Set(values);
  
  // No conflict if all values are the same or missing
  if (uniqueValues.size <= 1) return null;
  
  // Build conflict details
  const valueCounts = new Map<string, { count: number; photoIndexes: number[] }>();
  
  circuits.forEach((circuit, idx) => {
    const value = normalizeValue(circuit[field] as string);
    if (!value) return;
    
    if (!valueCounts.has(value)) {
      valueCounts.set(value, { count: 0, photoIndexes: [] });
    }
    const existing = valueCounts.get(value)!;
    existing.count++;
    existing.photoIndexes.push(circuit.sourcePhotoIndex ?? idx);
  });
  
  return {
    field: field as string,
    values: Array.from(valueCounts.entries()).map(([value, data]) => ({
      value,
      count: data.count,
      photoIndexes: data.photoIndexes
    }))
  };
};

/**
 * Merge and validate circuits from multiple photo analyses
 */
export const mergeMultiPhotoCircuits = (
  circuitsByPhoto: DetectedCircuit[][]
): MergedCircuit[] => {
  // Tag each circuit with its source photo index
  const allCircuits = circuitsByPhoto.flatMap((circuits, photoIndex) =>
    circuits.map(c => ({ ...c, sourcePhotoIndex: photoIndex }))
  );
  
  // Group circuits by circuit number
  const circuitGroups = new Map<string, DetectedCircuit[]>();
  
  allCircuits.forEach(circuit => {
    const key = normalizeValue(circuit.circuitNumber);
    if (!circuitGroups.has(key)) {
      circuitGroups.set(key, []);
    }
    circuitGroups.get(key)!.push(circuit);
  });
  
  // Merge each group
  const mergedCircuits: MergedCircuit[] = [];
  
  circuitGroups.forEach((group, circuitNumber) => {
    // Find the most common values for each field
    const merged: MergedCircuit = {
      circuitNumber: getMostCommon(group.map(c => c.circuitNumber)),
      circuitDescription: getMostCommon(group.map(c => c.circuitDescription)),
      circuitType: getMostCommon(group.map(c => c.circuitType)),
      protectiveDeviceType: getMostCommon(group.map(c => c.protectiveDeviceType)),
      protectiveDeviceRating: getMostCommon(group.map(c => c.protectiveDeviceRating)),
      protectiveDeviceKaRating: getMostCommon(group.map(c => c.protectiveDeviceKaRating)),
      liveSize: getMostCommon(group.map(c => c.liveSize)),
      cpcSize: getMostCommon(group.map(c => c.cpcSize)),
      confidence: group[0].confidence, // Will be overridden
      overallConfidence: calculateOverallConfidence(group),
      detectionCount: group.length,
      notes: group.map(c => c.notes).filter(Boolean).join('; ')
    };
    
    // Check for conflicts in critical fields
    const conflicts: MergedCircuit['conflicts'] = [];
    const criticalFields: (keyof DetectedCircuit)[] = [
      'protectiveDeviceType',
      'protectiveDeviceRating',
      'liveSize',
      'cpcSize'
    ];
    
    criticalFields.forEach(field => {
      const conflict = checkFieldConflicts(group, field);
      if (conflict) conflicts.push(conflict);
    });
    
    if (conflicts.length > 0) {
      merged.conflicts = conflicts;
    }
    
    // Apply UK T&E CPC correction
    const canonicalLive = normaliseCableSize(merged.liveSize);
    const correctCpc = twinAndEarthCpcFor(canonicalLive);
    
    if (merged.cpcSize !== correctCpc) {
      if (merged.notes) merged.notes += '; ';
      merged.notes = (merged.notes || '') + `CPC auto-corrected to ${correctCpc} for UK T&E`;
      merged.cpcSize = correctCpc;
    }
    
    merged.confidence = merged.overallConfidence;
    mergedCircuits.push(merged);
  });
  
  // Sort by circuit number
  return mergedCircuits.sort((a, b) => {
    const numA = parseInt(a.circuitNumber) || 999;
    const numB = parseInt(b.circuitNumber) || 999;
    return numA - numB;
  });
};
