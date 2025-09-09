import { useMemo } from 'react';
import { useMaterialsData, type MaterialItem } from './useMaterialsData';
import { type ToolItem } from './useToolsData';

// Map material categories to tool categories
const mapMaterialToToolCategory = (materialCategory: string): string => {
  const categoryMappings: Record<string, string> = {
    // Cable and wiring products
    'Hook Up Wire': 'Cable & Wiring',
    'Cable': 'Cable & Wiring', 
    'Power Cable': 'Cable & Wiring',
    'Control Cable': 'Cable & Wiring',
    'Ethernet Cable': 'Cable & Wiring',
    'Coaxial Cable': 'Cable & Wiring',
    'SWA Cable': 'Cable & Wiring',
    'Fire Alarm Cable': 'Cable & Wiring',
    
    // Installation tools and accessories
    'Cable Rods': 'Hand Tools',
    'Cable Rod Sets': 'Hand Tools',
    'Fish Tape': 'Hand Tools',
    'Cable Pulling': 'Hand Tools',
    'Cable Ties': 'Installation Tools',
    'Cable Clips': 'Installation Tools',
    'Cable Clips & Accessories': 'Installation Tools',
    'Cable Management': 'Installation Tools',
    'Conduit': 'Installation Tools',
    'Mini Trunking': 'Installation Tools',
    'Trunking': 'Installation Tools',
    'Trunking & Accessories': 'Installation Tools',
    'Accessories': 'Installation Tools',
    
    // Electrical components and fittings
    'Switches': 'Electrical Components',
    'Sockets': 'Electrical Components',
    'Outlets': 'Electrical Components',
    'Light Switches': 'Electrical Components',
    'Dimmers': 'Electrical Components',
    'Electrical Accessories': 'Electrical Components',
    'Wiring Accessories': 'Electrical Components',
    'Plugs & Sockets': 'Electrical Components',
    'Junction Boxes': 'Electrical Components',
    'Consumer Units': 'Electrical Components',
    'Distribution': 'Electrical Components',
    'RCDs': 'Electrical Components',
    'MCBs': 'Electrical Components',
    'Fuses': 'Electrical Components',
    'Isolators': 'Electrical Components',
    
    // Lighting
    'LED Lighting': 'Lighting',
    'Lighting': 'Lighting',
    'Light Fittings': 'Lighting',
    'Downlights': 'Lighting',
    'Emergency Lighting': 'Lighting',
    'Commercial Lighting': 'Lighting',
    'Outdoor Lighting': 'Lighting',
    
    // Test equipment
    'Test Equipment': 'Test Equipment',
    'Testing': 'Test Equipment',
    'Meters': 'Test Equipment',
    'Multimeters': 'Test Equipment',
    'Voltage Testers': 'Test Equipment',
    'PAT Testing': 'Test Equipment',
    
    // Tools (actual tools in materials)
    'Tools': 'Hand Tools',
    'Hand Tools': 'Hand Tools',
    'Power Tools': 'Power Tools',
    'Specialist Tools': 'Specialist Tools',
    
    // Safety and protection
    'Safety': 'Safety Tools',
    'PPE': 'PPE',
    'Protection': 'Safety Tools',
    'Emergency': 'Safety Tools',
    
    // Default fallback
    default: 'Installation Tools'
  };
  
  return categoryMappings[materialCategory] || categoryMappings.default;
};

// Transform MaterialItem to ToolItem interface
const transformMaterialToTool = (material: MaterialItem): ToolItem => {
  return {
    id: material.id,
    name: material.name,
    category: mapMaterialToToolCategory(material.category),
    price: material.price,
    supplier: material.supplier,
    image: material.image || '/placeholder.svg',
    stockStatus: 'In Stock' as const,
    isOnSale: false,
    salePrice: undefined,
    highlights: [],
    productUrl: material.productUrl,
    description: material.description
  };
};

export const useMaterialsAsTools = () => {
  const { rawMaterials, isLoading, error, refetch } = useMaterialsData();

  const toolsFromMaterials = useMemo(() => {
    if (!rawMaterials || rawMaterials.length === 0) {
      return [];
    }

    // Filter and transform materials that are suitable as tools
    return rawMaterials
      .filter(material => {
        const category = material.category?.toLowerCase() || '';
        const name = material.name?.toLowerCase() || '';
        
        // Include materials that are tool-like or installation related
        return (
          category.includes('cable rod') ||
          category.includes('fish tape') ||
          category.includes('cable tie') ||
          category.includes('cable clip') ||
          category.includes('conduit') ||
          category.includes('trunking') ||
          category.includes('switch') ||
          category.includes('socket') ||
          category.includes('test') ||
          category.includes('meter') ||
          category.includes('tool') ||
          category.includes('accessorie') ||
          name.includes('crimper') ||
          name.includes('stripper') ||
          name.includes('cutter') ||
          name.includes('plier') ||
          name.includes('screwdriver') ||
          name.includes('tester') ||
          name.includes('detector') ||
          name.includes('kit') ||
          name.includes('set')
        );
      })
      .map(transformMaterialToTool);
  }, [rawMaterials]);

  return {
    data: toolsFromMaterials,
    isLoading,
    error,
    refetch
  };
};