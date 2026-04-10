import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ZsTestResult } from './types';
import PracticeTestForm from './PracticeTestForm';
import TestResultsList from './TestResultsList';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Props {
  onBack: () => void;
}

const ZsPracticeSection = ({ onBack }: Props) => {
  const [testResults, setTestResults] = useState<ZsTestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<ZsTestResult>({
    circuitRef: '',
    testMethod: 'live',
    protectiveDevice: '',
    deviceRating: 0,
    zsReading: '',
    zsMaxPermitted: '',
    temperature: '20',
    correctedZs: '',
    result: 'pending',
    notes: '',
  });

  const updateCurrentTest = (field: string, value: string) => {
    setCurrentTest({ ...currentTest, [field]: value });
  };

  const handleAddTest = () => {
    if (currentTest.circuitRef && currentTest.zsReading && currentTest.zsMaxPermitted) {
      const reading = parseFloat(currentTest.zsReading);
      const maxPermitted = parseFloat(currentTest.zsMaxPermitted);
      const temp = parseFloat(currentTest.temperature || '20');
      const correctionFactor = (230 + 70) / (230 + temp);
      const correctedZs = reading * correctionFactor;

      const result: ZsTestResult = {
        ...currentTest,
        correctedZs: correctedZs.toFixed(2),
        result: correctedZs <= maxPermitted ? 'pass' : 'fail',
      };

      setTestResults([...testResults, result]);
      setCurrentTest({
        circuitRef: '',
        testMethod: 'live',
        protectiveDevice: '',
        deviceRating: 0,
        zsReading: '',
        zsMaxPermitted: '',
        temperature: '20',
        correctedZs: '',
        result: 'pending',
        notes: '',
      });
    }
  };

  const handleRemoveTest = (index: number) => {
    setTestResults(testResults.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
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
              Use this form to practise recording Zs test results. Enter the circuit reference, select the protective device, record your measured Zs and ambient temperature. The form automatically applies temperature correction and compares against the BS 7671 maximum.
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

export default ZsPracticeSection;
