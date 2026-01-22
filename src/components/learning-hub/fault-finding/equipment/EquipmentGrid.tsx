import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Wrench, Shield } from 'lucide-react';
import { testEquipment, TestEquipment } from '../data/faultFindingData';
import { cn } from '@/lib/utils';

interface EquipmentGridProps {
  onSelectEquipment: (equipmentId: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 500, damping: 30 }
  }
};

const EquipmentGrid = ({ onSelectEquipment }: EquipmentGridProps) => {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Equipment List */}
      <div>
        <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider px-1 mb-2">
          Test Instruments
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {testEquipment.map((equipment: TestEquipment) => (
            <motion.div
              key={equipment.id}
              variants={itemVariants}
              onClick={() => onSelectEquipment(equipment.id)}
              className="flex items-center gap-3 p-3.5 cursor-pointer touch-manipulation active:bg-white/[0.04] transition-colors"
            >
              <div className="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-purple-500">
                <Wrench className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-medium text-white leading-tight">
                  {equipment.instrument}
                </h3>
                <p className="text-[13px] text-white/50 leading-tight mt-0.5 line-clamp-1">
                  {equipment.uses.slice(0, 2).join(', ')}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[13px] text-white/30">{equipment.uses.length} uses</span>
                <ChevronRight className="h-4 w-4 text-white/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Standards reminder */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.02]">
          <Shield className="h-4 w-4 text-white/30 flex-shrink-0" />
          <p className="text-[12px] text-white/40">
            All equipment must comply with GS38 and be regularly calibrated
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EquipmentGrid;
