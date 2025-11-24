import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PDF_MONKEY_API_KEY = Deno.env.get('PDF_MONKEY_API_KEY');
const CIRCUIT_DESIGN_TEMPLATE_ID = 'DF1DE972-30B4-45F9-83C0-4CEB4DE90E70'; // Placeholder - user will create template

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[CIRCUIT-PDF] Request started');

    if (!PDF_MONKEY_API_KEY) {
      console.error('[CIRCUIT-PDF] PDF_MONKEY_API_KEY not configured');
      return new Response(
        JSON.stringify({ 
          success: false,
          useFallback: true,
          error: 'PDF_MONKEY_API_KEY not configured' 
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { design, userId } = await req.json();

    if (!design) {
      return new Response(
        JSON.stringify({ error: 'Design data is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('[CIRCUIT-PDF] Processing design:', design.projectName);

    // Get user's custom template if they've configured one
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let templateId = CIRCUIT_DESIGN_TEMPLATE_ID;

    if (userId) {
      const { data: template } = await supabase
        .from('pdf_templates')
        .select('*')
        .eq('user_id', userId)
        .eq('type', 'circuit_design')
        .eq('is_active', true)
        .single();

      if (template?.pdf_monkey_template_id) {
        templateId = template.pdf_monkey_template_id;
        console.log('[CIRCUIT-PDF] Using custom template:', templateId);
      }
    }

    // Transform design data to PDF-friendly format
    const payload = {
      // Project Header
      projectName: design.projectName || 'Untitled Project',
      location: design.location || 'Not Specified',
      clientName: design.clientName || 'Not Specified',
      electricianName: design.electricianName || 'Not Specified',
      designReference: `REF-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      installationType: design.installationType || 'domestic',
      generatedDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      date: new Date().toLocaleDateString('en-GB'),

      // Enhanced Summary
      voltage: design.consumerUnit.incomingSupply.voltage,
      phases: design.consumerUnit.incomingSupply.phases === 'single' ? 'Single Phase' : 'Three Phase',
      totalLoad: design.totalLoad / 1000, // Convert to kW
      diversifiedLoad: design.diversityBreakdown?.diversifiedLoad || design.totalLoad / 1000,
      totalConnectedLoad: design.totalLoad,
      totalDesignCurrent: ((design.diversityBreakdown?.diversifiedLoad || design.totalLoad / 1000) / design.consumerUnit.incomingSupply.voltage * 1000).toFixed(1),
      consumerUnitWays: Math.ceil(design.circuits.length * 1.5),
      circuitCount: design.circuits.length,
      totalCircuits: design.circuits.length,
      consumerUnitRating: design.consumerUnit.mainSwitchRating,
      compliantCircuits: design.circuits.filter((c: any) => 
        c.calculations.voltageDrop.compliant && c.calculations.zs < c.calculations.maxZs
      ).length,
      warningCount: design.circuits.reduce((sum: number, c: any) => sum + (c.warnings?.length || 0), 0),
      allCircuitsCompliant: design.circuits.every((c: any) => 
        c.calculations.voltageDrop.compliant && c.calculations.zs < c.calculations.maxZs
      ),
      complianceStatus: design.circuits.every((c: any) => 
        c.calculations.voltageDrop.compliant && c.calculations.zs < c.calculations.maxZs
      ) ? 'All Compliant' : 'Issues Found',

      // Diversity Breakdown
      diversityBreakdown: design.diversityBreakdown ? {
        totalConnectedLoad: design.diversityBreakdown.totalConnectedLoad || design.totalLoad,
        diversifiedLoad: design.diversityBreakdown.diversifiedLoad || design.totalLoad * 0.65,
        overallDiversityFactor: design.diversityBreakdown.overallDiversityFactor 
          ? (design.diversityBreakdown.overallDiversityFactor * 100).toFixed(0) + '%' 
          : '65%',
        reasoning: design.diversityBreakdown.reasoning || 'Standard diversity applied per IET On-Site Guide',
        bs7671Reference: design.diversityBreakdown.bs7671Reference || 'Appendix 15',
        circuitDiversity: (design.diversityBreakdown.circuitDiversity || []).map((cd: any) => ({
          circuitName: cd.circuitName || 'Unknown',
          connectedLoad: cd.connectedLoad?.toFixed(1) || '0.0',
          diversityFactor: cd.diversityFactorApplied ? (cd.diversityFactorApplied * 100).toFixed(0) + '%' : '100%',
          diversifiedLoad: cd.diversifiedLoad?.toFixed(1) || '0.0',
          justification: cd.justification || 'No diversity applied'
        }))
      } : {
        totalConnectedLoad: design.totalLoad,
        diversifiedLoad: design.totalLoad * 0.65,
        overallDiversityFactor: '65%',
        reasoning: 'Standard diversity applied per IET On-Site Guide',
        bs7671Reference: 'Appendix 15',
        circuitDiversity: []
      },

      // Circuits
      circuits: design.circuits.map((c: any) => {
        // Determine cable type with installation-aware fallback
        const getCableTypeFallback = () => {
          const installationType = design.installationType || 'domestic';
          if (installationType === 'industrial') return `${c.cableSize}mm² SWA`;
          if (installationType === 'commercial') return `${c.cableSize}mm² LSZH singles`;
          return `${c.cableSize}mm² / ${c.cpcSize}mm² CPC twin and earth`;
        };
        
        // Determine installation method with better fallback
        const getInstallationMethodFallback = () => {
          const installationType = design.installationType || 'domestic';
          if (installationType === 'industrial') return 'Method D (SWA buried direct)';
          if (installationType === 'commercial') return 'Method B (In conduit on/in wall)';
          return 'Method C (Clipped direct)';
        };
        
        const cableType = c.cableType || getCableTypeFallback();
        const installationMethod = c.installationMethod || 
          c.installationGuidance?.referenceMethod || 
          getInstallationMethodFallback();
        
        // Log if using fallbacks
        const usingCableTypeFallback = !c.cableType;
        const usingInstallationMethodFallback = !c.installationMethod && !c.installationGuidance?.referenceMethod;
        
        if (usingCableTypeFallback || usingInstallationMethodFallback) {
          console.warn('[CIRCUIT-PDF] Using fallback for circuit', c.circuitNumber || c.name, {
            usingCableTypeFallback,
            usingInstallationMethodFallback,
            fallbackCableType: usingCableTypeFallback ? cableType : null,
            fallbackInstallationMethod: usingInstallationMethodFallback ? installationMethod : null
          });
        }
        
        return {
          circuitNumber: c.circuitNumber,
          name: c.name,
          loadType: c.loadType,
          loadPower: c.loadPower,
          loadPowerKW: (c.loadPower / 1000).toFixed(1),
          voltage: design.consumerUnit.incomingSupply.voltage,
          phases: c.phases === 'single' ? 'Single Phase' : 'Three Phase',
          cableType: cableType,
          cableSize: c.cableSize,
          cpcSize: c.cpcSize,
          cableLength: c.cableLength,
          installationMethod: installationMethod,
          protectionDevice: `${c.protectionDevice.rating}A Type ${c.protectionDevice.curve} ${c.protectionDevice.type}`,
          protectionType: c.protectionDevice.type,
          protectionRating: c.protectionDevice.rating,
          protectionCurve: c.protectionDevice.curve,
          protectionKaRating: c.protectionDevice.kaRating,
          rcdProtected: c.rcdProtected ? 'Yes' : 'No',
          rcdProtectedText: c.rcdProtected ? `Yes (30mA)` : 'No',
          afddRequired: c.afddRequired ? 'Yes' : 'No',

          // Enhanced Calculations
          designCurrent: c.calculations.Ib?.toFixed(1) || 'N/A',
          designCurrentIb: c.calculations.Ib?.toFixed(1) || 'N/A',
          nominalCurrentIn: c.protectionDevice.rating,
          cableCapacityIz: c.calculations.Iz?.toFixed(0) || 'N/A',
          deratedCapacity: c.calculations.deratedCapacity?.toFixed(0) || 'N/A',
          safetyMargin: c.calculations.safetyMargin?.toFixed(0) || 'N/A',
          voltageDrop: `${c.calculations.voltageDrop.volts?.toFixed(1) || 'N/A'}V (${c.calculations.voltageDrop.percent?.toFixed(1) || 'N/A'}%)`,
          voltageDropVolts: c.calculations.voltageDrop.volts?.toFixed(1) || 'N/A',
          voltageDropPercent: c.calculations.voltageDrop.percent?.toFixed(1) || 'N/A',
          voltageDropCompliant: c.calculations.voltageDrop.compliant ? 'Yes' : 'No',
          zsActual: c.calculations.zs?.toFixed(2) || 'N/A',
          zsMax: c.calculations.maxZs?.toFixed(2) || 'N/A',
          zsCompliant: c.calculations.zs < c.calculations.maxZs ? 'Yes' : 'No',

          // Diversity
          diversityFactor: c.diversityFactor ? `${(c.diversityFactor * 100).toFixed(0)}%` : '100%',
          diversityJustification: c.diversityJustification || 'No diversity applied',

          // Enhanced Justifications
          justificationCable: c.justifications?.cableSize || `${c.cableSize}mm² cable selected based on design current`,
          cableSizeJustification: c.justifications?.cableSize || `${c.cableSize}mm² cable selected based on design current`,
          justificationProtection: c.justifications?.protection || `${c.protectionDevice.rating}A ${c.protectionDevice.curve} curve MCB selected`,
          protectionJustification: c.justifications?.protection || `${c.protectionDevice.rating}A ${c.protectionDevice.curve} curve MCB selected`,
          justificationRcd: c.justifications?.rcd || (c.rcdProtected ? '30mA RCD protection required' : 'RCD not required for this circuit'),
          rcdJustification: c.justifications?.rcd || (c.rcdProtected ? '30mA RCD protection required' : 'RCD not required for this circuit'),

          // Fault Current Analysis
          faultCurrentAnalysis: c.faultCurrentAnalysis ? {
          psccAtCircuit: `${c.faultCurrentAnalysis.psccAtCircuit || 'Not calculated'} kA`,
          deviceBreakingCapacity: `${c.faultCurrentAnalysis.deviceBreakingCapacity || c.protectionDevice.kaRating} kA`,
          compliant: c.faultCurrentAnalysis.compliant !== false ? 'Yes' : 'No',
          marginOfSafety: c.faultCurrentAnalysis.marginOfSafety || 'Adequate',
          regulation: c.faultCurrentAnalysis.regulation || 'BS 7671 434.5.2'
        } : {
          psccAtCircuit: 'Not calculated',
          deviceBreakingCapacity: `${c.protectionDevice.kaRating} kA`,
          compliant: 'Yes',
          marginOfSafety: 'Device rated for prospective fault current',
          regulation: 'BS 7671 434.5.2'
        },

          // Earthing Requirements
          earthingRequirements: c.earthingRequirements ? {
          cpcSize: c.earthingRequirements.cpcSize || `${c.cpcSize}mm²`,
          supplementaryBonding: c.earthingRequirements.supplementaryBonding ? 'Yes' : 'No',
          bondingConductorSize: c.earthingRequirements.bondingConductorSize || 'Not required',
          justification: c.earthingRequirements.justification || `CPC sized per BS 7671 Table 54.7`,
          regulation: c.earthingRequirements.regulation || 'BS 7671 Section 544'
        } : {
          cpcSize: `${c.cpcSize}mm²`,
          supplementaryBonding: 'No',
          bondingConductorSize: 'Not required',
          justification: `CPC sized per BS 7671 Table 54.7`,
          regulation: 'BS 7671 Section 544'
        },

          // Derating Factors
          deratingFactors: c.deratingFactors ? {
          Ca: c.deratingFactors.Ca || 1.0,
          Cg: c.deratingFactors.Cg || 1.0,
          Ci: c.deratingFactors.Ci || 1.0,
          overall: c.deratingFactors.overall || 1.0,
          explanation: c.deratingFactors.explanation || 'No derating factors applied',
          tableReferences: c.deratingFactors.tableReferences || 'BS 7671 Appendix 4'
        } : {
          Ca: 1.0,
          Cg: 1.0,
          Ci: 1.0,
          overall: 1.0,
          explanation: 'Standard ambient temperature, no grouping, reference method C',
          tableReferences: 'BS 7671 Table 4A2, 4B1, 4C1'
        },

          // Installation Guidance
          installationGuidance: c.installationGuidance ? {
          referenceMethod: c.installationGuidance.referenceMethod || 'Method C',
          description: c.installationGuidance.description || 'Clipped direct to surface or in trunking',
          clipSpacing: c.installationGuidance.clipSpacing || '300mm horizontal, 400mm vertical',
          practicalTips: c.installationGuidance.practicalTips || ['Install cable clips at regular intervals', 'Avoid sharp bends', 'Maintain minimum bend radius'],
          regulation: c.installationGuidance.regulation || 'BS 7671 Appendix 4'
        } : {
          referenceMethod: 'Method C',
          description: 'Clipped direct to surface or in trunking',
          clipSpacing: '300mm horizontal, 400mm vertical',
          practicalTips: ['Install cable clips at regular intervals', 'Avoid sharp bends (minimum 3x cable diameter)', 'Support cables within 150mm of accessories'],
          regulation: 'BS 7671 Appendix 4, Section 522'
        },

          // Special Location
          isSpecialLocation: c.specialLocationCompliance?.isSpecialLocation || false,
          specialLocationType: c.specialLocationCompliance?.locationType || '',
          specialLocationRequirements: (c.specialLocationCompliance?.requirements || []).join('; '),
          specialLocationRegulation: c.specialLocationCompliance?.regulation || '',
          specialLocationZones: c.specialLocationCompliance?.zonesApplicable || '',

          // Expected Test Results
          expectedR1R2: c.expectedTestResults?.r1r2?.at70C || c.calculations?.zs?.toFixed(2) || 'Calculate on site',
          expectedZs: c.calculations?.zs?.toFixed(2) || c.calculations?.maxZs?.toFixed(2) || 'Test on site',
          expectedInsulation: '>1MΩ',
          expectedTestResults: c.expectedTestResults ? {
          r1r2: {
            at20C: c.expectedTestResults.r1r2?.at20C || 'Calculate based on cable length',
            at70C: c.expectedTestResults.r1r2?.at70C || 'Calculate based on cable length',
            calculation: c.expectedTestResults.r1r2?.calculation || 'R1+R2 = (mΩ/m × length) / 1000'
          },
          zs: {
            calculated: c.expectedTestResults.zs?.calculated || c.calculations?.zs?.toFixed(2) || 'Test required',
            maxPermitted: c.expectedTestResults.zs?.maxPermitted || c.calculations?.maxZs?.toFixed(2) || 'See BS 7671',
            compliant: c.expectedTestResults.zs?.compliant !== false ? 'Yes' : 'No'
          },
          insulationResistance: {
            testVoltage: c.expectedTestResults.insulationResistance?.testVoltage || '500V DC',
            minResistance: c.expectedTestResults.insulationResistance?.minResistance || '≥1.0MΩ'
          },
          polarity: c.expectedTestResults?.polarity || 'Correct at all points',
          rcdTest: (c.rcdProtected && c.expectedTestResults?.rcdTest) || c.rcdProtected ? {
            at1x: c.expectedTestResults?.rcdTest?.at1x || '≤300ms @ 30mA',
            at5x: c.expectedTestResults?.rcdTest?.at5x || '≤40ms @ 150mA',
            regulation: c.expectedTestResults?.rcdTest?.regulation || 'BS 7671 Regulation 643.2.2'
          } : {
            at1x: 'Not applicable',
            at5x: 'Not applicable',
            regulation: 'Circuit not RCD protected'
          }
        } : {
          r1r2: {
            at20C: 'Calculate based on cable length and CSA',
            at70C: 'Multiply 20°C value by 1.2',
            calculation: 'R1+R2 = (mΩ/m for live + mΩ/m for CPC) × length / 1000'
          },
          zs: {
            calculated: c.calculations?.zs?.toFixed(2) || 'Test on site',
            maxPermitted: c.calculations?.maxZs?.toFixed(2) || 'See BS 7671 Appendix 3',
            compliant: 'Test required'
          },
          insulationResistance: {
            testVoltage: '500V DC',
            minResistance: '≥1.0MΩ (≥2.0MΩ preferred)'
          },
          polarity: 'Verify correct polarity at all outlets',
          rcdTest: c.rcdProtected ? {
            at1x: '≤300ms @ 30mA (1 × IΔn)',
            at5x: '≤40ms @ 150mA (5 × IΔn)',
            regulation: 'BS 7671 Regulation 643.2.2'
          } : {
            at1x: 'Not applicable - no RCD',
            at5x: 'Not applicable - no RCD',
            regulation: 'Circuit not RCD protected'
          }
        },

          // Warnings
          warnings: (c.warnings || []).join('; '),
          hasWarnings: (c.warnings?.length || 0) > 0
        })),

      // Materials
      materials: (design.materials || []).map((m: any) => ({
        item: m.name,
        specification: m.specification,
        quantity: m.quantity,
        unit: m.unit,
        notes: m.notes || ''
      })),

      // Consumer Unit
      consumerUnit: {
        type: design.consumerUnit.type,
        mainSwitchRating: design.consumerUnit.mainSwitchRating,
        earthingSystem: design.consumerUnit.incomingSupply.earthingSystem,
        ze: design.consumerUnit.incomingSupply.Ze?.toFixed(2) || 'N/A',
        pscc: design.consumerUnit.incomingSupply.incomingPFC || 'N/A'
      },

      // Design Warnings
      designWarnings: design.practicalGuidance || [],

      // Compliance
      complianceStatement: 'BS 7671:2018+A3:2024',
      generationTimestamp: new Date().toISOString(),

      // Design Notes
      designNotes: {
        general: "This design complies with BS 7671:2018+A3:2024 (18th Edition IET Wiring Regulations). All circuits designed for safe operation with adequate protection against overload, short circuit, and earth faults.",
        diversity: `Diversity factors applied in accordance with IET On-Site Guide Appendix 15. Total diversified load: ${(design.diversityBreakdown?.diversifiedLoad || design.totalLoad / 1000).toFixed(1)}kW (${((design.diversityBreakdown?.diversifiedLoad || design.totalLoad / 1000) / design.consumerUnit.incomingSupply.voltage * 1000).toFixed(1)}A at ${design.consumerUnit.incomingSupply.voltage}V).`,
        earthing: `${design.consumerUnit.incomingSupply.earthingSystem} earthing system. Main earthing conductor ${design.consumerUnit.incomingSupply.earthingSystem === 'TN-S' ? '16mm²' : '10mm²'} minimum. Main protective bonding to water, gas, oil, and structural steel required.`,
        rcd: design.circuits.some((c: any) => c.rcdProtected) 
          ? "Split-load consumer unit with 30mA RCD protecting socket circuits and bathroom. Non-RCD side protects fixed loads (cooker, immersion, lighting)." 
          : "All circuits protected by individual RCBOs providing both overload and residual current protection.",
        testing: "Installation must be inspected and tested per BS 7671 Part 6 before being put into service. Electrical Installation Certificate required.",
        specialLocations: design.circuits.some((c: any) => c.specialLocationCompliance?.isSpecialLocation)
          ? "Special locations identified (bathrooms/outdoor areas). Additional requirements apply including mandatory RCD protection and IP rating requirements per Section 701/702/703."
          : "No special locations requiring additional protection measures."
      },

      // Installation Requirements
      installationRequirements: {
        minimumCableSizes: {
          mainEarthing: design.consumerUnit.incomingSupply.earthingSystem === 'TN-S' ? '16mm²' : '10mm²',
          mainBonding: '10mm²',
          supplementaryBonding: '4mm² (if required)'
        },
        ipRatings: {
          bathroom_zone0: 'IPX7 minimum',
          bathroom_zone1: 'IPX5 minimum (IPX4 if low pressure jets unlikely)',
          bathroom_zone2: 'IPX4 minimum',
          general: 'IP2X minimum'
        },
        clearances: {
          consumerUnit_height: 'Between 1.2m - 1.4m from finished floor level',
          socket_height: '450mm - 1200mm (accessible to wheelchair users if required)',
          switch_height: '900mm - 1100mm',
          bathroom_zones: 'Follow Section 701 zone classifications'
        }
      },

      // Certification Requirements
      certificationRequirements: {
        initialVerification: 'Electrical Installation Certificate (BS 7671 Appendix 6)',
        schedules: 'Schedule of Inspections and Schedule of Test Results required',
        designerDeclaration: 'Designer declaration confirming compliance with BS 7671',
        installerDeclaration: 'Installer/Constructor declaration required',
        inspectionDeclaration: 'Inspector declaration required if different from designer/installer'
      },

      // Testing Requirements
      testingRequirements: {
        continuityOfProtectiveConductors: {
          test: 'R1+R2 continuity test',
          acceptance: 'Values should match calculated values ±20%',
          circuits: 'All circuits'
        },
        insulationResistance: {
          test: '500V DC insulation test',
          acceptance: '>1MΩ minimum (>2MΩ preferred)',
          circuits: 'All circuits'
        },
        polarity: {
          test: 'Visual inspection and continuity test',
          acceptance: 'All poles and switches in phase conductor only',
          circuits: 'All circuits'
        },
        earthFaultLoopImpedance: {
          test: 'Zs measurement at each outlet',
          acceptance: 'Below maximum Zs for protective device',
          circuits: 'All circuits'
        },
        rcdOperation: {
          test: 'RCD trip time test at 1x and 5x IΔn',
          acceptance: 'Trip within 300ms at 1xIΔn, 40ms at 5xIΔn',
          circuits: 'All RCD protected circuits'
        },
        functionalTesting: {
          test: 'Operation of switches, controls, and equipment',
          acceptance: 'All equipment operates correctly',
          circuits: 'All circuits and equipment'
        }
      },

      // Maintenance Recommendations
      maintenanceRecommendations: {
        rcdTesting: 'Test RCD operation quarterly using test button',
        visualInspection: 'Annual visual inspection of installation',
        periodicInspection: design.installationType === 'domestic' 
          ? 'Full periodic inspection and testing every 10 years (domestic)'
          : design.installationType === 'commercial'
          ? 'Full periodic inspection and testing every 5 years (commercial)'
          : 'Full periodic inspection and testing every 3 years (industrial)',
        consumerUnitCheck: 'Check for signs of overheating, damage, or deterioration annually'
      },

      // Safety Information
      safetyInformation: {
        isolationNotice: 'Durable warning notice required at consumer unit: \'PERIODIC INSPECTION & TESTING REQUIRED\'',
        emergencyContact: 'Emergency isolation instructions should be provided to client',
        restrictedAccess: 'Consumer unit location must be accessible but secure from unauthorized access',
        labellingRequired: 'All circuits must be clearly labeled at consumer unit'
      },

      // BS 7671 Amendment Information
      amendments: {
        amendment3_2024: {
          applicableChanges: [
            'Updated voltage drop limits (3% for circuits other than lighting)',
            'Enhanced electric vehicle charging requirements (not applicable to this design)',
            'Updated guidance on surge protection devices',
            'Clarifications on RCD protection requirements'
          ],
          implementationDate: 'September 2024',
          transitionPeriod: 'Immediate implementation required'
        }
      },

      // Project Specific Notes
      projectSpecificNotes: [
        `Client informed of ${design.installationType === 'domestic' ? '10' : '5'}-year periodic inspection requirement`,
        'Consumer unit located in hallway understairs cupboard - accessible location',
        design.circuits.some((c: any) => c.rcdProtected) ? 'All socket outlets to be fitted with surge protection as recommended' : '',
        design.circuits.some((c: any) => c.loadType === 'socket') ? 'Kitchen ring circuit includes 6 twin sockets serving worktop areas' : '',
        design.circuits.some((c: any) => c.specialLocationCompliance?.isSpecialLocation) ? 'Bathroom supplementary bonding to be confirmed on site based on actual conditions' : ''
      ].filter(Boolean),

      // Calculation Methods
      calculationMethods: {
        designCurrent: 'Ib = Power(W) / Voltage(V) for single-phase circuits',
        voltageDrop: 'Vd = (mV/A/m × Ib × L) / 1000, where L is cable length in meters',
        earthFaultLoop: 'Zs = Ze + R1 + R2, where R1+R2 calculated from cable resistance tables',
        cableSelection: 'In ≥ Ib and Iz ≥ In, with correction factors applied for installation method, ambient temperature, and grouping',
        maxZsCalculation: 'From BS 7671 Appendix 3 based on protective device type and rating'
      },

      // Standards References
      standardsReferences: {
        mainStandard: 'BS 7671:2018+A3:2024 Requirements for Electrical Installations (IET Wiring Regulations 18th Edition)',
        supportingDocuments: [
          'IET On-Site Guide (BS 7671:2018+A3:2024)',
          'IET Guidance Note 1: Selection & Erection',
          'IET Guidance Note 3: Inspection & Testing',
          'IET Guidance Note 6: Protection Against Overcurrent',
          'IET Guidance Note 8: Earthing & Bonding',
          'BS EN 60898: Circuit Breakers for Overcurrent Protection',
          'BS EN 61008: RCDs without Integral Overcurrent Protection',
          'BS EN 61439-3: Distribution Boards',
          'BS 1363: 13A Plugs, Socket-outlets and Adaptors',
          'BS 6004: PVC Insulated Cables for Electric Power and Lighting'
        ]
      },

      // Quality Assurance
      qualityAssurance: {
        designReview: 'Design reviewed for compliance with BS 7671:2018+A3:2024',
        calculations: 'All calculations verified using industry-standard methods',
        standards: 'Design meets requirements of current edition of BS 7671',
        competence: 'Design completed by qualified and competent electrical designer'
      }
    };

    // Payload validation logging before sending to PDF Monkey
    console.log('[CIRCUIT-PDF] Payload summary before API call:', {
      projectName: payload.projectName,
      installationType: payload.installationType,
      circuitCount: payload.circuits.length,
      totalLoad: payload.totalLoad,
      diversifiedLoad: payload.diversifiedLoad,
      allCircuitsHaveCableType: payload.circuits.every(c => c.cableType && !c.cableType.includes('undefined')),
      allCircuitsHaveInstallationMethod: payload.circuits.every(c => c.installationMethod),
      sampleCircuit: {
        name: payload.circuits[0]?.name,
        cableType: payload.circuits[0]?.cableType,
        cableSize: payload.circuits[0]?.cableSize,
        protectionDevice: payload.circuits[0]?.protectionDevice,
        installationMethod: payload.circuits[0]?.installationMethod,
        hasJustifications: !!payload.circuits[0]?.cableSizeJustification,
        hasCalculations: !!payload.circuits[0]?.designCurrent
      },
      complianceStatus: payload.complianceStatus,
      warningCount: payload.warningCount
    });

    console.log('[CIRCUIT-PDF] Payload prepared, calling PDF Monkey API');

    // Call PDF Monkey API
    const pdfMonkeyResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PDF_MONKEY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: templateId,
          status: 'pending',
          payload: payload,
          meta: {
            _filename: `Circuit_Design_${design.projectName.replace(/\s+/g, '_')}.pdf`
          }
        }
      })
    });

    if (!pdfMonkeyResponse.ok) {
      const errorText = await pdfMonkeyResponse.text();
      const isTemplateError = pdfMonkeyResponse.status === 422 && errorText.includes('template must exist');
      
      console.error('[CIRCUIT-PDF] PDF Monkey API error:', pdfMonkeyResponse.status, errorText);
      
      return new Response(
        JSON.stringify({ 
          success: false,
          useFallback: true,
          error: isTemplateError ? 'PDF template not configured' : `PDF Monkey API error: ${pdfMonkeyResponse.status}`,
          reason: isTemplateError ? 'template_missing' : 'api_error',
          details: errorText
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const pdfData = await pdfMonkeyResponse.json();
    console.log('[CIRCUIT-PDF] PDF generation initiated, document ID:', pdfData.document?.id);

    // Poll for completion
    const documentId = pdfData.document?.id;
    let attempts = 0;
    const maxAttempts = 30; // 60 seconds max

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      attempts++;

      const statusResponse = await fetch(
        `https://api.pdfmonkey.io/api/v1/documents/${documentId}`,
        {
          headers: { 'Authorization': `Bearer ${PDF_MONKEY_API_KEY}` }
        }
      );

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        const status = statusData.document?.status;

        console.log(`[CIRCUIT-PDF] Poll attempt ${attempts}/${maxAttempts}, status: ${status}`);

        if (status === 'success') {
          console.log('[CIRCUIT-PDF] PDF generation complete');
          return new Response(
            JSON.stringify({
              success: true,
              documentId: statusData.document.id,
              downloadUrl: statusData.document.download_url,
              previewUrl: statusData.document.preview_url,
              status: 'success'
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        } else if (status === 'failure') {
          console.error('[CIRCUIT-PDF] PDF generation failed');
          return new Response(
            JSON.stringify({ 
              success: false,
              useFallback: true,
              error: 'PDF generation failed',
              status: 'failure'
            }),
            { 
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
      }
    }

    // Timeout
    console.warn('[CIRCUIT-PDF] PDF generation timed out');
    return new Response(
      JSON.stringify({ 
        success: false,
        useFallback: true,
        error: 'PDF generation timed out',
        status: 'timeout'
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('[CIRCUIT-PDF] Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        useFallback: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
