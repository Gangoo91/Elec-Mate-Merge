import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, Loader2, Trophy, MapPin } from 'lucide-react';
import { useCreateJob } from '@/hooks/useJobs';
import { useUpdateTender, type Tender } from '@/hooks/useTenders';
import { toast } from 'sonner';

interface ConvertTenderToJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tender: Tender | null;
}

export function ConvertTenderToJobDialog({ open, onOpenChange, tender }: ConvertTenderToJobDialogProps) {
  const createJobMutation = useCreateJob();
  const updateTenderMutation = useUpdateTender();

  const [formData, setFormData] = useState({
    title: '',
    client: '',
    location: '',
    value: 0,
    description: '',
    status: 'Pending' as const,
    workers_count: 1,
    start_date: '',
  });

  // Pre-fill form when tender changes
  useEffect(() => {
    if (tender) {
      setFormData({
        title: tender.title,
        client: tender.client,
        location: '', // Tender doesn't have location, user can fill
        value: tender.value || 0,
        description: tender.description || '',
        status: 'Pending',
        workers_count: 1,
        start_date: '',
      });
    }
  }, [tender]);

  const handleSubmit = async () => {
    if (!tender) return;

    try {
      // Create the job
      await createJobMutation.mutateAsync({
        title: formData.title,
        client: formData.client,
        location: formData.location || 'TBC',
        lat: null,
        lng: null,
        status: formData.status,
        progress: 0,
        start_date: formData.start_date || null,
        end_date: null,
        value: formData.value,
        workers_count: formData.workers_count,
        description: formData.description || null,
      });

      // Update tender notes to reference conversion
      await updateTenderMutation.mutateAsync({
        id: tender.id,
        data: {
          notes: `${tender.notes || ''}\n\n[Converted to job on ${new Date().toLocaleDateString('en-GB')}]`.trim()
        }
      });

      toast.success('Job created from tender!', {
        description: `"${formData.title}" has been added to your jobs.`
      });

      onOpenChange(false);
    } catch (error: any) {
      console.error('Error converting tender:', error);
      toast.error('Failed to create job', {
        description: error.message
      });
    }
  };

  if (!tender) return null;

  const isSubmitting = createJobMutation.isPending || updateTenderMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-success" />
            Convert Won Tender to Job
          </DialogTitle>
          <DialogDescription>
            Create a new job from the won tender. Review and adjust the details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Source Info */}
          <div className="p-3 bg-success/10 rounded-lg border border-success/20">
            <p className="text-xs text-muted-foreground">Converting from tender:</p>
            <p className="font-medium text-success">{tender.title}</p>
            <p className="text-sm text-muted-foreground">{tender.client} • £{Number(tender.value).toLocaleString()}</p>
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter job title"
            />
          </div>

          {/* Client */}
          <div className="space-y-2">
            <Label htmlFor="client">Client *</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              placeholder="Client name"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Site address"
                className="pl-10"
              />
            </div>
          </div>

          {/* Value and Workers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Value (£)</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workers">Workers</Label>
              <Input
                id="workers"
                type="number"
                min={1}
                value={formData.workers_count}
                onChange={(e) => setFormData({ ...formData, workers_count: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Status and Start Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Initial Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'Pending' | 'Active') => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Job description and scope of works"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!formData.title || !formData.client || isSubmitting}
            className="bg-success hover:bg-success/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Briefcase className="h-4 w-4 mr-2" />
                Create Job
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
