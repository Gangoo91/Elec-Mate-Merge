import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

interface Test {
  testName: string;
  testSequence?: number;
  prerequisiteTests?: string[];
  conflictingTests?: string[];
}

interface TestSequenceValidatorProps {
  currentTest: Test;
  allTests: Test[];
}

export const TestSequenceValidator = ({ currentTest, allTests }: TestSequenceValidatorProps) => {
  const hasPrerequisites = currentTest.prerequisiteTests && currentTest.prerequisiteTests.length > 0;
  const hasConflicts = currentTest.conflictingTests && currentTest.conflictingTests.length > 0;

  if (!hasPrerequisites && !hasConflicts) return null;

  return (
    <div className="space-y-2 my-4">
      {/* Prerequisites */}
      {hasPrerequisites && (
        <Alert className="border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/30">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription>
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Required Prerequisites:</p>
            <ul className="list-disc list-inside text-sm text-blue-800 dark:text-blue-200 space-y-1">
              {currentTest.prerequisiteTests!.map((prereq, idx) => (
                <li key={idx}>{prereq}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Conflicts */}
      {hasConflicts && (
        <Alert className="border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription>
            <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Avoid These Sequences:</p>
            <ul className="list-disc list-inside text-sm text-amber-800 dark:text-amber-200 space-y-1">
              {currentTest.conflictingTests!.map((conflict, idx) => (
                <li key={idx}>{conflict}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Sequence Position Indicator */}
      {currentTest.testSequence && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span>Test {currentTest.testSequence} of {allTests.length}</span>
        </div>
      )}
    </div>
  );
};
