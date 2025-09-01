
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowLeft, Package, ExternalLink, Loader2 } from 'lucide-react';
import { MaterialCard } from '@/components/electrician-materials/MaterialCard';
import { useCategoryMaterials } from '@/hooks/useCategoryMaterials';
import { Skeleton } from '@/components/ui/skeleton';

const CategoryMaterials = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { materials, categoryData, isLoading, error, refetch } = useCategoryMaterials(categoryId || '');

  // Filter materials based on search query
  const filteredMaterials = useMemo(() => {
    if (!materials) return [];
    
    if (!searchQuery.trim()) return materials;
    
    const query = searchQuery.toLowerCase();
    return materials.filter(material => 
      material.name?.toLowerCase().includes(query) ||
      material.category?.toLowerCase().includes(query) ||
      material.supplier?.toLowerCase().includes(query)
    );
  }, [materials, searchQuery]);

  if (!categoryId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Category Not Found</h1>
          <Button onClick={() => navigate('/electrician/materials')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </div>
      </div>
    );
  }

  const handleRetry = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white mb-4">Error Loading Materials</h1>
          <p className="text-muted-foreground">
            {error?.message || 'Failed to load materials data'}
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRetry} className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
              <Search className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={() => navigate('/electrician/materials')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <Button 
          onClick={() => navigate('/electrician/materials')} 
          variant="outline"
          className="mb-4 border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Button>
        
        <div className="flex items-center gap-3 mb-4">
          <Package className="h-8 w-8 text-elec-yellow" />
          <div>
            <h1 className="text-3xl font-bold text-white">
              {categoryData?.name || categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1)}
            </h1>
            {categoryData?.description && (
              <p className="text-muted-foreground mt-1">{categoryData.description}</p>
            )}
          </div>
        </div>

        {/* Search and Stats Container */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Input
              placeholder={`Search ${categoryData?.name || 'materials'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm bg-elec-gray border-elec-yellow/20"
            />
            <Button 
              onClick={handleRetry}
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              {isLoading ? '...' : filteredMaterials.length} items
            </Badge>
            {searchQuery && (
              <Badge variant="secondary">
                Filtered results
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2 bg-muted/20" />
                <Skeleton className="h-3 w-1/2 mb-4 bg-muted/20" />
                <Skeleton className="h-8 w-full mb-2 bg-muted/20" />
                <Skeleton className="h-6 w-2/3 bg-muted/20" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Materials Grid */}
      {!isLoading && (
        <>
          {filteredMaterials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMaterials.map((material) => (
                <MaterialCard 
                  key={`${material.id}-${material.name}`} 
                  item={material} 
                />
              ))}
            </div>
          ) : (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-center text-white flex items-center justify-center gap-2">
                  <Package className="h-5 w-5" />
                  No Materials Found
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {searchQuery ? (
                  <>
                    <p className="text-muted-foreground mb-4">
                      No materials found matching "{searchQuery}"
                    </p>
                    <Button 
                      onClick={() => setSearchQuery('')}
                      variant="outline"
                      className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                    >
                      Clear Search
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground mb-4">
                      No materials available in this category yet.
                    </p>
                    <Button 
                      onClick={handleRetry}
                      className="bg-elec-yellow text-elec-dark hover:bg-amber-400"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Refresh Data
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Category Stats Footer */}
      {!isLoading && categoryData && (
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg">
            <Package className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm text-elec-yellow">
              {filteredMaterials.length} materials in {categoryData.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMaterials;
