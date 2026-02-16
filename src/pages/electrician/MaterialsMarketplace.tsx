import { Cable } from 'lucide-react';
import UnifiedMarketplace from '@/components/marketplace/UnifiedMarketplace';

const MATERIALS_CATEGORIES = [
  { name: 'All', slug: undefined },
  { name: 'Cables', slug: 'cables' },
  { name: 'Consumer Units', slug: 'consumer-units' },
  { name: 'Circuit Protection', slug: 'circuit-protection' },
  { name: 'Sockets & Switches', slug: 'wiring-accessories' },
  { name: 'Lighting', slug: 'lighting' },
  { name: 'Containment', slug: 'containment' },
];

export default function MaterialsMarketplace() {
  return (
    <UnifiedMarketplace
      productType="materials"
      title="Materials Marketplace"
      icon={Cable}
      accentColor="yellow"
      searchPlaceholder="Search cables, MCBs, sockets..."
      categories={MATERIALS_CATEGORIES}
      supplierLabel="10 UK wholesalers"
      dealsTitle="Material Deals"
      listsPath="/electrician/materials/lists"
    />
  );
}
