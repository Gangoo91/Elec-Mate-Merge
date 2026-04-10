import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { PolarityTestResult } from './types';
import PracticeTestForm from './PracticeTestForm';
import TestResultsList from './TestResultsList';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const PolarityPracticeSection = ({ onBack }: Props) => {
  const [testResults, setTestResults] = useState<PolarityTestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<PolarityTestResult>({
    circuitRef: '',
    testMethod: 'dead',
    socketOutlets: 'pending',
    lightingPoints: 'pending',
    isolatorSwitches: 'pending',
    result: 'pending',
    notes: '',
  });

  const handleAddTest = () => {
    if (
      currentTest.circuitRef &&
      (currentTest.socketOutlets !== 'pending' ||
        currentTest.lightingPoints !== 'pending' ||
        currentTest.isolatorSwitches !== 'pending')
    ) {
      const hasFailures =
        currentTest.socketOutlets === 'fail' ||
        currentTest.lightingPoints === 'fail' ||
        currentTest.isolatorSwitches === 'fail';

      const result: PolarityTestResult = {
        ...currentTest,
        result: hasFailures ? 'fail' : 'pass',
      };

      setTestResults([...testResults, result]);
      setCurrentTest({
        circuitRef: '',
        testMethod: 'dead',
        socketOutlets: 'pending',
        lightingPoints: 'pending',
        isolatorSwitches: 'pending',
        result: 'pending',
        notes: '',
      });
    }
  };

  const handleRemoveTest = (index: number) => {
    setTestResults(testResults.filter((_, i) => i !== index));
  };

  const updateCurrentTest = (field: string, value: string) => {
    setCurrentTest({ ...currentTest, [field]: value });
  };

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Practice</h1>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <p className="text-sm text-white leading-relaxed">
              Use this form to practise recording polarity test results. Enter the circuit reference, select your test method, and record the result for each type of accessory on the circuit.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <PracticeTestForm
            currentTest={currentTest}
            onUpdateTest={updateCurrentTest}
            onAddTest={handleAddTest}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TestResultsList testResults={testResults} onRemoveTest={handleRemoveTest} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PolarityPracticeSection;
