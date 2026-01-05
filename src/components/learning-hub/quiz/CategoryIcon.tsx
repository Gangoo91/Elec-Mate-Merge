import React from 'react';
import { 
  Eye, 
  Zap, 
  Shield, 
  TestTube, 
  AlertCircle, 
  Target,
  Activity,
  CheckCircle2,
  LucideIcon 
} from 'lucide-react';

interface CategoryIconProps {
  category: string;
  className?: string;
}

const categoryIconMap: Record<string, LucideIcon> = {
  'Visual Inspection': Eye,
  'Continuity Testing': Zap,
  'Insulation Resistance': Shield,
  'Polarity Testing': Target,
  'Earth Fault Loop': AlertCircle,
  'RCD Testing': Activity,
  'Prospective Fault': TestTube,
  'Functional Testing': CheckCircle2,
  'Inspection': Eye,
  'Testing': TestTube,
  'Safety': Shield,
  'Protection': Shield,
  'Regulations': CheckCircle2,
  'Design': Target
};

const CategoryIcon = ({ category, className = 'h-6 w-6' }: CategoryIconProps) => {
  const Icon = categoryIconMap[category] || CheckCircle2;
  return <Icon className={className} />;
};

export default CategoryIcon;
