import { Zap, Shield } from "lucide-react";

export const InputHeroBar = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-elec-dark via-elec-dark to-elec-dark/95 border-b border-elec-yellow/20 mb-6">
      {/* Decorative Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--elec-yellow)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--elec-yellow)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative px-3 sm:px-4 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2 sm:gap-3 flex-1">
              <div className="p-2 sm:p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                    Commissioning Specialist
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-foreground/80 mt-0.5 hidden sm:block">
                  Expert testing procedures for safe, compliant installations
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
              <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-elec-yellow" />
              <span className="text-[10px] sm:text-xs font-semibold text-elec-yellow">BS 7671</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />
    </div>
  );
};
