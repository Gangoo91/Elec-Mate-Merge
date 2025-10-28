import React, { useState, useEffect } from 'react';
import { Clock, Zap, Shield, FileText, AlertTriangle } from 'lucide-react';

interface TimelineExpectationProps {
  currentSeconds: number;
  className?: string;
}

const FUN_FACTS = [
  {
    icon: Clock,
    text: "Professional electricians typically spend 2-4 hours creating RAMS manually",
    color: "text-blue-400"
  },
  {
    icon: Zap,
    text: "AI identifies job-specific hazards in seconds, saving hours of research",
    color: "text-elec-yellow"
  },
  {
    icon: FileText,
    text: "Method statements are legally required for commercial electrical work",
    color: "text-purple-400"
  },
  {
    icon: Shield,
    text: "Comprehensive risk assessments can reduce insurance premiums",
    color: "text-green-400"
  },
  {
    icon: AlertTriangle,
    text: "BS 7671 compliant documentation protects both workers and contractors",
    color: "text-orange-400"
  }
];

export const TimelineExpectation: React.FC<TimelineExpectationProps> = ({ 
  currentSeconds,
  className = ''
}) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Rotate facts every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % FUN_FACTS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const milestones = [
    { seconds: 60, label: '1 min' },
    { seconds: 120, label: '2 min' },
    { seconds: 180, label: '3 min' }
  ];

  const currentFact = FUN_FACTS[currentFactIndex];
  const FactIcon = currentFact.icon;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Time estimate banner */}
      <div className="flex items-center justify-between gap-4 p-3 sm:p-4 bg-gradient-to-r from-elec-yellow/10 via-elec-yellow/5 to-transparent rounded-lg border border-elec-yellow/20">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-foreground">
              Typical generation time
            </p>
            <p className="text-lg sm:text-xl font-bold text-elec-yellow">
              2-3 minutes
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-right">
          <div className="hidden sm:block">
            <p className="text-xs text-muted-foreground">Time saved vs manual</p>
            <p className="text-sm font-bold text-green-500 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              2-4 hours
            </p>
          </div>
        </div>
      </div>

      {/* Fun facts carousel */}
      <div className="p-4 sm:p-5 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="flex items-start gap-3 sm:gap-4 min-h-[60px]">
          <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-${currentFact.color.split('-')[1]}-500/20 to-${currentFact.color.split('-')[1]}-500/10 flex items-center justify-center`}>
            <FactIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${currentFact.color}`} />
          </div>
          <div className="flex-1 pt-1">
            <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1">
              💡 Did you know?
            </p>
            <p 
              key={currentFactIndex} 
              className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed animate-in fade-in slide-in-from-right-4 duration-500"
            >
              {currentFact.text}
            </p>
          </div>
        </div>
        
        {/* Fact indicator dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {FUN_FACTS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentFactIndex 
                  ? 'w-6 bg-elec-yellow' 
                  : 'w-1.5 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="relative px-2 sm:px-4">
        {/* Progress line */}
        <div className="absolute top-2 left-0 right-0 h-1 bg-muted/30 rounded-full mx-4 sm:mx-8" />
        <div 
          className="absolute top-2 left-0 h-1 bg-gradient-to-r from-elec-yellow via-green-400 to-green-500 rounded-full mx-4 sm:mx-8 transition-all duration-500"
          style={{ 
            width: `calc(${Math.min((currentSeconds / 180) * 100, 100)}% - 2rem)` 
          }}
        />

        {/* Milestone markers */}
        <div className="relative flex justify-between items-start pt-0 pb-2">
          {milestones.map((milestone, idx) => {
            const isComplete = currentSeconds >= milestone.seconds;
            const isActive = currentSeconds >= (milestones[idx - 1]?.seconds || 0) && 
                           currentSeconds < milestone.seconds;

            return (
              <div key={milestone.seconds} className="flex flex-col items-center">
                {/* Marker dot */}
                <div 
                  className={`
                    w-4 h-4 rounded-full border-2 transition-all duration-300 z-10
                    ${isComplete 
                      ? 'bg-green-500 border-green-500 scale-110' 
                      : isActive
                        ? 'bg-elec-yellow border-elec-yellow animate-pulse scale-110'
                        : 'bg-background border-muted'
                    }
                  `}
                />
                
                {/* Label */}
                <span 
                  className={`
                    mt-2 text-xs font-medium transition-colors duration-300
                    ${isComplete 
                      ? 'text-green-500' 
                      : isActive
                        ? 'text-elec-yellow'
                        : 'text-muted-foreground'
                    }
                  `}
                >
                  {milestone.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
