
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Brain,
  Calendar,
  CheckCircle2,
  Gauge
} from 'lucide-react';
import { LearningSection } from '../LearningHub';
import { GN3AcceptanceLimits } from './gn3-reference/GN3AcceptanceLimits';
import { GN3QuickQuiz } from './gn3-reference/GN3QuickQuiz';

interface LearningHubOverviewProps {
  onNavigateToSection: (section: LearningSection) => void;
}

const LearningHubOverview = ({ onNavigateToSection }: LearningHubOverviewProps) => {
  const navigate = useNavigate();

  const learningModules = [
    {
      id: 'testing' as LearningSection,
      title: 'Testing Procedures',
      description: 'Complete guide to BS 7671 Part 6 testing methods including continuity, insulation resistance, RCD and earth fault loop impedance testing',
      icon: Zap,
      gradient: 'from-orange-500/20 via-orange-500/10 to-transparent',
      borderColor: 'border-orange-500/30 hover:border-orange-500/50',
      iconBg: 'bg-orange-500/20',
      iconColor: 'text-orange-400',
      stats: { items: 18, duration: '35 min' },
      features: ['Continuity (R1+R2)', 'Insulation Resistance', 'RCD Testing', 'Zs Testing']
    },
    {
      id: 'fault-finding' as LearningSection,
      title: 'Fault Finding',
      description: 'Systematic diagnostic techniques for identifying earth faults, short circuits, open circuits and high resistance joints',
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
      title: 'BS 7671:2018+A3:2024',
      description: 'Essential regulation references, cable tables, maximum Zs values and documentation requirements updated for Amendment 3',
      icon: BookOpen,
      gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30 hover:border-blue-500/50',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      stats: { items: 24, duration: '45 min' },
      features: ['Part 6 Testing', 'Cable Tables', 'Zs Values', 'EV Charging']
    },
    {
      id: 'quiz' as LearningSection,
      title: 'Knowledge Quiz',
      description: 'Test your understanding with interactive quizzes covering all inspection and testing topics with instant feedback',
      icon: Brain,
      gradient: 'from-elec-yellow/20 via-elec-yellow/10 to-transparent',
      borderColor: 'border-elec-yellow/30 hover:border-elec-yellow/50',
      iconBg: 'bg-elec-yellow/20',
      iconColor: 'text-elec-yellow',
      stats: { items: 12, duration: '60 min' },
      features: ['2391 Style', 'Progress Tracking', 'Instant Feedback', 'Certificates']
    }
  ];

  return (
    <div className="space-y-5 sm:space-y-6 md:space-y-8">
      {/* Header Section - compact on mobile */}
      <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 px-3 sm:px-4">
        {/* Amendment Badge */}
        <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px] sm:text-xs">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            BS 7671:2018+A3:2024
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px] sm:text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            Updated Jan 2026
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4">
          <div className="p-2.5 sm:p-4 bg-elec-yellow/10 rounded-xl sm:rounded-2xl border border-elec-yellow/20">
            <Zap className="h-7 w-7 sm:h-10 sm:w-10 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Inspection & Testing Hub
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/80 mt-0.5 sm:mt-1">
              18th Edition Amendment 3 Resources
            </p>
          </div>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-white max-w-2xl mx-auto hidden sm:block">
          Comprehensive learning modules aligned with the latest BS 7671:2018 Amendment 3:2024 requirements
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
              className={`relative overflow-hidden bg-elec-gray ${module.borderColor} rounded-xl sm:rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer touch-manipulation`}
              onClick={handleClick}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />

              <div className="relative p-4 sm:p-5 md:p-6">
                {/* Top Row: Icon and Stats */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`p-2.5 sm:p-3 md:p-4 ${module.iconBg} rounded-lg sm:rounded-xl md:rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${module.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-white/60">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{module.stats.duration}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2">
                  {module.title}
                </h3>

                {/* Description - compact on mobile */}
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                  {module.description}
                </p>

                {/* Feature Tags - horizontal scroll on mobile */}
                <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
                  {module.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 sm:py-1 rounded-full bg-white/10 text-white border border-white/10 whitespace-nowrap flex-shrink-0"
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

      {/* GN3 Quick Reference Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-1.5 sm:p-2 bg-elec-yellow/10 rounded-lg border border-elec-yellow/20">
            <Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Quick Reference</h2>
            <p className="text-xs sm:text-sm text-white/70">Essential GN3 values & quiz</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {/* Acceptance Limits */}
          <GN3AcceptanceLimits />

          {/* Quick Quiz */}
          <GN3QuickQuiz questionCount={5} />
        </div>
      </div>

      {/* Amendment 3 Info Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <Card className="bg-gradient-to-r from-blue-500/10 to-elec-yellow/10 border-blue-500/20 rounded-xl">
          <div className="p-3 sm:p-4 md:p-5">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-white text-sm sm:text-base mb-0.5 sm:mb-1">Amendment 3:2024 In Force</h4>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Content updated for A3:2024 including EV charging, energy storage, prosumer installations and AFDDs.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Safety Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <Card className="bg-elec-gray/50 border-red-500/20 rounded-xl">
          <div className="p-3 sm:p-4 md:p-5">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-red-500/20 flex-shrink-0">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-white text-sm sm:text-base mb-0.5 sm:mb-1">Safety First</h4>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Follow safe isolation procedures before testing. These materials supplement practical training.
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
