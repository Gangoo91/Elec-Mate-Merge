import {
  Cable,
  LayoutGrid,
  Box,
  ShieldCheck,
  ToggleRight,
  Lightbulb,
  PipetteIcon,
} from 'lucide-react';
import UnifiedMarketplace from '@/components/marketplace/UnifiedMarketplace';

const MATERIALS_CATEGORIES = [
  { name: 'All', slug: undefined, icon: LayoutGrid },
  { name: 'Cables', slug: 'cables', icon: Cable },
  { name: 'Consumer Units', slug: 'consumer-units', icon: Box },
  { name: 'Circuit Protection', slug: 'circuit-protection', icon: ShieldCheck },
  { name: 'Sockets & Switches', slug: 'wiring-accessories', icon: ToggleRight },
  { name: 'Lighting', slug: 'lighting', icon: Lightbulb },
  { name: 'Containment', slug: 'containment', icon: PipetteIcon },
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
