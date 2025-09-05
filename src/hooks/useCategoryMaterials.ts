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

  // Enhanced material filtering with multiple criteria
  const categoryMaterials = useMemo(() => {
    if (!rawMaterials || !Array.isArray(rawMaterials)) return [];
    
    return rawMaterials.filter((material: any) => {
      const materialCategory = material.category?.toLowerCase() || '';
      const searchedProduct = material.searched_product?.toLowerCase() || '';
      const materialName = material.name?.toLowerCase() || '';
      
      // Enhanced category filtering with multiple search criteria
      switch (categoryId) {
        case 'cables':
          return materialCategory.includes('cables') || 
                 materialCategory.includes('wiring') ||
                 materialCategory.includes('cable') ||
                 searchedProduct.includes('cable') ||
                 materialName.includes('cable');
                 
        case 'components':
          return materialCategory.includes('electrical components') ||
                 materialCategory.includes('components') ||
                 materialCategory.includes('consumer units') ||
                 searchedProduct.includes('mcb') ||
                 searchedProduct.includes('rcd') ||
                 searchedProduct.includes('switch') ||
                 searchedProduct.includes('socket') ||
                 materialName.includes('mcb') ||
                 materialName.includes('rcd');
                 
        case 'protection':
          return materialCategory.includes('protection') ||
                 materialCategory.includes('safety') ||
                 materialCategory.includes('earthing') ||
                 searchedProduct.includes('protection') ||
                 searchedProduct.includes('earth') ||
                 materialName.includes('protection');
                 
        case 'accessories':
          return materialCategory.includes('accessories') ||
                 materialCategory.includes('installation') ||
                 materialCategory.includes('junction') ||
                 materialCategory.includes('glands') ||
                 searchedProduct.includes('box') ||
                 searchedProduct.includes('conduit') ||
                 searchedProduct.includes('gland') ||
                 materialName.includes('box');
                 
        case 'lighting':
          return materialCategory.includes('lighting') ||
                 materialCategory.includes('led') ||
                 materialCategory.includes('downlight') ||
                 materialCategory.includes('batten') ||
                 searchedProduct.includes('light') ||
                 searchedProduct.includes('led') ||
                 materialName.includes('light') ||
                 materialName.includes('led');
                 
        case 'tools':
          return materialCategory.includes('tools') ||
                 materialCategory.includes('testing') ||
                 materialCategory.includes('electrical tools') ||
                 searchedProduct.includes('tool') ||
                 searchedProduct.includes('test') ||
                 searchedProduct.includes('meter') ||
                 materialName.includes('tester') ||
                 materialName.includes('meter');
                 
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