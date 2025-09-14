import { MessageSquare, Zap, Users, Shield } from "lucide-react";

const ElectricalHeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
          {/* Circuit lines */}
          <path d="M0 100 L50 100 L60 90 L80 110 L90 100 L140 100" stroke="currentColor" strokeWidth="2"/>
          <path d="M160 100 L210 100 L220 90 L240 110 L250 100 L300 100" stroke="currentColor" strokeWidth="2"/>
          <path d="M320 100 L370 100 L380 90 L400 110" stroke="currentColor" strokeWidth="2"/>
          
          {/* Connection points */}
          <circle cx="50" cy="100" r="3" fill="currentColor"/>
          <circle cx="140" cy="100" r="3" fill="currentColor"/>
          <circle cx="160" cy="100" r="3" fill="currentColor"/>
          <circle cx="300" cy="100" r="3" fill="currentColor"/>
          
          {/* Resistor symbols */}
          <rect x="75" y="95" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1"/>
          <rect x="235" y="95" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>

      <div className="relative text-center space-y-6 py-12">
        {/* Animated electrical icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-elec-yellow/20 via-elec-yellow/10 to-transparent rounded-2xl border border-elec-yellow/30 flex items-center justify-center">
            <MessageSquare className="h-10 w-10 text-elec-yellow" />
            {/* Sparks animation */}
            <div className="absolute -top-1 -right-1">
              <Zap className="h-4 w-4 text-elec-yellow animate-pulse" />
            </div>
          </div>
          
          {/* Animated rings */}
          <div className="absolute inset-0 rounded-2xl border border-elec-yellow/20 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute inset-2 rounded-xl border border-elec-yellow/10 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
        </div>

        {/* Title with electrical styling */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground via-elec-yellow to-foreground bg-clip-text text-transparent">
            Client Explainer
          </h1>
          <p className="text-foreground max-w-2xl mx-auto text-sm leading-relaxed">
            Transform technical electrical findings into clear, professional explanations 
            that clients can understand and trust.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 pt-4">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Users className="h-4 w-4 text-elec-yellow" />
            <span>Client-friendly</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Shield className="h-4 w-4 text-green-400" />
            <span>BS 7671 Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Zap className="h-4 w-4 text-blue-400" />
            <span>Professional</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricalHeroSection;