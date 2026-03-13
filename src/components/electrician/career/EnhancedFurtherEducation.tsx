import ElectricianFurtherEducation from './education/ElectricianFurtherEducation';

interface EnhancedFurtherEducationProps {
  onBack?: () => void;
}

const EnhancedFurtherEducation = ({ onBack }: EnhancedFurtherEducationProps) => {
  return <ElectricianFurtherEducation onBack={onBack} />;
};

export default EnhancedFurtherEducation;
