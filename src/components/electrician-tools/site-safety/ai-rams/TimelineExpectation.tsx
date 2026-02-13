import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

const funFacts = [
  "⚡ The average electrical installation generates over 20 unique safety considerations",
  "🛡️ BS 7671 regulations are updated every 3-4 years to reflect new safety standards",
  "📊 A well-documented RAMS can reduce on-site incidents by up to 70%",
  "🔍 Method statements should be reviewed by at least 2 qualified persons",
  "⚠️ Working at height is one of the most common causes of serious electrical injuries",
  "🧰 Modern electrical installations require consideration of over 15 PPE categories",
  "📋 Digital RAMS documentation improves compliance tracking by 85%",
  "🔧 Tool selection can impact both efficiency and safety ratings significantly",
  "💡 Emergency procedures should be practiced at least quarterly on site",
  "🏗️ Site-specific risk assessments are 3x more effective than generic templates",
  "🔌 The UK's Electricity at Work Regulations 1989 require all systems to be maintained safely",
  "👷 Competent person status requires both theoretical knowledge and practical experience",
  "🧯 Fire extinguishers should be within 30 metres of any electrical work area",
  "📱 Smart PPE with built-in sensors can detect electrical hazards before contact",
  "⚙️ Isolation procedures must follow a strict Lock-Off-Tag-Out (LOTO) protocol"
];

export const TimelineExpectation: React.FC = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [userHidden, setUserHidden] = useState(false);

  // Hide after 5 minutes (300 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 300000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate facts every 10 seconds
  useEffect(() => {
    if (!isVisible || userHidden) return;

    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isVisible, userHidden]);

  if (!isVisible || userHidden) return null;

  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-blue-400">💡 Did you know?</p>
              <button
                onClick={() => setUserHidden(true)}
                className="text-xs text-blue-400/60 hover:text-blue-400 transition-colors underline"
              >
                Hide tips
              </button>
            </div>
            <p 
              key={currentFactIndex} 
              className="text-base text-white leading-relaxed animate-fade-in"
            >
              {funFacts[currentFactIndex]}
            </p>
          </div>
        </div>
        
        {/* Fact indicator dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {funFacts.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentFactIndex 
                  ? 'w-6 bg-blue-400' 
                  : 'w-1.5 bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
