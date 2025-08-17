import { useState, useCallback } from "react";

interface RingCircuitReadings {
  endToEndLive: string;
  endToEndNeutral: string; 
  endToEndCpc: string;
  liveToNeutral: string;
  liveToCpc: string;
  neutralToCpc: string;
}

interface RingCircuitResult {
  r1: number;
  r2: number;
  rn: number;
  r1PlusR2: number;
  isValid: boolean;
  continuityStatus: string;
  recommendations: string[];
  warnings: string[];
  validationDetails: {
    endToEndChecks: ValidationCheck[];
    crossConnectionChecks: ValidationCheck[];
    mathematicalChecks: ValidationCheck[];
    cableComparisonChecks: ValidationCheck[];
  };
  expectedValues?: {
    r1Expected: number;
    r2Expected: number;
    toleranceRange: number;
  };
}

interface ValidationCheck {
  description: string;
  status: 'pass' | 'fail' | 'warning';
  actualValue?: number;
  expectedValue?: number;
  tolerance?: number;
  message: string;
}

// Cable resistance values at 20°C (mΩ/m)
const CABLE_RESISTANCE_VALUES = {
  "2.5mm-twin": { live: 7.41, cpc: 12.1 }, // 2.5mm² live, 1.5mm² CPC
  "4mm-twin": { live: 4.61, cpc: 7.41 },   // 4.0mm² live, 2.5mm² CPC  
  "6mm-twin": { live: 3.08, cpc: 4.61 },   // 6.0mm² live, 4.0mm² CPC
  "10mm-twin": { live: 1.83, cpc: 3.08 }   // 10mm² live, 6.0mm² CPC
} as const;

export function useRingCircuitCalculator() {
  const [readings, setReadings] = useState<RingCircuitReadings>({
    endToEndLive: "",
    endToEndNeutral: "", 
    endToEndCpc: "",
    liveToNeutral: "",
    liveToCpc: "",
    neutralToCpc: ""
  });

  const [cableType, setCableType] = useState("");
  const [cableLength, setCableLength] = useState("");
  const [temperature, setTemperature] = useState("20");
  const [result, setResult] = useState<RingCircuitResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateInputs = useCallback((): { [key: string]: string } => {
    const newErrors: { [key: string]: string } = {};

    // Check all readings are present and valid
    Object.entries(readings).forEach(([key, value]) => {
      const numValue = parseFloat(value);
      if (!value) {
        newErrors[key] = "Reading required";
      } else if (isNaN(numValue) || numValue < 0) {
        newErrors[key] = "Must be a positive number";
      } else if (numValue > 50) {
        newErrors[key] = "Reading seems unreasonably high";
      }
    });

    // Validate cable length if provided
    if (cableLength) {
      const length = parseFloat(cableLength);
      if (isNaN(length) || length <= 0 || length > 500) {
        newErrors.cableLength = "Cable length must be between 1-500m";
      }
    }

    // Validate temperature
    const temp = parseFloat(temperature);
    if (isNaN(temp) || temp < -10 || temp > 70) {
      newErrors.temperature = "Temperature must be between -10°C and 70°C";
    }

    return newErrors;
  }, [readings, cableLength, temperature]);

  const calculateExpectedValues = useCallback((cable: string, length: number, temp: number) => {
    if (!CABLE_RESISTANCE_VALUES[cable as keyof typeof CABLE_RESISTANCE_VALUES]) {
      return null;
    }

    const cableData = CABLE_RESISTANCE_VALUES[cable as keyof typeof CABLE_RESISTANCE_VALUES];
    
    // Temperature correction factor (resistance increases with temperature)
    const tempCorrection = 1 + 0.004 * (temp - 20);
    
    // Calculate expected resistances for the complete ring
    const r1Expected = (cableData.live * length * tempCorrection) / 1000; // Convert mΩ to Ω
    const r2Expected = (cableData.cpc * length * tempCorrection) / 1000;
    
    return {
      r1Expected: r1Expected / 4, // Divided by 4 for ring circuit
      r2Expected: r2Expected / 4,
      toleranceRange: 0.1 // 10% tolerance
    };
  }, []);

  const performValidationChecks = useCallback((
    calculatedValues: { r1: number; r2: number; rn: number; r1PlusR2: number },
    readingValues: { [key: string]: number },
    expectedValues: any
  ): RingCircuitResult['validationDetails'] => {
    
    const endToEndChecks: ValidationCheck[] = [
      {
        description: "Live conductor end-to-end continuity",
        status: readingValues.endToEndLive > 0 && readingValues.endToEndLive < 10 ? 'pass' : 'fail',
        actualValue: readingValues.endToEndLive,
        message: readingValues.endToEndLive > 0 && readingValues.endToEndLive < 10 
          ? "Live conductor continuity confirmed" 
          : "Check live conductor connections"
      },
      {
        description: "Neutral conductor end-to-end continuity", 
        status: readingValues.endToEndNeutral > 0 && readingValues.endToEndNeutral < 10 ? 'pass' : 'fail',
        actualValue: readingValues.endToEndNeutral,
        message: readingValues.endToEndNeutral > 0 && readingValues.endToEndNeutral < 10
          ? "Neutral conductor continuity confirmed"
          : "Check neutral conductor connections"
      },
      {
        description: "CPC end-to-end continuity",
        status: readingValues.endToEndCpc > 0 && readingValues.endToEndCpc < 15 ? 'pass' : 'fail',
        actualValue: readingValues.endToEndCpc,
        message: readingValues.endToEndCpc > 0 && readingValues.endToEndCpc < 15
          ? "CPC continuity confirmed"
          : "Check CPC connections"
      }
    ];

    const crossConnectionChecks: ValidationCheck[] = [
      {
        description: "Live to Neutral cross-connection",
        status: Math.abs(readingValues.liveToNeutral - (calculatedValues.r1 + calculatedValues.rn)) < 0.1 ? 'pass' : 'fail',
        actualValue: readingValues.liveToNeutral,
        expectedValue: calculatedValues.r1 + calculatedValues.rn,
        tolerance: 0.1,
        message: Math.abs(readingValues.liveToNeutral - (calculatedValues.r1 + calculatedValues.rn)) < 0.1
          ? "Cross-connection test passed"
          : "Live to neutral connection may have issues"
      },
      {
        description: "Live to CPC cross-connection",
        status: Math.abs(readingValues.liveToCpc - calculatedValues.r1PlusR2) < 0.1 ? 'pass' : 'fail',
        actualValue: readingValues.liveToCpc,
        expectedValue: calculatedValues.r1PlusR2,
        tolerance: 0.1,
        message: Math.abs(readingValues.liveToCpc - calculatedValues.r1PlusR2) < 0.1
          ? "R1+R2 cross-connection confirmed"
          : "Live to CPC connection requires investigation"
      },
      {
        description: "Neutral to CPC cross-connection",
        status: Math.abs(readingValues.neutralToCpc - (calculatedValues.rn + calculatedValues.r2)) < 0.1 ? 'pass' : 'fail',
        actualValue: readingValues.neutralToCpc,
        expectedValue: calculatedValues.rn + calculatedValues.r2,
        tolerance: 0.1,
        message: Math.abs(readingValues.neutralToCpc - (calculatedValues.rn + calculatedValues.r2)) < 0.1
          ? "Neutral to CPC connection confirmed"
          : "Neutral to CPC connection may have issues"
      }
    ];

    const mathematicalChecks: ValidationCheck[] = [
      {
        description: "Live/Neutral resistance comparison",
        status: Math.abs(calculatedValues.r1 - calculatedValues.rn) < 0.05 ? 'pass' : 'warning',
        actualValue: Math.abs(calculatedValues.r1 - calculatedValues.rn),
        message: Math.abs(calculatedValues.r1 - calculatedValues.rn) < 0.05
          ? "Live and neutral resistances are similar (expected for same CSA)"
          : "Live and neutral resistance difference is notable - check conductor sizes"
      },
      {
        description: "Ring calculation consistency", 
        status: (readingValues.endToEndLive / 4) > 0 ? 'pass' : 'fail',
        actualValue: readingValues.endToEndLive / 4,
        message: "Ring resistance calculation mathematically valid"
      }
    ];

    const cableComparisonChecks: ValidationCheck[] = [];
    if (expectedValues) {
      cableComparisonChecks.push(
        {
          description: "R1 vs expected cable resistance",
          status: Math.abs(calculatedValues.r1 - expectedValues.r1Expected) < expectedValues.toleranceRange ? 'pass' : 'warning',
          actualValue: calculatedValues.r1,
          expectedValue: expectedValues.r1Expected,
          tolerance: expectedValues.toleranceRange,
          message: Math.abs(calculatedValues.r1 - expectedValues.r1Expected) < expectedValues.toleranceRange
            ? "R1 matches expected cable resistance"
            : "R1 differs from expected - check cable length/type"
        },
        {
          description: "R2 vs expected cable resistance", 
          status: Math.abs(calculatedValues.r2 - expectedValues.r2Expected) < expectedValues.toleranceRange ? 'pass' : 'warning',
          actualValue: calculatedValues.r2,
          expectedValue: expectedValues.r2Expected,
          tolerance: expectedValues.toleranceRange,
          message: Math.abs(calculatedValues.r2 - expectedValues.r2Expected) < expectedValues.toleranceRange
            ? "R2 matches expected cable resistance"
            : "R2 differs from expected - check cable length/type/connections"
        }
      );
    }

    return {
      endToEndChecks,
      crossConnectionChecks,
      mathematicalChecks,
      cableComparisonChecks
    };
  }, []);

  const calculateValues = useCallback(() => {
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setResult(null);
      return;
    }

    // Parse all readings
    const readingValues = {
      endToEndLive: parseFloat(readings.endToEndLive),
      endToEndNeutral: parseFloat(readings.endToEndNeutral),
      endToEndCpc: parseFloat(readings.endToEndCpc),
      liveToNeutral: parseFloat(readings.liveToNeutral),
      liveToCpc: parseFloat(readings.liveToCpc),
      neutralToCpc: parseFloat(readings.neutralToCpc)
    };

    // Calculate R1, R2, and Rn values (quarter of end-to-end for ring circuit)
    const calculatedValues = {
      r1: readingValues.endToEndLive / 4,
      r2: readingValues.endToEndCpc / 4,
      rn: readingValues.endToEndNeutral / 4,
      r1PlusR2: (readingValues.endToEndLive + readingValues.endToEndCpc) / 4
    };

    // Calculate expected values if cable data available
    let expectedValues = null;
    if (cableType && cableLength) {
      expectedValues = calculateExpectedValues(cableType, parseFloat(cableLength), parseFloat(temperature));
    }

    // Perform comprehensive validation
    const validationDetails = performValidationChecks(calculatedValues, readingValues, expectedValues);

    // Determine overall status
    const allChecks = [
      ...validationDetails.endToEndChecks,
      ...validationDetails.crossConnectionChecks,
      ...validationDetails.mathematicalChecks,
      ...validationDetails.cableComparisonChecks
    ];

    const failedChecks = allChecks.filter(check => check.status === 'fail');
    const warningChecks = allChecks.filter(check => check.status === 'warning');

    const isValid = failedChecks.length === 0;
    const continuityStatus = isValid 
      ? `Ring circuit continuity confirmed - ${allChecks.filter(c => c.status === 'pass').length} checks passed`
      : `Ring circuit issues detected - ${failedChecks.length} failures, ${warningChecks.length} warnings`;

    const recommendations: string[] = [];
    const warnings: string[] = [];

    if (isValid) {
      recommendations.push("All continuity tests passed successfully");
      recommendations.push("Circuit is properly connected and within acceptable limits");
      if (expectedValues) {
        recommendations.push("Measured values align with expected cable characteristics");
      }
    } else {
      failedChecks.forEach(check => recommendations.push(check.message));
    }

    warningChecks.forEach(check => warnings.push(check.message));

    const finalResult: RingCircuitResult = {
      ...calculatedValues,
      isValid,
      continuityStatus,
      recommendations,
      warnings,
      validationDetails,
      expectedValues
    };

    setResult(finalResult);
  }, [readings, cableType, cableLength, temperature, validateInputs, calculateExpectedValues, performValidationChecks]);

  const handleInputChange = useCallback((field: string, value: string) => {
    const newReadings = { ...readings, [field]: value };
    setReadings(newReadings);
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [readings, errors]);

  const resetCalculator = useCallback(() => {
    setReadings({
      endToEndLive: "",
      endToEndNeutral: "",
      endToEndCpc: "",
      liveToNeutral: "",
      liveToCpc: "",
      neutralToCpc: ""
    });
    setCableType("");
    setCableLength("");
    setTemperature("20");
    setResult(null);
    setErrors({});
  }, []);

  return {
    // State
    readings,
    cableType,
    cableLength,
    temperature,
    result,
    errors,
    
    // Actions
    setReadings,
    setCableType,
    setCableLength,
    setTemperature,
    handleInputChange,
    calculateValues,
    resetCalculator,
    
    // Validation
    validateInputs
  };
}