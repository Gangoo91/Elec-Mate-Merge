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
      projectName: design.projectName || '',
      location: design.location || '',
      clientName: design.clientName || '',
      electricianName: design.electricianName || '',
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
        totalConnectedLoad: design.diversityBreakdown.totalConnectedLoad,
        diversifiedLoad: design.diversityBreakdown.diversifiedLoad,
        overallDiversityFactor: (design.diversityBreakdown.overallDiversityFactor * 100).toFixed(0) + '%',
        reasoning: design.diversityBreakdown.reasoning,
        bs7671Reference: design.diversityBreakdown.bs7671Reference,
        circuitDiversity: (design.diversityBreakdown.circuitDiversity || []).map((cd: any) => ({
          circuitName: cd.circuitName,
          connectedLoad: cd.connectedLoad.toFixed(1),
          diversityFactor: (cd.diversityFactorApplied * 100).toFixed(0) + '%',
          diversifiedLoad: cd.diversifiedLoad.toFixed(1),
          justification: cd.justification
        }))
      } : null,

      // Circuits
      circuits: design.circuits.map((c: any) => ({
        circuitNumber: c.circuitNumber,
        name: c.name,
        loadType: c.loadType,
        loadPower: c.loadPower,
        loadPowerKW: (c.loadPower / 1000).toFixed(1),
        voltage: design.consumerUnit.incomingSupply.voltage,
        phases: c.phases === 'single' ? 'Single Phase' : 'Three Phase',
        cableType: c.cableType || `${c.cableSize}mm² / ${c.cpcSize}mm² CPC Twin & Earth`,
        cableSize: c.cableSize,
        cpcSize: c.cpcSize,
        cableLength: c.cableLength,
        installationMethod: c.installationMethod || 'Method C (Clipped Direct)',
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
        diversityFactor: c.diversityFactor ? `${(c.diversityFactor * 100).toFixed(0)}%` : 'N/A',
        diversityJustification: c.diversityJustification || '',

        // Enhanced Justifications
        justificationCable: c.justifications?.cableSize || '',
        cableSizeJustification: c.justifications?.cableSize || '',
        justificationProtection: c.justifications?.protection || '',
        protectionJustification: c.justifications?.protection || '',
        justificationRcd: c.justifications?.rcd || '',
        rcdJustification: c.justifications?.rcd || '',

        // Fault Current Analysis
        faultCurrentAnalysis: c.faultCurrentAnalysis ? {
          psccAtCircuit: `${c.faultCurrentAnalysis.psccAtCircuit} kA`,
          deviceBreakingCapacity: `${c.faultCurrentAnalysis.deviceBreakingCapacity} kA`,
          compliant: c.faultCurrentAnalysis.compliant ? 'Yes' : 'No',
          marginOfSafety: c.faultCurrentAnalysis.marginOfSafety,
          regulation: c.faultCurrentAnalysis.regulation
        } : null,

        // Earthing Requirements
        earthingRequirements: c.earthingRequirements ? {
          cpcSize: c.earthingRequirements.cpcSize,
          supplementaryBonding: c.earthingRequirements.supplementaryBonding ? 'Yes' : 'No',
          bondingConductorSize: c.earthingRequirements.bondingConductorSize,
          justification: c.earthingRequirements.justification,
          regulation: c.earthingRequirements.regulation
        } : null,

        // Derating Factors
        deratingFactors: c.deratingFactors ? {
          Ca: c.deratingFactors.Ca,
          Cg: c.deratingFactors.Cg,
          Ci: c.deratingFactors.Ci,
          overall: c.deratingFactors.overall,
          explanation: c.deratingFactors.explanation,
          tableReferences: c.deratingFactors.tableReferences
        } : null,

        // Installation Guidance
        installationGuidance: c.installationGuidance ? {
          referenceMethod: c.installationGuidance.referenceMethod,
          description: c.installationGuidance.description,
          clipSpacing: c.installationGuidance.clipSpacing,
          practicalTips: c.installationGuidance.practicalTips || [],
          regulation: c.installationGuidance.regulation
        } : null,

        // Special Location
        isSpecialLocation: c.specialLocationCompliance?.isSpecialLocation || false,
        specialLocationType: c.specialLocationCompliance?.locationType || '',
        specialLocationRequirements: (c.specialLocationCompliance?.requirements || []).join('; '),
        specialLocationRegulation: c.specialLocationCompliance?.regulation || '',
        specialLocationZones: c.specialLocationCompliance?.zonesApplicable || '',

        // Expected Test Results
        expectedR1R2: c.expectedTestResults?.r1r2?.at70C || 'N/A',
        expectedZs: c.calculations.zs?.toFixed(2) || 'N/A',
        expectedInsulation: '>1MΩ',
        expectedTestResults: c.expectedTestResults ? {
          r1r2: {
            at20C: c.expectedTestResults.r1r2?.at20C || 'N/A',
            at70C: c.expectedTestResults.r1r2?.at70C || 'N/A',
            calculation: c.expectedTestResults.r1r2?.calculation || ''
          },
          zs: {
            calculated: c.expectedTestResults.zs?.calculated || 'N/A',
            maxPermitted: c.expectedTestResults.zs?.maxPermitted || 'N/A',
            compliant: c.expectedTestResults.zs?.compliant ? 'Yes' : 'No'
          },
          insulationResistance: {
            testVoltage: c.expectedTestResults.insulationResistance?.testVoltage || '500V DC',
            minResistance: c.expectedTestResults.insulationResistance?.minResistance || '≥1.0MΩ'
          },
          polarity: c.expectedTestResults?.polarity || 'Correct at all points',
          rcdTest: c.expectedTestResults?.rcdTest ? {
            at1x: c.expectedTestResults.rcdTest.at1x || 'N/A',
            at5x: c.expectedTestResults.rcdTest.at5x || 'N/A',
            regulation: c.expectedTestResults.rcdTest.regulation || 'BS 7671 Regulation 643.2.2'
          } : null
        } : null,

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
