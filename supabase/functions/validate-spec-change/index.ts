import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { calculateCableCapacity, calculateVoltageDrop } from "../_shared/calculationEngines.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { field, currentValue, newValue, fieldType, planData, currentSpec } = await req.json();
    
    console.log('Validating spec change:', { field, currentValue, newValue, fieldType });

    let validationResult = {
      valid: false,
      message: '',
      details: [] as string[],
      newCalculations: null as any,
    };

    // Extract current design parameters
    const designCurrent = planData.totalLoad / planData.voltage;
    const cableLength = planData.cableLength;
    const ambientTemp = planData.environmentalProfile?.finalApplied?.ambientTemp || 30;
    const groupingCircuits = planData.environmentalProfile?.finalApplied?.grouping || 1;

    // Validate based on field type
    if (fieldType === 'cable') {
      // User is changing cable size
      const newCableSize = Number(newValue);
      const currentCableSize = Number(currentValue);
      
      // Get current device rating from spec
      const deviceRatingMatch = currentSpec.protectionDevice?.match(/(\d+)A/);
      const deviceRating = deviceRatingMatch ? parseInt(deviceRatingMatch[1]) : Math.ceil(designCurrent * 1.25);

      // Recalculate with new cable size
      const capacityResult = calculateCableCapacity({
        cableSize: newCableSize,
        designCurrent,
        deviceRating,
        ambientTemp,
        groupingCircuits,
        installationMethod: planData.installationMethod,
        cableType: planData.cableType,
      });

      const voltageDropResult = calculateVoltageDrop({
        current: designCurrent,
        cableLength,
        cableSize: newCableSize,
        voltage: planData.voltage,
        phases: planData.phases,
      });

      validationResult.newCalculations = {
        capacity: capacityResult,
        voltageDrop: voltageDropResult,
      };

      // Check compliance
      const issues: string[] = [];
      
      if (!capacityResult.compliance.overallCompliant) {
        issues.push(`Cable capacity (${capacityResult.Iz.toFixed(1)}A) is insufficient for ${deviceRating}A protection device`);
      }

      if (!voltageDropResult.compliant) {
        issues.push(`Voltage drop (${voltageDropResult.voltageDropPercent.toFixed(2)}%) exceeds maximum ${voltageDropResult.maxAllowed}%`);
      }

      if (capacityResult.compliance.safetyMargin < 5) {
        issues.push(`Safety margin is too low (${capacityResult.compliance.safetyMargin.toFixed(1)}%)`);
      }

      if (issues.length > 0) {
        validationResult.valid = false;
        validationResult.message = `${newCableSize}mm² cable will not work for this installation`;
        validationResult.details = issues;
      } else {
        validationResult.valid = true;
        validationResult.message = newCableSize < currentCableSize
          ? `✓ ${newCableSize}mm² cable is adequate (saves material cost)`
          : `✓ ${newCableSize}mm² cable works (increased safety margin: ${capacityResult.compliance.safetyMargin.toFixed(1)}%)`;
      }

    } else if (fieldType === 'protection') {
      // User is changing protection device
      const deviceRatingMatch = String(newValue).match(/(\d+)A/);
      const newDeviceRating = deviceRatingMatch ? parseInt(deviceRatingMatch[1]) : 0;
      
      const cableSizeMatch = String(currentSpec.cableSize || currentValue).match(/(\d+(?:\.\d+)?)/);
      const cableSize = cableSizeMatch ? parseFloat(cableSizeMatch[1]) : 0;

      if (!newDeviceRating || !cableSize) {
        throw new Error('Invalid protection device or cable size');
      }

      // Recalculate with new device rating
      const capacityResult = calculateCableCapacity({
        cableSize,
        designCurrent,
        deviceRating: newDeviceRating,
        ambientTemp,
        groupingCircuits,
        installationMethod: planData.installationMethod,
        cableType: planData.cableType,
      });

      validationResult.newCalculations = { capacity: capacityResult };

      const issues: string[] = [];

      if (newDeviceRating < designCurrent) {
        issues.push(`Protection device (${newDeviceRating}A) is too small for design current (${designCurrent.toFixed(1)}A)`);
      }

      if (!capacityResult.compliance.InLeIz) {
        issues.push(`Cable capacity (${capacityResult.Iz.toFixed(1)}A) cannot support ${newDeviceRating}A protection device`);
      }

      if (issues.length > 0) {
        validationResult.valid = false;
        validationResult.message = `${newValue} is not suitable for this installation`;
        validationResult.details = issues;
      } else {
        validationResult.valid = true;
        validationResult.message = `✓ ${newValue} is compatible (safety margin: ${capacityResult.compliance.safetyMargin.toFixed(1)}%)`;
      }

    } else {
      // Generic number field validation
      validationResult.valid = true;
      validationResult.message = `Value updated to ${newValue}`;
    }

    console.log('Validation result:', validationResult);

    return new Response(JSON.stringify(validationResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in validate-spec-change function:', error);
    return new Response(JSON.stringify({ 
      valid: false,
      message: error instanceof Error ? error.message : 'Validation failed',
      details: ['An unexpected error occurred during validation']
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
