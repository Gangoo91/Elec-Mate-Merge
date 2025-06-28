
export interface RealWorldCondition {
  name: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  adjustmentFactor: number;
  applicableCalculations: string[];
}

export interface RealWorldValidationResult {
  conditions: RealWorldCondition[];
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  practicalRecommendations: string[];
  fieldConsiderations: string[];
  installationNotes: string[];
}

export class RealWorldValidator {
  private static conditions: RealWorldCondition[] = [
    {
      name: 'High Ambient Temperature',
      description: 'Operating temperature above 30°C standard',
      impact: 'high',
      adjustmentFactor: 0.8,
      applicableCalculations: ['cable-sizing', 'current-capacity', 'derating']
    },
    {
      name: 'Cable Grouping',
      description: 'Multiple cables in close proximity',
      impact: 'medium',
      adjustmentFactor: 0.7,
      applicableCalculations: ['cable-sizing', 'current-capacity']
    },
    {
      name: 'Moisture Ingress Risk',
      description: 'Installation in damp or wet conditions',
      impact: 'high',
      adjustmentFactor: 0.9,
      applicableCalculations: ['cable-sizing', 'insulation-resistance']
    },
    {
      name: 'Vibration Environment',
      description: 'Installation subject to mechanical vibration',
      impact: 'medium',
      adjustmentFactor: 0.95,
      applicableCalculations: ['cable-sizing', 'mechanical-protection']
    },
    {
      name: 'Corrosive Atmosphere',
      description: 'Chemical or salt-laden environment',
      impact: 'critical',
      adjustmentFactor: 0.8,
      applicableCalculations: ['cable-sizing', 'material-selection']
    },
    {
      name: 'Emergency Lighting Circuit',
      description: 'Critical safety circuit requiring high reliability',
      impact: 'critical',
      adjustmentFactor: 0.8,
      applicableCalculations: ['cable-sizing', 'voltage-drop', 'backup-systems']
    },
    {
      name: 'Motor Starting Loads',
      description: 'High inrush current during motor starting',
      impact: 'high',
      adjustmentFactor: 0.7,
      applicableCalculations: ['cable-sizing', 'voltage-drop', 'protection']
    },
    {
      name: 'Harmonic Distortion',
      description: 'Non-linear loads causing harmonic currents',
      impact: 'medium',
      adjustmentFactor: 0.86,
      applicableCalculations: ['cable-sizing', 'neutral-sizing']
    }
  ];

  static validateRealWorldConditions(
    calculationType: string,
    ambientTemp: number,
    groupingFactor: number,
    loadType: string,
    installationEnvironment?: string
  ): RealWorldValidationResult {
    const applicableConditions: RealWorldCondition[] = [];
    const recommendations: string[] = [];
    const fieldConsiderations: string[] = [];
    const installationNotes: string[] = [];

    // Check temperature conditions
    if (ambientTemp > 30) {
      const tempCondition = this.conditions.find(c => c.name === 'High Ambient Temperature');
      if (tempCondition) {
        applicableConditions.push(tempCondition);
        recommendations.push(`Install additional ventilation or use higher-rated cables for ${ambientTemp}°C operation`);
        fieldConsiderations.push('Monitor cable temperatures during commissioning');
      }
    }

    // Check grouping conditions
    if (groupingFactor < 1.0) {
      const groupingCondition = this.conditions.find(c => c.name === 'Cable Grouping');
      if (groupingCondition) {
        applicableConditions.push(groupingCondition);
        recommendations.push('Consider cable separation or use of cable trays to improve heat dissipation');
        installationNotes.push('Maintain minimum spacing between cable groups where possible');
      }
    }

    // Check load type specific conditions
    if (loadType === 'inductive') {
      const motorCondition = this.conditions.find(c => c.name === 'Motor Starting Loads');
      if (motorCondition) {
        applicableConditions.push(motorCondition);
        recommendations.push('Consider soft-start devices or higher cable ratings for motor circuits');
        fieldConsiderations.push('Verify actual motor starting currents match design assumptions');
      }
    }

    if (loadType === 'non-linear') {
      const harmonicCondition = this.conditions.find(c => c.name === 'Harmonic Distortion');
      if (harmonicCondition) {
        applicableConditions.push(harmonicCondition);
        recommendations.push('Oversized neutral conductor and consider harmonic filters');
        installationNotes.push('Use cables rated for harmonic currents (K-factor rated)');
      }
    }

    // Environmental considerations based on installation type
    if (installationEnvironment) {
      if (installationEnvironment.includes('outdoor') || installationEnvironment.includes('damp')) {
        const moistureCondition = this.conditions.find(c => c.name === 'Moisture Ingress Risk');
        if (moistureCondition) {
          applicableConditions.push(moistureCondition);
          recommendations.push('Use IP-rated enclosures and moisture-resistant cable types');
          fieldConsiderations.push('Implement proper drainage and sealing methods');
        }
      }

      if (installationEnvironment.includes('industrial') || installationEnvironment.includes('chemical')) {
        const corrosiveCondition = this.conditions.find(c => c.name === 'Corrosive Atmosphere');
        if (corrosiveCondition) {
          applicableConditions.push(corrosiveCondition);
          recommendations.push('Specify corrosion-resistant materials and regular maintenance schedules');
          installationNotes.push('CRITICAL: Use only approved materials for chemical environments');
        }
      }
    }

    // Determine overall risk level
    let overallRisk: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (applicableConditions.some(c => c.impact === 'critical')) {
      overallRisk = 'critical';
    } else if (applicableConditions.some(c => c.impact === 'high')) {
      overallRisk = 'high';
    } else if (applicableConditions.some(c => c.impact === 'medium')) {
      overallRisk = 'medium';
    }

    // Add general field considerations
    fieldConsiderations.push(
      'Verify actual site conditions match design assumptions',
      'Conduct thermal imaging after commissioning',
      'Document any deviations from standard installation methods'
    );

    // Add installation best practices
    installationNotes.push(
      'Follow manufacturer installation guidelines',
      'Ensure proper earthing and bonding throughout',
      'Label all circuits clearly for future maintenance'
    );

    return {
      conditions: applicableConditions,
      overallRisk,
      practicalRecommendations: recommendations,
      fieldConsiderations,
      installationNotes
    };
  }

  static getInstallationGuidance(calculationType: string, conditions: RealWorldCondition[]): string[] {
    const guidance: string[] = [];

    if (conditions.length === 0) {
      guidance.push('Standard installation practices apply');
      guidance.push('Follow BS 7671 requirements for the installation method');
      return guidance;
    }

    const criticalConditions = conditions.filter(c => c.impact === 'critical');
    const highRiskConditions = conditions.filter(c => c.impact === 'high');

    if (criticalConditions.length > 0) {
      guidance.push('⚠️ CRITICAL CONDITIONS IDENTIFIED');
      guidance.push('Specialist consultation required before proceeding');
      guidance.push('Additional safety measures must be implemented');
    }

    if (highRiskConditions.length > 0) {
      guidance.push('High-risk conditions require additional precautions');
      guidance.push('Enhanced monitoring and maintenance schedules recommended');
    }

    // Specific guidance based on calculation type
    if (calculationType === 'cable-sizing') {
      guidance.push('Consider oversizing cables by one standard size for safety margin');
      guidance.push('Verify cable ratings under actual operating conditions');
      
      if (conditions.some(c => c.name.includes('Temperature'))) {
        guidance.push('Install temperature monitoring at critical points');
      }
    }

    return guidance;
  }
}
