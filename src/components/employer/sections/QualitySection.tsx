import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  useJobIssuesByType,
  useJobIssueStats,
  useCreateJobIssue,
  useUpdateJobIssueStatus,
  type JobIssue,
  type IssueType,
  type IssueSeverity,
} from '@/hooks/useJobIssues';
import { useJobs } from '@/hooks/useJobs';
import {
  ClipboardCheck,
  Search,
  Plus,
  Camera,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  User,
  Calendar,
  Briefcase,
  Loader2,
  RefreshCw,
  X,
  Image,
} from 'lucide-react';

const statusColors: Record<string, string> = {
  Open: 'bg-warning/20 text-warning',
  'In Progress': 'bg-info/20 text-info',
  Resolved: 'bg-success/20 text-success',
  Closed: 'bg-success/20 text-success',
};

const severityColors: Record<string, string> = {
  Low: 'bg-blue-500/20 text-blue-400',
  Medium: 'bg-yellow-500/20 text-yellow-400',
  High: 'bg-orange-500/20 text-orange-400',
  Critical: 'bg-red-500/20 text-red-400',
};

export const QualitySection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewSnag, setShowNewSnag] = useState(false);
  const [activeTab, setActiveTab] = useState('snags');

  // Form state
  const [selectedJobId, setSelectedJobId] = useState('');
  const [snagTitle, setSnagTitle] = useState('');
  const [snagDescription, setSnagDescription] = useState('');
  const [snagSeverity, setSnagSeverity] = useState<IssueSeverity>('Medium');
  const [snagLocation, setSnagLocation] = useState('');
  const [snagPhotos, setSnagPhotos] = useState<string[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Fetch snags and defects using the real hook
  const { data: snagIssues, isLoading, error, refetch } = useJobIssuesByType(['Snag', 'Defect']);
  const { data: stats } = useJobIssueStats();
  const { data: jobs } = useJobs();
  const createIssue = useCreateJobIssue();
  const updateStatus = useUpdateJobIssueStatus();

  // Filter by search
  const filteredSnags =
    snagIssues?.filter(
      (issue) =>
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Group by status for tabs
  const openSnags = filteredSnags.filter((s) => s.status === 'Open' || s.status === 'In Progress');
  const resolvedSnags = filteredSnags.filter(
    (s) => s.status === 'Resolved' || s.status === 'Closed'
  );

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingPhoto(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/snags/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('visual-uploads')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('visual-uploads').getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
      }

      setSnagPhotos((prev) => [...prev, ...uploadedUrls]);
      toast({ title: 'Photo uploaded', description: `${uploadedUrls.length} photo(s) added` });
    } catch (error) {
      console.error('Photo upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'Could not upload photo',
        variant: 'destructive',
      });
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removePhoto = (index: number) => {
    setSnagPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateSnag = async () => {
    if (!selectedJobId || !snagTitle) return;

    await createIssue.mutateAsync({
      job_id: selectedJobId,
      title: snagTitle,
      description: snagDescription,
      issue_type: 'Snag' as IssueType,
      severity: snagSeverity,
      status: 'Open',
      location: snagLocation,
      photos: snagPhotos,
    });

    // Reset form
    setSelectedJobId('');
    setSnagTitle('');
    setSnagDescription('');
    setSnagSeverity('Medium');
    setSnagLocation('');
    setSnagPhotos([]);
    setShowNewSnag(false);
  };

  const handleResolve = async (issue: JobIssue) => {
    await updateStatus.mutateAsync({
      id: issue.id,
      status: 'Resolved',
    });
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">Failed to load quality data</p>
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6 text-elec-yellow" />
            Quality Assurance
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Snag lists, defect tracking, and quality management
          </p>
        </div>

        <Sheet open={showNewSnag} onOpenChange={setShowNewSnag}>
          <SheetTrigger asChild>
            <Button className="gap-2 h-11 touch-manipulation">
              <Plus className="h-4 w-4" />
              New Snag
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle>Log New Snag</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
                <div className="space-y-2">
                  <Label>Select Job *</Label>
                  <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue placeholder="Choose a job..." />
                    </SelectTrigger>
                    <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                      {jobs?.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title} - {job.client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Snag Title *</Label>
                  <Input
                    placeholder="Brief description of the issue..."
                    value={snagTitle}
                    onChange={(e) => setSnagTitle(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="Where is this issue?"
                    value={snagLocation}
                    onChange={(e) => setSnagLocation(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Select
                    value={snagSeverity}
                    onValueChange={(v) => setSnagSeverity(v as IssueSeverity)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Detailed Description</Label>
                  <Textarea
                    placeholder="Describe the defect or issue in detail..."
                    value={snagDescription}
                    onChange={(e) => setSnagDescription(e.target.value)}
                    className="min-h-[100px] touch-manipulation"
                  />
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label>Photos</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2 h-11 touch-manipulation"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingPhoto}
                  >
                    {uploadingPhoto ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                    {uploadingPhoto ? 'Uploading...' : 'Add Photos'}
                  </Button>

                  {/* Photo Previews */}
                  {snagPhotos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {snagPhotos.map((url, index) => (
                        <div
                          key={index}
                          className="relative w-20 h-20 rounded-lg overflow-hidden border border-border"
                        >
                          <img
                            src={url}
                            alt={`Snag photo ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-border bg-background">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewSnag(false)}
                    className="flex-1 h-11 touch-manipulation"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateSnag}
                    disabled={!selectedJobId || !snagTitle || createIssue.isPending}
                    className="flex-1 h-11 touch-manipulation"
                  >
                    {createIssue.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Create Snag'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-4 text-center">
            {isLoading ? (
              <Skeleton className="h-8 w-12 mx-auto mb-2" />
            ) : (
              <p className="text-2xl font-bold text-foreground">{stats?.snags || 0}</p>
            )}
            <p className="text-sm text-muted-foreground">Total Snags</p>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-4 text-center">
            {isLoading ? (
              <Skeleton className="h-8 w-12 mx-auto mb-2" />
            ) : (
              <p className="text-2xl font-bold text-warning">{openSnags.length}</p>
            )}
            <p className="text-sm text-muted-foreground">Open</p>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-4 text-center">
            {isLoading ? (
              <Skeleton className="h-8 w-12 mx-auto mb-2" />
            ) : (
              <p className="text-2xl font-bold text-success">{resolvedSnags.length}</p>
            )}
            <p className="text-sm text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-4 text-center">
            {isLoading ? (
              <Skeleton className="h-8 w-12 mx-auto mb-2" />
            ) : (
              <p className="text-2xl font-bold text-elec-yellow">{stats?.defects || 0}</p>
            )}
            <p className="text-sm text-muted-foreground">Defects</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        {!searchQuery && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
        <Input
          placeholder="Search snags by title, job, or description..."
          className={cn('h-11 touch-manipulation', !searchQuery && 'pl-10')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="snags" className="gap-2 touch-manipulation">
            <AlertCircle className="h-4 w-4" />
            Open ({openSnags.length})
          </TabsTrigger>
          <TabsTrigger value="resolved" className="gap-2 touch-manipulation">
            <CheckCircle2 className="h-4 w-4" />
            Resolved ({resolvedSnags.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="snags" className="mt-4 space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-elec-gray border-border">
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : openSnags.length === 0 ? (
            <Card className="bg-elec-gray border-border">
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">All Clear!</h3>
                <p className="text-muted-foreground">No open snags or defects to resolve.</p>
              </CardContent>
            </Card>
          ) : (
            openSnags.map((issue) => (
              <Card key={issue.id} className="bg-elec-gray border-border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{issue.title}</h3>
                        <Badge className={severityColors[issue.severity] || ''}>
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5" />
                        {issue.job?.title || 'No job linked'}
                        {issue.job?.client && ` - ${issue.job.client}`}
                      </p>
                    </div>
                    <Badge className={statusColors[issue.status] || ''}>{issue.status}</Badge>
                  </div>

                  {issue.description && (
                    <p className="text-sm text-muted-foreground bg-surface p-3 rounded-lg">
                      {issue.description}
                    </p>
                  )}

                  {/* Display photos if any */}
                  {issue.photos && issue.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {issue.photos.map((url, idx) => (
                        <div
                          key={idx}
                          className="w-16 h-16 rounded-lg overflow-hidden border border-border"
                        >
                          <img
                            src={url}
                            alt={`Issue photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      {issue.location && (
                        <span className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          {issue.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(issue.created_at).toLocaleDateString('en-GB')}
                      </span>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleResolve(issue)}
                      disabled={updateStatus.isPending}
                      className="gap-2 h-9 touch-manipulation"
                    >
                      {updateStatus.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Resolve
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="resolved" className="mt-4 space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="bg-elec-gray border-border">
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : resolvedSnags.length === 0 ? (
            <Card className="bg-elec-gray border-border">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No resolved snags yet.</p>
              </CardContent>
            </Card>
          ) : (
            resolvedSnags.map((issue) => (
              <Card key={issue.id} className="bg-elec-gray border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <h3 className="font-semibold text-foreground">{issue.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5" />
                        {issue.job?.title || 'No job linked'}
                      </p>
                      {issue.resolution_notes && (
                        <p className="text-sm text-muted-foreground mt-2 bg-surface p-2 rounded">
                          {issue.resolution_notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p>Resolved</p>
                      <p>
                        {issue.resolved_at
                          ? new Date(issue.resolved_at).toLocaleDateString('en-GB')
                          : '-'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
