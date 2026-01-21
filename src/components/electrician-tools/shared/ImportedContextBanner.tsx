import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, X } from 'lucide-react';

interface ImportedContextBannerProps {
  source: string;
  circuitCount: number;
  onUseContext: () => void;
  onDismiss: () => void;
}

export const ImportedContextBanner = ({
  source,
  circuitCount,
  onUseContext,
  onDismiss
}: ImportedContextBannerProps) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl mb-4"
  >
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2 bg-elec-yellow/20 rounded-lg flex-shrink-0">
          <Zap className="h-5 w-5 text-elec-yellow" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-white truncate">
            {circuitCount} circuit{circuitCount !== 1 ? 's' : ''} imported from {source}
          </p>
          <p className="text-sm text-white/60">
            Click "Use Context" to populate the prompt
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <Button
          size="sm"
          variant="ghost"
          onClick={onDismiss}
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={onUseContext}
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          Use Context
        </Button>
      </div>
    </div>
  </motion.div>
);
