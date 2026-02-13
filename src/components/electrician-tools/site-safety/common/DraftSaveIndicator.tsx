import { Cloud, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DraftSaveIndicatorProps {
  status: "idle" | "saved" | "recovered";
}

export function DraftSaveIndicator({ status }: DraftSaveIndicatorProps) {
  if (status === "idle") return null;

  return (
    <AnimatePresence>
      {status === "saved" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-[10px] font-medium text-green-400"
        >
          <Check className="h-2.5 w-2.5" />
          Draft saved
        </motion.span>
      )}
      {status === "recovered" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-[10px] font-medium text-amber-400"
        >
          <Cloud className="h-2.5 w-2.5" />
          Recovered
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default DraftSaveIndicator;
