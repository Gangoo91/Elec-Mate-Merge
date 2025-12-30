import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Zap, 
  HardHat, 
  Shield, 
  Wrench, 
  Ruler, 
  Eye,
  X 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { EquipmentFormData } from './AddEquipmentForm';

interface QuickTemplatesProps {
  onSelect: (template: Partial<EquipmentFormData>) => void;
  onClose: () => void;
}

interface EquipmentTemplate {
  name: string;
  category: string;
  requires_inspection: boolean;
  inspection_interval_days: number;
  requires_calibration: boolean;
  calibration_interval_days: number;
  icon: React.ElementType;
}

const TEMPLATES: { category: string; icon: React.ElementType; items: EquipmentTemplate[] }[] = [
  {
    category: 'Test Equipment',
    icon: Zap,
    items: [
      { name: 'Multifunction Tester (MFT)', category: 'test_equipment', requires_inspection: true, inspection_interval_days: 90, requires_calibration: true, calibration_interval_days: 365, icon: Zap },
      { name: 'Insulation Resistance Tester', category: 'test_equipment', requires_inspection: true, inspection_interval_days: 90, requires_calibration: true, calibration_interval_days: 365, icon: Zap },
      { name: 'Earth Loop Impedance Tester', category: 'test_equipment', requires_inspection: true, inspection_interval_days: 90, requires_calibration: true, calibration_interval_days: 365, icon: Zap },
      { name: 'RCD Tester', category: 'test_equipment', requires_inspection: true, inspection_interval_days: 90, requires_calibration: true, calibration_interval_days: 365, icon: Zap },
      { name: 'Voltage Indicator', category: 'test_equipment', requires_inspection: true, inspection_interval_days: 30, requires_calibration: false, calibration_interval_days: 0, icon: Zap },
      { name: 'Proving Unit', category: 'test_equipment', requires_inspection: true, inspection_interval_days: 30, requires_calibration: false, calibration_interval_days: 0, icon: Zap },
      { name: 'Clamp Meter', category: 'test_equipment', requires_inspection: true, inspection_interval_days: 90, requires_calibration: true, calibration_interval_days: 365, icon: Zap },
      { name: 'PAT Tester', category: 'test_equipment', requires_inspection: true, inspection_interval_days: 90, requires_calibration: true, calibration_interval_days: 365, icon: Zap },
      { name: 'Thermal Imaging Camera', category: 'test_equipment', requires_inspection: true, inspection_interval_days: 180, requires_calibration: true, calibration_interval_days: 365, icon: Zap },
    ],
  },
  {
    category: 'PPE',
    icon: HardHat,
    items: [
      { name: 'Safety Helmet', category: 'ppe', requires_inspection: true, inspection_interval_days: 30, requires_calibration: false, calibration_interval_days: 0, icon: HardHat },
      { name: 'Safety Glasses', category: 'ppe', requires_inspection: true, inspection_interval_days: 30, requires_calibration: false, calibration_interval_days: 0, icon: Eye },
      { name: 'Hi-Vis Vest', category: 'ppe', requires_inspection: true, inspection_interval_days: 30, requires_calibration: false, calibration_interval_days: 0, icon: HardHat },
      { name: 'Safety Boots', category: 'ppe', requires_inspection: true, inspection_interval_days: 90, requires_calibration: false, calibration_interval_days: 0, icon: HardHat },
      { name: 'Insulated Gloves', category: 'ppe', requires_inspection: true, inspection_interval_days: 30, requires_calibration: false, calibration_interval_days: 0, icon: Shield },
      { name: 'Ear Defenders', category: 'ppe', requires_inspection: true, inspection_interval_days: 90, requires_calibration: false, calibration_interval_days: 0, icon: HardHat },
      { name: 'Dust Mask / FFP3', category: 'ppe', requires_inspection: true, inspection_interval_days: 30, requires_calibration: false, calibration_interval_days: 0, icon: Shield },
      { name: 'Arc Flash Suit', category: 'ppe', requires_inspection: true, inspection_interval_days: 90, requires_calibration: false, calibration_interval_days: 0, icon: Shield },
    ],
  },
  {
    category: 'Safety Equipment',
    icon: Shield,
    items: [
      { name: 'First Aid Kit', category: 'safety_equipment', requires_inspection: true, inspection_interval_days: 90, requires_calibration: false, calibration_interval_days: 0, icon: Shield },
      { name: 'Fire Extinguisher', category: 'safety_equipment', requires_inspection: true, inspection_interval_days: 365, requires_calibration: false, calibration_interval_days: 0, icon: Shield },
      { name: 'Safety Barriers', category: 'safety_equipment', requires_inspection: true, inspection_interval_days: 90, requires_calibration: false, calibration_interval_days: 0, icon: Shield },
      { name: 'Warning Signs', category: 'safety_equipment', requires_inspection: true, inspection_interval_days: 180, requires_calibration: false, calibration_interval_days: 0, icon: Shield },
      { name: 'Locking Off Kit', category: 'safety_equipment', requires_inspection: true, inspection_interval_days: 90, requires_calibration: false, calibration_interval_days: 0, icon: Shield },
      { name: 'Rescue Hook', category: 'safety_equipment', requires_inspection: true, inspection_interval_days: 90, requires_calibration: false, calibration_interval_days: 0, icon: Shield },
    ],
  },
  {
    category: 'Hand Tools',
    icon: Wrench,
    items: [
      { name: 'VDE Screwdriver Set', category: 'hand_tools', requires_inspection: true, inspection_interval_days: 90, requires_calibration: false, calibration_interval_days: 0, icon: Wrench },
      { name: 'VDE Side Cutters', category: 'hand_tools', requires_inspection: true, inspection_interval_days: 90, requires_calibration: false, calibration_interval_days: 0, icon: Wrench },
      { name: 'VDE Pliers', category: 'hand_tools', requires_inspection: true, inspection_interval_days: 90, requires_calibration: false, calibration_interval_days: 0, icon: Wrench },
      { name: 'Cable Strippers', category: 'hand_tools', requires_inspection: true, inspection_interval_days: 90, requires_calibration: false, calibration_interval_days: 0, icon: Wrench },
      { name: 'Crimp Tool', category: 'hand_tools', requires_inspection: true, inspection_interval_days: 90, requires_calibration: false, calibration_interval_days: 0, icon: Wrench },
      { name: 'Torch / Head Torch', category: 'hand_tools', requires_inspection: true, inspection_interval_days: 30, requires_calibration: false, calibration_interval_days: 0, icon: Wrench },
    ],
  },
  {
    category: 'Measuring',
    icon: Ruler,
    items: [
      { name: 'Tape Measure', category: 'measuring', requires_inspection: true, inspection_interval_days: 180, requires_calibration: false, calibration_interval_days: 0, icon: Ruler },
      { name: 'Spirit Level', category: 'measuring', requires_inspection: true, inspection_interval_days: 180, requires_calibration: false, calibration_interval_days: 0, icon: Ruler },
      { name: 'Cable Detector', category: 'measuring', requires_inspection: true, inspection_interval_days: 90, requires_calibration: true, calibration_interval_days: 365, icon: Ruler },
      { name: 'Laser Level', category: 'measuring', requires_inspection: true, inspection_interval_days: 180, requires_calibration: true, calibration_interval_days: 365, icon: Ruler },
    ],
  },
];

export function QuickTemplates({ onSelect, onClose }: QuickTemplatesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Quick Add</h2>
          <p className="text-sm text-muted-foreground">
            Tap to add common equipment
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="h-[70vh]">
        <div className="space-y-6 pr-4">
          {TEMPLATES.map((section) => (
            <div key={section.category} className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <section.icon className="h-4 w-4" />
                {section.category}
              </div>
              <div className="grid grid-cols-1 gap-2">
                {section.items.map((template) => (
                  <Button
                    key={template.name}
                    variant="outline"
                    className="h-12 justify-start text-left"
                    onClick={() => onSelect({
                      name: template.name,
                      category: template.category,
                      requires_inspection: template.requires_inspection,
                      inspection_interval_days: template.inspection_interval_days,
                      requires_calibration: template.requires_calibration,
                      calibration_interval_days: template.calibration_interval_days,
                    })}
                  >
                    <template.icon className="h-4 w-4 mr-3 text-primary" />
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
}
