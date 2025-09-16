import { Newspaper, Zap, Clock, Shield, Globe } from "lucide-react";

const IndustryNewsHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-elec-dark via-elec-dark/95 to-elec-dark/90 rounded-2xl border border-elec-yellow/20 p-6 sm:p-8 lg:p-12">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 600 300" fill="none">
          {/* Circuit lines */}
          <path d="M0 150 L80 150 L90 140 L110 160 L120 150 L200 150" stroke="currentColor" strokeWidth="2"/>
          <path d="M220 150 L300 150 L310 140 L330 160 L340 150 L420 150" stroke="currentColor" strokeWidth="2"/>
          <path d="M440 150 L520 150 L530 140 L550 160 L560 150 L600 150" stroke="currentColor" strokeWidth="2"/>
          
          {/* Vertical connections */}
          <path d="M150 50 L150 100 L160 110 L180 90 L190 100 L190 250" stroke="currentColor" strokeWidth="2"/>
          <path d="M450 50 L450 100 L460 110 L480 90 L490 100 L490 250" stroke="currentColor" strokeWidth="2"/>
          
          {/* Connection points */}
          <circle cx="80" cy="150" r="3" fill="currentColor"/>
          <circle cx="200" cy="150" r="3" fill="currentColor"/>
          <circle cx="220" cy="150" r="3" fill="currentColor"/>
          <circle cx="420" cy="150" r="3" fill="currentColor"/>
          <circle cx="150" cy="100" r="3" fill="currentColor"/>
          <circle cx="450" cy="100" r="3" fill="currentColor"/>
          
          {/* Resistor symbols */}
          <rect x="105" y="145" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1"/>
          <rect x="325" y="145" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1"/>
          <rect x="175" y="95" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>

      <div className="relative text-center space-y-6">
        {/* Animated electrical icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-elec-yellow/20 via-elec-yellow/10 to-transparent rounded-2xl border border-elec-yellow/30 flex items-center justify-center">
            <Newspaper className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow" />
            {/* Sparks animation */}
            <div className="absolute -top-1 -right-1">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow animate-pulse" />
            </div>
          </div>
          
          {/* Animated rings */}
          <div className="absolute inset-0 rounded-2xl border border-elec-yellow/20 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute inset-2 rounded-xl border border-elec-yellow/10 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
        </div>

        {/* Title with electrical styling */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-elec-yellow to-white bg-clip-text text-transparent leading-tight">
            Industry News & Updates
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-sm sm:text-lg leading-relaxed px-4">
            Stay current with the latest regulatory updates, compliance information, and industry developments 
            from leading electrical bodies and professional sources.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-white/90 bg-white/5 rounded-lg p-3 border border-white/10">
            <Clock className="h-5 w-5 text-elec-yellow flex-shrink-0" />
            <span className="text-center sm:text-left">Real-time Updates</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-white/90 bg-white/5 rounded-lg p-3 border border-white/10">
            <Shield className="h-5 w-5 text-green-400 flex-shrink-0" />
            <span className="text-center sm:text-left">BS 7671 Compliant</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-white/90 bg-white/5 rounded-lg p-3 border border-white/10">
            <Globe className="h-5 w-5 text-blue-400 flex-shrink-0" />
            <span className="text-center sm:text-left">Industry Sources</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryNewsHero;