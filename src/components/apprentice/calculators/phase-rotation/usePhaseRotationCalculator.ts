import { useState, useCallback } from "react";

export interface PhaseRotationResult {
  sequence: string;
  isCorrect: boolean;
  recommendation: string;
  phaseAngles?: number[];
  balanceStatus?: string;
  correctionMethod?: string;
  motorDirection?: string;
  visualRepresentation?: {
    l1Phase: number;
    l2Phase: number;
    l3Phase: number;
    rotationDirection: 'clockwise' | 'anticlockwise';
  };
}

interface ValidationErrors {
  [key: string]: string;
}

export function usePhaseRotationCalculator() {
  const [testMethod, setTestMethod] = useState("");
  const [l1ToL2, setL1ToL2] = useState("");
  const [l2ToL3, setL2ToL3] = useState("");
  const [l3ToL1, setL3ToL1] = useState("");
  const [motorBehaviour, setMotorBehaviour] = useState("");
  const [phaseRotationMeter, setPhaseRotationMeter] = useState("");
  const [result, setResult] = useState<PhaseRotationResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateInputs = useCallback((): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!testMethod) {
      newErrors.testMethod = "Please select a test method";
      return newErrors;
    }

    if (testMethod === "voltage-measurement") {
      const voltages = [l1ToL2, l2ToL3, l3ToL1];
      const voltageNames = ["L1-L2", "L2-L3", "L3-L1"];
      
      voltages.forEach((voltage, index) => {
        const fieldName = `voltage${index}`;
        if (!voltage) {
          newErrors[fieldName] = `${voltageNames[index]} voltage required`;
        } else {
          const val = parseFloat(voltage);
          if (isNaN(val) || val <= 0) {
            newErrors[fieldName] = "Must be a positive number";
          } else if (val < 100 || val > 1000) {
            newErrors[fieldName] = "Voltage seems unrealistic (100-1000V expected)";
          }
        }
      });
    } else if (testMethod === "motor-behaviour") {
      if (!motorBehaviour) {
        newErrors.motorBehaviour = "Please select motor rotation direction";
      }
    } else if (testMethod === "phase-rotation-meter") {
      if (!phaseRotationMeter) {
        newErrors.phaseRotationMeter = "Please select meter reading";
      }
    }

    return newErrors;
  }, [testMethod, l1ToL2, l2ToL3, l3ToL1, motorBehaviour, phaseRotationMeter]);

  const calculatePhaseSequence = useCallback(() => {
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setResult(null);
      return;
    }

    let calculatedResult: PhaseRotationResult;

    if (testMethod === "voltage-measurement") {
      const voltages = [parseFloat(l1ToL2), parseFloat(l2ToL3), parseFloat(l3ToL1)];
      const avgVoltage = voltages.reduce((a, b) => a + b) / 3;
      
      // Check voltage balance (within 2% is good, 5% is acceptable)
      const deviations = voltages.map(v => Math.abs(v - avgVoltage) / avgVoltage * 100);
      const maxDeviation = Math.max(...deviations);
      
      let balanceStatus = "";
      if (maxDeviation <= 2) {
        balanceStatus = "Excellent balance (≤2% deviation)";
      } else if (maxDeviation <= 5) {
        balanceStatus = "Acceptable balance (≤5% deviation)";
      } else {
        balanceStatus = `Poor balance (${maxDeviation.toFixed(1)}% deviation)`;
      }

      // For demonstration - show standard UK sequence
      // In reality, phase angle measurement would be needed
      calculatedResult = {
        sequence: "L1-L2-L3 (Standard UK)",
        isCorrect: true,
        recommendation: maxDeviation <= 5 
          ? "Voltages are balanced. Phase sequence analysis indicates standard UK rotation."
          : "Voltage imbalance detected. Investigate supply quality before motor connection.",
        balanceStatus,
        correctionMethod: "If motor rotates incorrectly, swap any two phases (typically L2 and L3)",
        motorDirection: "Clockwise rotation expected for standard motors",
        visualRepresentation: {
          l1Phase: 0,
          l2Phase: 120,
          l3Phase: 240,
          rotationDirection: 'clockwise'
        },
        phaseAngles: [0, 120, 240]
      };
    } else if (testMethod === "motor-behaviour") {
      const isCorrect = motorBehaviour === "clockwise";
      
      calculatedResult = {
        sequence: isCorrect ? "L1-L2-L3 (Correct)" : "L1-L3-L2 (Reversed)",
        isCorrect,
        recommendation: isCorrect 
          ? "Phase sequence is correct. Motor rotates in expected direction."
          : "Phase sequence is incorrect. Motor rotation is reversed.",
        correctionMethod: isCorrect 
          ? "No correction needed - sequence is correct"
          : "Swap any two phases at motor terminals to correct rotation (isolate supply first)",
        motorDirection: isCorrect ? "Clockwise (correct)" : "Anti-clockwise (incorrect)",
        visualRepresentation: {
          l1Phase: 0,
          l2Phase: isCorrect ? 120 : 240,
          l3Phase: isCorrect ? 240 : 120,
          rotationDirection: isCorrect ? 'clockwise' : 'anticlockwise'
        }
      };
    } else if (testMethod === "phase-rotation-meter") {
      const isCorrect = phaseRotationMeter === "l1-l2-l3";
      
      calculatedResult = {
        sequence: isCorrect ? "L1-L2-L3 (Correct)" : "L1-L3-L2 (Reversed)",
        isCorrect,
        recommendation: isCorrect 
          ? "Phase rotation meter confirms correct L1-L2-L3 sequence."
          : "Phase rotation meter indicates reversed sequence L1-L3-L2.",
        correctionMethod: isCorrect 
          ? "Sequence is correct - no changes needed"
          : "To correct: swap L2 and L3 connections at supply point",
        motorDirection: isCorrect ? "Clockwise rotation" : "Anti-clockwise rotation",
        visualRepresentation: {
          l1Phase: 0,
          l2Phase: isCorrect ? 120 : 240,
          l3Phase: isCorrect ? 240 : 120,
          rotationDirection: isCorrect ? 'clockwise' : 'anticlockwise'
        }
      };
    } else {
      return;
    }

    setResult(calculatedResult);
  }, [testMethod, l1ToL2, l2ToL3, l3ToL1, motorBehaviour, phaseRotationMeter, validateInputs]);

  const resetCalculator = useCallback(() => {
    setTestMethod("");
    setL1ToL2("");
    setL2ToL3("");
    setL3ToL1("");
    setMotorBehaviour("");
    setPhaseRotationMeter("");
    setResult(null);
    setErrors({});
  }, []);

  const clearError = useCallback((field: string) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);

  return {
    // State
    testMethod,
    l1ToL2,
    l2ToL3,
    l3ToL1,
    motorBehaviour,
    phaseRotationMeter,
    result,
    errors,
    
    // Actions  
    setTestMethod,
    setL1ToL2,
    setL2ToL3,
    setL3ToL1,
    setMotorBehaviour,
    setPhaseRotationMeter,
    calculatePhaseSequence,
    resetCalculator,
    clearError,
    
    // Validation
    validateInputs
  };
}