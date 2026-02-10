import { WifiOff } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { AnimatePresence, motion } from "framer-motion";

export default function OfflineBanner() {
  const { isOnline } = useNetworkStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2 bg-amber-500/20 border-b border-amber-500/30 px-4 py-2">
            <WifiOff className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-medium text-amber-400">
              You're offline — showing cached data
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
