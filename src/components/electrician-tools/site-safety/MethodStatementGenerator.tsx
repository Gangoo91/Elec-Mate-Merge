import MethodStatementWizard from './method-statement/MethodStatementWizard';

interface MethodStatementGeneratorProps {
  onBack?: () => void;
}

const MethodStatementGenerator = ({ onBack }: MethodStatementGeneratorProps) => {
  return <MethodStatementWizard onBack={onBack} />;
};

export default MethodStatementGenerator;
