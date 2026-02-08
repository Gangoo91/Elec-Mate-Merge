import { motion } from "framer-motion";
import { Zap, BookOpen, Calculator, Shield, Wrench } from "lucide-react";

interface WelcomeScreenProps {
  onSelectQuery: (query: string) => void;
}

const exampleQueries = [
  {
    icon: BookOpen,
    colour: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    category: "Regulations",
    query: "What are the RCD requirements for bathrooms under BS 7671?",
  },
  {
    icon: Calculator,
    colour: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    category: "Calculations",
    query: "How do I calculate voltage drop for a 6mm twin & earth cable?",
  },
  {
    icon: Shield,
    colour: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    category: "Testing",
    query: "What is the correct procedure for testing loop impedance?",
  },
  {
    icon: Wrench,
    colour: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    category: "Practical",
    query: "How do I wire a consumer unit with dual RCD split-load?",
  },
];

export function WelcomeScreen({ onSelectQuery }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-5 py-10">
      {/* Branding hero */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4 mb-10"
      >
        {/* Icon with glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-elec-yellow/20 rounded-3xl blur-xl scale-150" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-elec-yellow via-amber-400 to-amber-500 flex items-center justify-center shadow-xl shadow-elec-yellow/30">
            <Zap className="w-8 h-8 text-black" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            Elec-AI Assistant
          </h2>
          <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
            Your BS 7671 expert. Ask about regulations, calculations, testing or installation guidance.
          </p>
        </div>
      </motion.div>

      {/* Prompt label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3 self-start max-w-md w-full mx-auto"
      >
        Try asking
      </motion.p>

      {/* Example Queries — 2x2 grid on wider, stacked on narrow */}
      <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {exampleQueries.map((item, idx) => (
          <motion.button
            key={item.category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 + idx * 0.07 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectQuery(item.query)}
            className={`w-full flex items-start gap-3 rounded-xl border ${item.border} bg-card/40 backdrop-blur-sm px-3.5 py-3 text-left active:bg-muted/50 touch-manipulation min-h-[44px] transition-colors`}
          >
            <div className={`${item.bg} rounded-lg p-2 shrink-0`}>
              <item.icon className={`w-4 h-4 ${item.colour}`} />
            </div>
            <div className="min-w-0 flex-1">
              <span className={`text-[11px] font-semibold uppercase tracking-wide ${item.colour}`}>
                {item.category}
              </span>
              <p className="text-[13px] text-foreground/70 leading-snug mt-0.5 line-clamp-2">
                {item.query}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
