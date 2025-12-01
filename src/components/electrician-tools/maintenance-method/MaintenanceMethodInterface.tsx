import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MaintenanceEquipmentDetails } from '@/types/maintenance-method';
import { MaintenanceMethodInput } from './MaintenanceMethodInput';
import { MaintenanceMethodProcessingView } from './MaintenanceMethodProcessingView';
import { MaintenanceMethodResults } from './MaintenanceMethodResults';
import { useMaintenanceMethodJobPolling } from '@/hooks/useMaintenanceMethodJobPolling';
import { Wrench } from 'lucide-react';

export const MaintenanceMethodInterface = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [equipmentDetails, setEquipmentDetails] = useState<MaintenanceEquipmentDetails>({
    equipmentType: '',
    location: '',
    installationType: 'commercial'
  });
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { job, isPolling, cancelJob } = useMaintenanceMethodJobPolling(currentJobId);

  const handleGenerate = async () => {
    if (!query.trim()) {
      toast({
        title: 'Query Required',
        description: 'Please describe the equipment requiring maintenance',
        variant: 'destructive'
      });
      return;
    }

    if (!equipmentDetails.equipmentType || !equipmentDetails.location) {
      toast({
        title: 'Missing Information',
        description: 'Please provide equipment type and location',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const { data, error } = await supabase.functions.invoke('create-maintenance-method-job', {
        body: {
          query,
          equipmentDetails,
          detailLevel: 'normal'
        }
      });

      if (error) throw error;

      setCurrentJobId(data.jobId);
      
      toast({
        title: 'Generation Started',
        description: 'Generating detailed maintenance instructions...'
      });
    } catch (error: any) {
      console.error('Error creating maintenance method job:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to start generation',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    await cancelJob();
    toast({
      title: 'Cancelled',
      description: 'Maintenance method generation cancelled'
    });
  };

  const handleReset = () => {
    setCurrentJobId(null);
    setQuery('');
    setEquipmentDetails({
      equipmentType: '',
      location: '',
      installationType: 'commercial'
    });
  };

  // Show results if completed
  if (job?.status === 'completed' && job.method_data) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Maintenance Instructions</h2>
          <Button onClick={handleReset} variant="outline">
            Generate New Instructions
          </Button>
        </div>
        <MaintenanceMethodResults methodData={job.method_data} />
      </div>
    );
  }

  // Show processing if job is running
  if (job && (job.status === 'pending' || job.status === 'processing')) {
    return (
      <MaintenanceMethodProcessingView
        progress={job.progress}
        currentStep={job.current_step}
        onCancel={isPolling ? handleCancel : undefined}
      />
    );
  }

  // Show input form
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Maintenance Method Specialist
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Generate comprehensive step-by-step maintenance instructions for electrical equipment
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Equipment Query */}
          <div className="space-y-2">
            <Label htmlFor="query">Equipment Description *</Label>
            <Textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe the equipment requiring maintenance (e.g., 'Three-phase distribution board serving commercial kitchen equipment, 15 years old with visible signs of corrosion')"
              className="min-h-[100px] resize-none"
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Be specific about equipment type, age, condition, and any known issues
            </p>
          </div>

          {/* Equipment Details */}
          <MaintenanceMethodInput
            equipmentDetails={equipmentDetails}
            onChange={setEquipmentDetails}
          />

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isSubmitting || !query.trim()}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? 'Starting Generation...' : 'Generate Maintenance Instructions'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            This will generate 15+ detailed maintenance steps with safety procedures,
            tools required, inspection checkpoints, and BS 7671 references
          </p>
        </CardContent>
      </Card>

      {/* Show error if failed */}
      {job?.status === 'failed' && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">
              {job.error_message || 'Generation failed. Please try again.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
