
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
  Users,
  Search,
  Wrench,
  FileText,
  Brain
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
      description: 'Step-by-step electrical testing methods including continuity, insulation resistance, RCD and loop impedance testing',
      icon: Zap,
      gradient: 'from-orange-500/20 via-orange-500/10 to-transparent',
      borderColor: 'border-orange-500/30 hover:border-orange-500/50',
      iconBg: 'bg-orange-500/20',
      iconColor: 'text-orange-400',
      stats: { items: 18, duration: '35 min' },
      features: ['Continuity Testing', 'Insulation Resistance', 'RCD Testing', 'Loop Impedance']
    },
    {
      id: 'fault-finding' as LearningSection,
      title: 'Fault Finding',
      description: 'Systematic diagnostic techniques for identifying and resolving common electrical faults safely',
      icon: Wrench,
      gradient: 'from-red-500/20 via-red-500/10 to-transparent',
      borderColor: 'border-red-500/30 hover:border-red-500/50',
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-400',
      stats: { items: 20, duration: '40 min' },
      features: ['Earth Faults', 'Short Circuits', 'Open Circuits', 'High Resistance']
    },
    {
      id: 'regulations' as LearningSection,
      title: 'BS 7671 Reference',
      description: 'Quick access to essential BS 7671 regulations, tables and requirements for inspection work',
      icon: BookOpen,
      gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30 hover:border-blue-500/50',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      stats: { items: 24, duration: '45 min' },
      features: ['Part 6 Inspection', 'Cable Tables', 'Test Values', 'Documentation']
    },
    {
      id: 'quiz' as LearningSection,
      title: 'Knowledge Quiz',
      description: 'Test and reinforce your understanding with interactive quizzes covering all inspection topics',
      icon: Brain,
      gradient: 'from-elec-yellow/20 via-elec-yellow/10 to-transparent',
      borderColor: 'border-elec-yellow/30 hover:border-elec-yellow/50',
      iconBg: 'bg-elec-yellow/20',
      iconColor: 'text-elec-yellow',
      stats: { items: 12, duration: '60 min' },
      features: ['Multiple Choice', 'Progress Tracking', 'Instant Feedback', 'Score History']
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
          <div className="p-3 sm:p-4 bg-elec-yellow/10 rounded-2xl border border-elec-yellow/20">
            <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Inspection & Testing Hub
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              BS 7671 Compliant Training Resources
            </p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
          Comprehensive learning modules covering testing procedures, fault finding, regulations and assessments
        </p>
      </div>

      {/* Learning Modules Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 px-3 sm:px-4">
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
              className={`relative overflow-hidden bg-elec-gray ${module.borderColor} rounded-xl sm:rounded-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer touch-manipulation`}
              onClick={handleClick}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />

              <div className="relative p-5 sm:p-6">
                {/* Top Row: Icon and Stats */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 sm:p-4 ${module.iconBg} rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-7 w-7 sm:h-8 sm:w-8 ${module.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{module.stats.duration}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:${module.iconColor} transition-colors`}>
                  {module.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {module.description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {module.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className={`flex items-center gap-2 ${module.iconColor} font-medium text-sm group-hover:gap-3 transition-all duration-300`}>
                  <span>Start Learning</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Tips Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <Card className="bg-elec-gray/50 border-elec-yellow/20 rounded-xl">
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/10 flex-shrink-0">
                <Shield className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Safety First</h4>
                <p className="text-sm text-muted-foreground">
                  Always follow safe isolation procedures before conducting any electrical tests.
                  These learning materials supplement your practical training but do not replace
                  hands-on supervision from a qualified electrician.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LearningHubOverview;
