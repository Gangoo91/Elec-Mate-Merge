import { useMemo } from 'react';
import { useMaterialsData, ProcessedCategoryData } from './useMaterialsData';

interface UseCategoryMaterialsResult {
  materials: any[];
  categoryData: ProcessedCategoryData | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  error: any;
  refetch: () => void;
}

export const useCategoryMaterials = (categoryId: string): UseCategoryMaterialsResult => {
  const materialsQuery = useMaterialsData();
  const { data: categories, isLoading, isRefetching, error, refetch } = materialsQuery;
  const rawMaterials = materialsQuery.rawMaterials;

  // Filter materials by category
  const categoryMaterials = useMemo(() => {
    if (!rawMaterials || !Array.isArray(rawMaterials)) return [];
    
    return rawMaterials.filter((material: any) => {
      if (!material.category) return false;
      
      const materialCategory = material.category.toLowerCase();
      
      // Map comprehensive scraper categories to our category IDs
      switch (categoryId) {
        case 'cables':
          return materialCategory.includes('cables') || 
                 materialCategory.includes('wiring') ||
                 materialCategory.includes('cable');
        case 'components':
          return materialCategory.includes('electrical components') ||
                 materialCategory.includes('components') ||
                 materialCategory.includes('consumer units') ||
                 materialCategory.includes('mcb') ||
                 materialCategory.includes('rcd');
        case 'protection':
          return materialCategory.includes('protection') ||
                 materialCategory.includes('safety') ||
                 materialCategory.includes('earthing');
        case 'accessories':
          return materialCategory.includes('accessories') ||
                 materialCategory.includes('installation') ||
                 materialCategory.includes('junction') ||
                 materialCategory.includes('glands');
        case 'lighting':
          return materialCategory.includes('lighting') ||
                 materialCategory.includes('led') ||
                 materialCategory.includes('downlight') ||
                 materialCategory.includes('batten');
        case 'tools':
          return materialCategory.includes('tools') ||
                 materialCategory.includes('testing') ||
                 materialCategory.includes('electrical tools');
        default:
          return false;
      }
    });
  }, [rawMaterials, categoryId]);

  // Find the category data
  const categoryData = useMemo(() => {
    return categories?.find(cat => cat.id === categoryId);
  }, [categories, categoryId]);

  return {
    materials: categoryMaterials,
    categoryData,
    isLoading,
    isRefetching,
    error,
    refetch
  };
};