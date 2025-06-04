
import EnhancedTestStepInstructions from './EnhancedTestStepInstructions';
import { TestStep } from '@/types/inspection-testing';

interface TestStepInstructionsProps {
  step: TestStep;
  isSafeIsolationStep: boolean;
  mode?: 'electrician' | 'apprentice';
}

const TestStepInstructions = ({ step, isSafeIsolationStep, mode = 'electrician' }: TestStepInstructionsProps) => {
  return <EnhancedTestStepInstructions step={step} mode={mode} />;
};

export default TestStepInstructions;
