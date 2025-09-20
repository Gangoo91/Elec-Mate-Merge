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
          return materialCategory.includes('cable') || 
                 materialCategory.includes('wiring') ||
                 materialCategory.includes('armoured') ||
                 materialCategory.includes('sleeve') ||
                 materialCategory.includes('twin') ||
                 materialCategory.includes('earth') ||
                 searchedProduct.includes('cable') ||
                 materialName.includes('cable') ||
                 materialName.includes('wire');
                 
        case 'components':
          return materialCategory.includes('component') ||
                 materialCategory.includes('switch') ||
                 materialCategory.includes('socket') ||
                 materialCategory.includes('consumer') ||
                 materialCategory.includes('board') ||
                 materialCategory.includes('unit') ||
                 searchedProduct.includes('mcb') ||
                 searchedProduct.includes('rcd') ||
                 searchedProduct.includes('switch') ||
                 searchedProduct.includes('socket') ||
                 materialName.includes('mcb') ||
                 materialName.includes('rcd') ||
                 materialName.includes('switch') ||
                 materialName.includes('socket');
                 
        case 'protection':
          return materialCategory.includes('protection') ||
                 materialCategory.includes('safety') ||
                 materialCategory.includes('earthing') ||
                 materialCategory.includes('earth') ||
                 materialCategory.includes('rcd') ||
                 materialCategory.includes('surge') ||
                 searchedProduct.includes('protection') ||
                 searchedProduct.includes('earth') ||
                 searchedProduct.includes('rcd') ||
                 materialName.includes('protection') ||
                 materialName.includes('earth') ||
                 materialName.includes('rcd');
                 
        case 'accessories':
          return materialCategory.includes('accessories') ||
                 materialCategory.includes('installation') ||
                 materialCategory.includes('junction') ||
                 materialCategory.includes('gland') ||
                 materialCategory.includes('box') ||
                 materialCategory.includes('conduit') ||
                 materialCategory.includes('trunking') ||
                 searchedProduct.includes('box') ||
                 searchedProduct.includes('conduit') ||
                 searchedProduct.includes('gland') ||
                 searchedProduct.includes('clip') ||
                 materialName.includes('box') ||
                 materialName.includes('gland') ||
                 materialName.includes('clip');
                 
        case 'lighting':
          return materialCategory.includes('lighting') ||
                 materialCategory.includes('light') ||
                 materialCategory.includes('led') ||
                 materialCategory.includes('downlight') ||
                 materialCategory.includes('batten') ||
                 materialCategory.includes('fitting') ||
                 searchedProduct.includes('light') ||
                 searchedProduct.includes('led') ||
                 searchedProduct.includes('lamp') ||
                 materialName.includes('light') ||
                 materialName.includes('led') ||
                 materialName.includes('lamp');
                 
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