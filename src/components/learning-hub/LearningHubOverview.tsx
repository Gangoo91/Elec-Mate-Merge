
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  GraduationCap, 
  Zap, 
  Shield, 
  ArrowRight,
  Star,
  Clock,
  Users
} from 'lucide-react';
import { LearningSection } from '../LearningHub';

interface LearningHubOverviewProps {
  onNavigateToSection: (section: LearningSection) => void;
}

const LearningHubOverview = ({ onNavigateToSection }: LearningHubOverviewProps) => {
  const navigate = useNavigate();
  
  const learningModules = [
    {
      id: 'testing' as LearningSection,
      title: 'Testing Procedures',
      description: 'Step-by-step electrical testing methods and best practices',
      icon: Zap,
      color: 'bg-orange-500/10 border-orange-500/20',
      iconColor: 'text-orange-400',
      stats: { items: 18, duration: '35 min' },
      features: ['Video tutorials', 'Interactive simulations', 'Test equipment guides']
    },
    {
      id: 'fault-finding' as LearningSection,
      title: 'Fault Finding',
      description: 'Systematic approach to identifying and resolving electrical faults',
      icon: Zap,
      color: 'bg-red-500/10 border-red-500/20',
      iconColor: 'text-red-400',
      stats: { items: 20, duration: '40 min' },
      features: ['Diagnostic techniques', 'Test equipment usage', 'Troubleshooting guides']
    },
    {
      id: 'regulations' as LearningSection,
      title: 'BS7671 Regulation Reference',
      description: 'Comprehensive guide to electrical installation standards and regulations',
      icon: BookOpen,
      color: 'bg-blue-500/10 border-blue-500/20',
      iconColor: 'text-blue-400',
      stats: { items: 24, duration: '45 min' },
      features: ['Quick search', 'Interactive guides', 'Regulation updates']
    },
    {
      id: 'quiz' as LearningSection,
      title: 'Knowledge Assessment',
      description: 'Test your understanding with interactive quizzes and assessments',
      icon: GraduationCap,
      color: 'bg-yellow-500/10 border-yellow-500/20',
      iconColor: 'text-yellow-400',
      stats: { items: 12, duration: '60 min' },
      features: ['Progress tracking', 'Certificates', 'Difficulty levels']
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 md:space-y-6 px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
          <div className="p-2 sm:p-2.5 md:p-3 bg-elec-yellow/10 rounded-full">
            <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-elec-yellow" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center">
            Inspection & Testing Hub
          </h1>
        </div>
        <p className="text-sm sm:text-base md:text-base text-gray-300 max-w-3xl mx-auto px-2 sm:px-4">
          BS7671 guidance, testing procedures and comprehensive safety resources for electrical professionals
        </p>
      </div>

      {/* Learning Modules Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-3 sm:px-0">
        {learningModules.map((module) => {
          const IconComponent = module.icon;
          const handleClick = () => {
            if (module.id === 'regulations') {
              navigate('/tools/regulation-search');
            } else {
              onNavigateToSection(module.id);
            }
          };
          
          return (
            <Card 
              key={module.id}
              className="bg-elec-gray border border-elec-yellow/30 rounded-lg sm:rounded-xl md:rounded-2xl hover:scale-[1.02] sm:hover:scale-105 hover:border-elec-yellow/50 transition-all duration-300 group cursor-pointer touch-manipulation min-h-[44px]"
              onClick={handleClick}
            >
              <div className="text-center space-y-3 sm:space-y-4 p-4 sm:p-5 md:p-6">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="p-2 sm:p-2.5 md:p-3 bg-elec-yellow/10 rounded-xl md:rounded-2xl">
                    <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-elec-yellow" />
                  </div>
                </div>
                
                {/* Title */}
                <CardTitle className="text-foreground text-base sm:text-lg md:text-xl font-bold group-hover:text-elec-yellow transition-colors">
                  {module.title}
                </CardTitle>
                
                {/* Description */}
                <CardDescription className="text-gray-300 text-sm sm:text-base leading-relaxed px-1 sm:px-2">
                  {module.description}
                </CardDescription>
              </div>
            </Card>
          );
        })}
      </div>

    </div>
  );
};

export default LearningHubOverview;
