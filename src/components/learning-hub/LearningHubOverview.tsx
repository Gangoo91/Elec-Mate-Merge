
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
  CheckCircle2
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
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center space-y-4 px-3 sm:px-4">
        {/* Amendment Badge */}
        <div className="flex justify-center gap-2 mb-2">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            BS 7671:2018+A3:2024
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            Updated January 2026
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-elec-yellow/10 rounded-2xl border border-elec-yellow/20">
            <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Inspection & Testing Hub
            </h1>
            <p className="text-sm sm:text-base text-white/80 mt-1">
              18th Edition Amendment 3 Compliant Resources
            </p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-white max-w-2xl mx-auto">
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
              className={`relative overflow-hidden bg-white/5 ${module.borderColor} rounded-xl sm:rounded-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer touch-manipulation`}
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
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{module.stats.duration}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {module.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  {module.description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {module.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-white/10 text-white border border-white/10"
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

      {/* Amendment 3 Info Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <Card className="bg-gradient-to-r from-blue-500/10 to-elec-yellow/10 border-blue-500/20 rounded-xl">
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
                <BookOpen className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Amendment 3:2024 Now In Force</h4>
                <p className="text-sm text-white/80">
                  All content has been updated to reflect BS 7671:2018 Amendment 3:2024 requirements including new guidance on
                  EV charging installations, energy storage systems, prosumer installations and arc fault detection devices (AFDDs).
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Safety Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <Card className="bg-white/5 border-red-500/20 rounded-xl">
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-500/20 flex-shrink-0">
                <Shield className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Safety First</h4>
                <p className="text-sm text-white/80">
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
