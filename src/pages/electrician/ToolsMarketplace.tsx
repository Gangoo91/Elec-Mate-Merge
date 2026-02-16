import { Wrench } from 'lucide-react';
import UnifiedMarketplace from '@/components/marketplace/UnifiedMarketplace';

const TOOLS_CATEGORIES = [
  { name: 'All', slug: undefined },
  { name: 'Hand Tools', slug: 'hand-tools' },
  { name: 'Power Tools', slug: 'power-tools' },
  { name: 'Test Equipment', slug: 'test-equipment' },
  { name: 'PPE', slug: 'ppe' },
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
    />
  );
}
