// RCD Selectivity & Discrimination Analysis
// BS 7671:2018+A3:2024 - Regulation 531.2.9

export interface ProtectiveDevice {
  type: 'MCB' | 'RCBO' | 'RCD' | 'fuse' | 'MCCB';
  rating: number; // A
  curve?: 'B' | 'C' | 'D';
  rcdRating?: number; // mA (30, 100, 300)
  rcdType?: 'AC' | 'A' | 'B' | 'F';
  timeDelayed?: boolean;
  tripTime?: number; // ms
  breakingCapacity?: number; // kA
}

export interface DiscriminationAnalysis {
  upstreamDevice: ProtectiveDevice;
  downstreamDevice: ProtectiveDevice;
  discrimination: 'selective' | 'non-selective' | 'time-delayed' | 'partial';
  compliant: boolean;
  recommendations: string[];
  regulationReferences: string[];
}

/**
 * Check RCD discrimination (BS 7671 531.2.9)
 * Ensures that downstream RCDs trip before upstream devices
 */
export function checkRCDDiscrimination(
  upstreamRCD: ProtectiveDevice,
  downstreamRCD: ProtectiveDevice
): DiscriminationAnalysis {
  const recommendations: string[] = [];
  const regulationReferences: string[] = ['BS 7671 Reg 531.2.9'];
  
  let discrimination: DiscriminationAnalysis['discrimination'] = 'selective';
  let compliant = true;

  // Check if both devices have RCD functionality
  if (!upstreamRCD.rcdRating || !downstreamRCD.rcdRating) {
    return {
      upstreamDevice: upstreamRCD,
      downstreamDevice: downstreamRCD,
      discrimination: 'non-selective',
      compliant: false,
      recommendations: ['One or both devices do not have RCD protection'],
      regulationReferences: []
    };
  }

  // Rule 1: Downstream RCD must have lower rating
  if (downstreamRCD.rcdRating >= upstreamRCD.rcdRating) {
    discrimination = 'non-selective';
    compliant = false;
    recommendations.push(
      `❌ Downstream RCD (${downstreamRCD.rcdRating}mA) must have lower sensitivity than upstream (${upstreamRCD.rcdRating}mA)`
    );
  }

  // Rule 2: Time discrimination (if applicable)
  if (upstreamRCD.timeDelayed && !downstreamRCD.timeDelayed) {
    discrimination = 'time-delayed';
    recommendations.push(
      '✅ Time-delayed upstream RCD provides good discrimination'
    );
  } else if (!upstreamRCD.timeDelayed && !downstreamRCD.timeDelayed) {
    // Both instantaneous - check rating ratio
    const ratio = upstreamRCD.rcdRating / downstreamRCD.rcdRating;
    if (ratio < 3) {
      discrimination = 'partial';
      recommendations.push(
        `⚠️ RCD ratio (${ratio.toFixed(1)}:1) is low - recommend 3:1 or greater for reliable discrimination`
      );
    }
  }

  // Rule 3: Common configurations
  if (downstreamRCD.rcdRating === 30 && upstreamRCD.rcdRating === 100) {
    recommendations.push(
      '✅ Standard 30mA/100mA split-load configuration - good discrimination'
    );
    regulationReferences.push('BS 7671 Reg 411.3.3');
  }

  if (downstreamRCD.rcdRating === 30 && upstreamRCD.rcdRating === 300) {
    recommendations.push(
      '✅ 30mA/300mA configuration provides excellent discrimination'
    );
  }

  // Rule 4: Type compatibility
  if (upstreamRCD.rcdType && downstreamRCD.rcdType) {
    if (upstreamRCD.rcdType !== downstreamRCD.rcdType) {
      recommendations.push(
        `ℹ️ RCD types differ (upstream: ${upstreamRCD.rcdType}, downstream: ${downstreamRCD.rcdType}) - ensure compatibility`
      );
    }
  }

  return {
    upstreamDevice: upstreamRCD,
    downstreamDevice: downstreamRCD,
    discrimination,
    compliant,
    recommendations,
    regulationReferences
  };
}

/**
 * Check MCB/RCBO discrimination
 * Ensures upstream device has higher rating for cascading protection
 */
export function checkOvercurrentDiscrimination(
  upstreamDevice: ProtectiveDevice,
  downstreamDevice: ProtectiveDevice
): DiscriminationAnalysis {
  const recommendations: string[] = [];
  const regulationReferences: string[] = ['BS 7671 Reg 536.4'];
  
  let discrimination: DiscriminationAnalysis['discrimination'] = 'selective';
  let compliant = true;

  // Rule 1: Upstream must have higher rating
  if (upstreamDevice.rating <= downstreamDevice.rating) {
    discrimination = 'non-selective';
    compliant = false;
    recommendations.push(
      `❌ Upstream device (${upstreamDevice.rating}A) must be rated higher than downstream (${downstreamDevice.rating}A)`
    );
  }

  // Rule 2: Check breaking capacity
  if (upstreamDevice.breakingCapacity && downstreamDevice.breakingCapacity) {
    if (upstreamDevice.breakingCapacity < downstreamDevice.breakingCapacity) {
      recommendations.push(
        `⚠️ Upstream breaking capacity (${upstreamDevice.breakingCapacity}kA) lower than downstream (${downstreamDevice.breakingCapacity}kA)`
      );
    }
  }

  // Rule 3: Curve type considerations
  if (upstreamDevice.curve && downstreamDevice.curve) {
    const curveOrder = { B: 1, C: 2, D: 3 };
    const upstreamCurveValue = curveOrder[upstreamDevice.curve];
    const downstreamCurveValue = curveOrder[downstreamDevice.curve];

    if (upstreamCurveValue < downstreamCurveValue) {
      recommendations.push(
        `⚠️ Upstream curve (${upstreamDevice.curve}) more sensitive than downstream (${downstreamDevice.curve}) - may cause nuisance tripping`
      );
    }
  }

  // Rule 4: Rating ratio for good discrimination
  const ratio = upstreamDevice.rating / downstreamDevice.rating;
  if (ratio < 1.6) {
    discrimination = 'partial';
    recommendations.push(
      `⚠️ Low rating ratio (${ratio.toFixed(1)}:1) - recommend 1.6:1 or greater for reliable discrimination`
    );
  } else {
    recommendations.push(
      `✅ Good rating ratio (${ratio.toFixed(1)}:1) for discrimination`
    );
  }

  return {
    upstreamDevice,
    downstreamDevice,
    discrimination,
    compliant,
    recommendations,
    regulationReferences
  };
}

/**
 * Analyze complete discrimination for a protection scheme
 */
export function analyzeProtectionScheme(devices: {
  mainSwitch: ProtectiveDevice;
  upstreamRCD?: ProtectiveDevice;
  circuitProtection: ProtectiveDevice[];
}): {
  overallCompliant: boolean;
  analyses: DiscriminationAnalysis[];
  summary: string[];
} {
  const analyses: DiscriminationAnalysis[] = [];
  const summary: string[] = [];

  // Check each circuit protection against upstream RCD (if present)
  if (devices.upstreamRCD) {
    devices.circuitProtection.forEach(circuit => {
      // Check RCD discrimination if circuit has RCD
      if (circuit.rcdRating) {
        const rcdAnalysis = checkRCDDiscrimination(devices.upstreamRCD!, circuit);
        analyses.push(rcdAnalysis);
      }

      // Check overcurrent discrimination
      const overCurrentAnalysis = checkOvercurrentDiscrimination(devices.upstreamRCD!, circuit);
      analyses.push(overCurrentAnalysis);
    });
  }

  // Check against main switch
  devices.circuitProtection.forEach(circuit => {
    const mainSwitchAnalysis = checkOvercurrentDiscrimination(devices.mainSwitch, circuit);
    analyses.push(mainSwitchAnalysis);
  });

  // Generate summary
  const nonCompliantCount = analyses.filter(a => !a.compliant).length;
  const overallCompliant = nonCompliantCount === 0;

  if (overallCompliant) {
    summary.push('✅ All protection devices properly coordinated');
  } else {
    summary.push(`❌ ${nonCompliantCount} discrimination issue(s) found`);
  }

  // Count discrimination types
  const selectiveCount = analyses.filter(a => a.discrimination === 'selective').length;
  const partialCount = analyses.filter(a => a.discrimination === 'partial').length;
  const nonSelectiveCount = analyses.filter(a => a.discrimination === 'non-selective').length;

  summary.push(`Selective: ${selectiveCount}, Partial: ${partialCount}, Non-selective: ${nonSelectiveCount}`);

  return {
    overallCompliant,
    analyses,
    summary
  };
}
