
import React from 'react';
import { BookOpen, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

const RegulationReferenceHeader = () => {
  const quickStats = [
    { label: 'Total Regulations', value: '700+', icon: BookOpen, color: 'text-blue-400' },
    { label: 'Safety Rules', value: '150+', icon: Shield, color: 'text-red-400' },
    { label: 'Test Procedures', value: '45+', icon: CheckCircle, color: 'text-green-400' },
    { label: 'Special Locations', value: '25+', icon: AlertTriangle, color: 'text-yellow-400' }
  ];

  return (
    <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">BS7671 Practical Reference</h1>
      </div>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-4xl mx-auto leading-relaxed">
        The regulations that matter most to your daily work as an electrician. 
        Quick access to testing standards, safety requirements, and compliance guidance.
      </p>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mt-6 sm:mt-8">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-card rounded-lg p-3 sm:p-4 border border-border">
              <IconComponent className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color} mx-auto mb-2`} />
              <div className="text-base sm:text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-white/80">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegulationReferenceHeader;
