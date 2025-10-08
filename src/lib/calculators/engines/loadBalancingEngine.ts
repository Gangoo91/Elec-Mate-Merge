// Load Balancing Engine for Three-Phase Installations
// BS 7671:2018+A3:2024

export interface CircuitLoad {
  circuitNumber: number;
  name: string;
  loadPower: number; // W
  designCurrent: number; // A
  voltage: number;
  loadType: string;
  canRelocate: boolean; // Some loads must stay on specific phases
}

export interface LoadBalancingResult {
  l1Total: number; // A
  l2Total: number; // A
  l3Total: number; // A
  imbalance: number; // % max deviation from average
  compliant: boolean; // <10% imbalance recommended, <15% acceptable
  recommendations: string[];
  circuitAllocation: {
    circuitNumber: number;
    name: string;
    phase: 'L1' | 'L2' | 'L3';
    loadContribution: number; // A
  }[];
  totalLoad: number; // A (average per phase)
}

export function balanceThreePhaseLoad(
  circuits: CircuitLoad[]
): LoadBalancingResult {
  // Initialize phase totals
  let l1Total = 0;
  let l2Total = 0;
  let l3Total = 0;

  // Track circuit allocations
  const circuitAllocation: LoadBalancingResult['circuitAllocation'] = [];

  // Sort circuits by load (largest first) for better balancing
  const sortedCircuits = [...circuits].sort((a, b) => b.designCurrent - a.designCurrent);

  // Allocate each circuit to the phase with lowest current total
  sortedCircuits.forEach(circuit => {
    let assignedPhase: 'L1' | 'L2' | 'L3';
    
    // Find phase with lowest load
    if (l1Total <= l2Total && l1Total <= l3Total) {
      assignedPhase = 'L1';
      l1Total += circuit.designCurrent;
    } else if (l2Total <= l1Total && l2Total <= l3Total) {
      assignedPhase = 'L2';
      l2Total += circuit.designCurrent;
    } else {
      assignedPhase = 'L3';
      l3Total += circuit.designCurrent;
    }

    circuitAllocation.push({
      circuitNumber: circuit.circuitNumber,
      name: circuit.name,
      phase: assignedPhase,
      loadContribution: circuit.designCurrent
    });
  });

  // Calculate imbalance
  const average = (l1Total + l2Total + l3Total) / 3;
  const maxDeviation = Math.max(
    Math.abs(l1Total - average),
    Math.abs(l2Total - average),
    Math.abs(l3Total - average)
  );
  const imbalance = average > 0 ? (maxDeviation / average) * 100 : 0;

  // Check compliance
  const compliant = imbalance < 15; // <10% ideal, <15% acceptable
  const recommendations: string[] = [];

  if (imbalance > 15) {
    recommendations.push(
      `⚠️ High imbalance (${imbalance.toFixed(1)}%) - Redistribute loads to achieve <15% imbalance`
    );
  } else if (imbalance > 10) {
    recommendations.push(
      `⚡ Moderate imbalance (${imbalance.toFixed(1)}%) - Consider redistribution to achieve <10% for optimal performance`
    );
  }

  // Check for severely overloaded phases
  const phaseOverloadThreshold = 80; // A (typical for domestic installation)
  if (l1Total > phaseOverloadThreshold) {
    recommendations.push(`L1 phase heavily loaded (${l1Total.toFixed(1)}A) - consider main switch upgrade`);
  }
  if (l2Total > phaseOverloadThreshold) {
    recommendations.push(`L2 phase heavily loaded (${l2Total.toFixed(1)}A) - consider main switch upgrade`);
  }
  if (l3Total > phaseOverloadThreshold) {
    recommendations.push(`L3 phase heavily loaded (${l3Total.toFixed(1)}A) - consider main switch upgrade`);
  }

  // Suggest specific circuit relocations if imbalance is high
  if (imbalance > 15 && circuits.length >= 3) {
    recommendations.push('💡 Rebalancing suggestion: Move largest circuits to underloaded phases');
  }

  return {
    l1Total: Number(l1Total.toFixed(2)),
    l2Total: Number(l2Total.toFixed(2)),
    l3Total: Number(l3Total.toFixed(2)),
    imbalance: Number(imbalance.toFixed(2)),
    compliant,
    recommendations,
    circuitAllocation,
    totalLoad: Number(average.toFixed(2))
  };
}

// Optimize load balancing by trying different combinations
export function optimizeLoadBalance(circuits: CircuitLoad[]): LoadBalancingResult {
  // For small numbers of circuits, try all permutations
  // For larger numbers, use the greedy algorithm above
  
  if (circuits.length <= 6) {
    // Try multiple allocation strategies and pick the best
    let bestResult = balanceThreePhaseLoad(circuits);
    
    // Try sorting by different criteria
    const strategies = [
      (a: CircuitLoad, b: CircuitLoad) => b.designCurrent - a.designCurrent, // Largest first
      (a: CircuitLoad, b: CircuitLoad) => a.designCurrent - b.designCurrent, // Smallest first
      (a: CircuitLoad, b: CircuitLoad) => Math.random() - 0.5 // Random (try a few times)
    ];

    strategies.forEach(sortFn => {
      const sorted = [...circuits].sort(sortFn);
      const result = balanceThreePhaseLoad(sorted);
      if (result.imbalance < bestResult.imbalance) {
        bestResult = result;
      }
    });

    return bestResult;
  }

  return balanceThreePhaseLoad(circuits);
}

// Calculate neutral current (important for three-phase systems)
export function calculateNeutralCurrent(
  l1Current: number,
  l2Current: number,
  l3Current: number
): number {
  // For balanced loads, neutral current is zero
  // For unbalanced loads, neutral carries the difference
  // Simplified calculation (actual calculation involves phase angles)
  
  const avgCurrent = (l1Current + l2Current + l3Current) / 3;
  const imbalance = Math.max(
    Math.abs(l1Current - avgCurrent),
    Math.abs(l2Current - avgCurrent),
    Math.abs(l3Current - avgCurrent)
  );
  
  // Neutral current is approximately equal to the maximum imbalance
  return Number(imbalance.toFixed(2));
}
