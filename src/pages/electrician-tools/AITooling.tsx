import { Brain, ArrowLeft, ArrowRight, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3">
          <button
            onClick={() => navigate('/electrician')}
            className="flex items-center gap-2 text-white active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Electrician Hub</span>
          </button>
        </div>
      </div>

      <main className="px-4 py-4 space-y-6">
        {/* Hero Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Brain className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Tooling Suite</h1>
            <p className="text-sm text-white/50">Smart analysis tools for UK electricians</p>
          </div>
        </div>

        {/* Feature Banner */}
        <Card className="relative overflow-hidden bg-[#1e1e1e] border border-purple-500/20 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20">
                <Cpu className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white mb-1">AI Analysis Suite</h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  Component identification, wiring guidance, fault diagnosis & BS 7671 compliance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tools List */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            <h2 className="text-base font-bold text-white">Available Tools</h2>
          </div>

          <div className="space-y-3">
            {toolOptions.map((tool) => {
              const IconComponent = tool.icon;
              const colors = toolColors[tool.value] || { gradient: 'from-gray-400 to-gray-500', bgGradient: 'from-gray-500/20 to-gray-500/10' };

              return (
                <Link
                  key={tool.value}
                  to={`/electrician-tools/ai-tooling/${tool.value}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-2xl touch-manipulation active:scale-[0.98] transition-transform"
                >
                  <Card className="relative overflow-hidden bg-[#1e1e1e] border border-white/10 rounded-2xl group">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Icon with gradient background */}
                        <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${colors.gradient} shadow-lg`}>
                          <IconComponent className="h-7 w-7 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h3 className="text-base font-bold text-white mb-1">
                            {tool.label}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-white/60 leading-relaxed line-clamp-2">
                            {tool.description}
                          </p>
                        </div>

                        {/* Arrow indicator */}
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 group-active:bg-purple-500/20 transition-colors self-center">
                          <ArrowRight className="h-5 w-5 text-purple-400" />
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
