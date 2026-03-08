import { Wrench, LayoutGrid, Hammer, Zap, Gauge, HardHat } from 'lucide-react';
import UnifiedMarketplace from '@/components/marketplace/UnifiedMarketplace';

const TOOLS_CATEGORIES = [
  { name: 'All', slug: undefined, icon: LayoutGrid },
  { name: 'Hand Tools', slug: 'hand-tools', icon: Hammer },
  { name: 'Power Tools', slug: 'power-tools', icon: Zap },
  { name: 'Test Equipment', slug: 'test-equipment', icon: Gauge },
  { name: 'PPE', slug: 'ppe', icon: HardHat },
];

export default function ToolsMarketplace() {
  return (
    <UnifiedMarketplace
      productType="tools"
      title="Tools Marketplace"
      icon={Wrench}
      accentColor="orange"
      searchPlaceholder="Search tools, brands..."
      categories={TOOLS_CATEGORIES}
      supplierLabel="UK suppliers"
      dealsTitle="Deals of the Day"
      listsPath="/electrician/tools/lists"
    />
  );
}
