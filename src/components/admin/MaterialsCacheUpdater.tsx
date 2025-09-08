import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { updateMaterialsCache } from '@/utils/materialsCache';

const MaterialsCacheUpdater = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const updateResult = await updateMaterialsCache();
      setResult(updateResult);
      console.log('Materials cache update result:', updateResult);
    } catch (error) {
      console.error('Failed to update materials cache:', error);
      setResult({ success: false, error: error.message });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Materials Cache Updater</h2>
      <p className="text-muted-foreground">
        Click to populate the materials cache with electrical materials from suppliers.
      </p>
      
      <Button 
        onClick={handleUpdate} 
        disabled={isUpdating}
        className="w-full"
      >
        {isUpdating ? 'Updating Materials Cache...' : 'Update Materials Cache'}
      </Button>
      
      {result && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-semibold">Result:</h3>
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MaterialsCacheUpdater;