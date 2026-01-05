
import { Brain, ArrowLeft, ArrowRight, Cpu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toolOptions } from "@/components/electrician-tools/ai-tools/constants";

// Color assignments for each tool to add visual variety
const toolColors: Record<string, { gradient: string; bgGradient: string }> = {
  'assistant': { gradient: 'from-purple-400 to-purple-500', bgGradient: 'from-purple-500/20 to-purple-500/10' },
  'component-identify': { gradient: 'from-blue-400 to-blue-500', bgGradient: 'from-blue-500/20 to-blue-500/10' },
  'wiring-instruction': { gradient: 'from-emerald-400 to-green-500', bgGradient: 'from-emerald-500/20 to-green-500/10' },
  'fault-diagnosis': { gradient: 'from-orange-400 to-red-500', bgGradient: 'from-orange-500/20 to-red-500/10' },
  'installation-verify': { gradient: 'from-cyan-400 to-teal-500', bgGradient: 'from-cyan-500/20 to-teal-500/10' },
  'explainer': { gradient: 'from-pink-400 to-rose-500', bgGradient: 'from-pink-500/20 to-rose-500/10' },
};

const AITooling = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-elec-dark/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  AI Tooling
                </h1>
                <p className="text-xs text-white/50 hidden sm:block">Smart analysis tools</p>
              </div>
            </div>
            <Link to="/electrician">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 px-3 sm:px-4 text-white/70 hover:text-white hover:bg-white/10 gap-1.5 touch-manipulation"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Electrical Hub</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10 pb-safe">
        {/* Hero Section - Compact for mobile */}
        <section className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-elec-gray via-elec-gray/90 to-elec-gray/70">
          {/* Decorative gradient blobs */}
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative p-5 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20">
              <Cpu className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
                AI Analysis Suite
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl">
                Professional AI tools for UK electricians - component identification, wiring guidance, fault diagnosis & BS 7671 compliance verification
              </p>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2.5 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Available Tools</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {toolOptions.map((tool) => {
              const IconComponent = tool.icon;
              const colors = toolColors[tool.value] || { gradient: 'from-gray-400 to-gray-500', bgGradient: 'from-gray-500/20 to-gray-500/10' };

              return (
                <Link
                  key={tool.value}
                  to={`/electrician-tools/ai-tooling/${tool.value}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-2xl touch-manipulation"
                >
                  <Card className={`relative overflow-hidden border-white/10 bg-gradient-to-br ${colors.bgGradient} backdrop-blur-sm hover:border-white/20 active:scale-[0.98] transition-all duration-200 h-full group`}>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <CardHeader className="relative p-4 sm:p-5 space-y-3">
                      {/* Icon with gradient background */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${colors.gradient} shadow-lg group-active:scale-95 transition-transform`}>
                        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </div>

                      {/* Title */}
                      <CardTitle className="text-base sm:text-lg font-bold text-white">
                        {tool.label}
                      </CardTitle>

                      {/* Description */}
                      <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </CardHeader>

                    <CardContent className="relative pt-0 px-4 sm:px-5 pb-4 sm:pb-5">
                      {/* CTA - Always visible */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <span className="text-sm font-medium text-purple-400">
                          Open Tool
                        </span>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 group-active:bg-purple-500/30 transition-colors">
                          <ArrowRight className="h-4 w-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AITooling;
