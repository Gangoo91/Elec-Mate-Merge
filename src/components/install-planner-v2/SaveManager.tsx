import { Button } from '@/components/ui/button';
import { Save, FolderOpen } from 'lucide-react';
import { InstallPlanDataV2 } from './types';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { storageSetJSONSync, storageGetJSONSync } from '@/utils/storage';

interface SaveManagerProps {
  planData: InstallPlanDataV2;
  onLoad: (data: InstallPlanDataV2) => void;
}

export const SaveManager = ({ planData, onLoad }: SaveManagerProps) => {
  const { toast } = useToast();
  const haptic = useHaptic();

  const handleSave = () => {
    haptic.success();
    const dataToSave = {
      ...planData,
      savedAt: new Date().toISOString(),
    };
    storageSetJSONSync('install-planner-v2', dataToSave);
    toast({
      title: 'Saved',
      description: 'Your plan has been saved successfully',
    });
  };

  const handleLoad = () => {
    haptic.medium();
    const data = storageGetJSONSync<InstallPlanDataV2 | null>('install-planner-v2', null);
    if (data) {
      onLoad(data);
      toast({
        title: 'Loaded',
        description: 'Your saved plan has been loaded',
      });
    } else {
      toast({
        title: 'No saved data',
        description: 'No previously saved plan found',
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleSave} className="gap-2">
        <Save className="h-4 w-4" /> Save
      </Button>
      <Button variant="outline" size="sm" onClick={handleLoad} className="gap-2">
        <FolderOpen className="h-4 w-4" /> Load
      </Button>
    </div>
  );
};
