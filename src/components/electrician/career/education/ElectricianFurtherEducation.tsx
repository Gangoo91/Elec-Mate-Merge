/**
 * ElectricianFurtherEducation
 *
 * Premium native mobile app experience for exploring further education options.
 * Features: swipeable cards, pull-to-refresh, bookmarks, programme comparison.
 */

import { PremiumEducationHub } from './premium';

interface ElectricianFurtherEducationProps {
  onBack?: () => void;
}

const ElectricianFurtherEducation = ({ onBack }: ElectricianFurtherEducationProps) => {
  return <PremiumEducationHub onBack={onBack} />;
};

export default ElectricianFurtherEducation;
