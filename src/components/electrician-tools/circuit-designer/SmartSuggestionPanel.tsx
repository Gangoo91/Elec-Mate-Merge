import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Zap, AlertTriangle } from 'lucide-react';

interface SmartSuggestionPanelProps {
  installationType: 'domestic' | 'commercial' | 'industrial';
  propertyAge?: string;
  budgetLevel?: string;
}

export const SmartSuggestionPanel = ({ installationType, propertyAge, budgetLevel }: SmartSuggestionPanelProps) => {
  const suggestions = {
    domestic: {
      icon: Info,
      title: "Domestic Installation Tips",
      items: [
        "✅ 230V Single Phase is standard for UK homes",
        "✅ RCD protection required for all socket circuits (Reg 411.3.3)",
        "✅ Consider future EV charging needs",
        propertyAge === 'new-build' && "⚠️ AFDDs required for new installations (BS 7671:2018+A3:2024)",
        "✅ Bathroom circuits require 30mA RCD protection (Section 701)"
      ].filter(Boolean) as string[]
    },
    commercial: {
      icon: Zap,
      title: "Commercial Installation Requirements",
      items: [
        "✅ Consider 400V Three Phase for larger loads",
        "✅ RCBOs recommended for all final circuits",
        propertyAge === 'new-build' && "⚠️ AFDDs mandatory for new commercial (BS 7671:2018+A3:2024)",
        "✅ Emergency lighting compliance required",
        "✅ Higher ambient temp (30°C) for ceiling voids",
        "✅ Fire alarm integration (BS 5839)",
        budgetLevel === 'premium' && "✅ Surge protection recommended (Reg 534.4)"
      ].filter(Boolean) as string[]
    },
    industrial: {
      icon: AlertTriangle,
      title: "Industrial Installation Considerations",
      items: [
        "✅ 400V Three Phase supply typically required",
        "✅ Higher fault currents - consider 10kA+ MCBs (Reg 536.1)",
        "✅ Steel Wire Armoured (SWA) cabling for mechanical protection",
        "✅ Motor starting currents (6-8x full load) - Type D MCBs",
        "✅ Diversity calculations essential for multiple motors",
        "⚠️ G59/G99 connection agreements may be required",
        "✅ Regular inspection intervals per BS 7671 (Reg 622)"
      ]
    }
  };

  const config = suggestions[installationType];
  const Icon = config.icon;

  return (
    <Alert className="mb-6 border-primary/30 bg-primary/5">
      <Icon className="h-5 w-5 text-primary" />
      <AlertTitle className="text-base font-semibold mb-2">{config.title}</AlertTitle>
      <AlertDescription>
        <ul className="space-y-1 text-sm">
          {config.items.map((item, idx) => (
            <li key={idx} className={item.startsWith('⚠️') ? 'text-amber-600 dark:text-amber-400' : ''}>
              {item}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};
