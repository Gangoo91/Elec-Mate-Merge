import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  Camera,
  Upload,
  FileText,
  Image,
  Video,
  Link2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Eye,
  MoreVertical,
  X,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EVIDENCE_TYPES = [
  { value: 'photo', label: 'Photo', icon: Image, color: 'text-blue-500' },
  { value: 'document', label: 'Document', icon: FileText, color: 'text-amber-500' },
  { value: 'video', label: 'Video', icon: Video, color: 'text-purple-500' },
  { value: 'link', label: 'Link', icon: Link2, color: 'text-green-500' },
];

const CATEGORIES = [
  'Workshop Training',
  'Site Experience',
  'College Work',
  'Online Learning',
  'Assessment Evidence',
  'Safety Training',
];

interface EvidenceItem {
  id: string;
  title: string;
  type: string;
  category: string;
  date: string;
  status: 'draft' | 'submitted' | 'approved' | 'needs-revision';
  thumbnailUrl?: string;
  fileType?: string;
}

/**
 * EvidenceSection - Evidence management for OJT Hub
 *
 * Native mobile app feel with:
 * - Camera capture flow
 * - File upload
 * - Category filtering
 * - Status tracking
 * - Quick preview
 */
export function EvidenceSection() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showUpload, setShowUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [captureMode, setCaptureMode] = useState<'camera' | 'file' | 'link' | null>(null);

  // Form state
  const [newEvidence, setNewEvidence] = useState({
    title: '',
    type: 'photo',
    category: '',
    description: '',
    file: null as File | null,
    linkUrl: '',
  });

  // Mock evidence data
  const [evidence] = useState<EvidenceItem[]>([
    {
      id: '1',
      title: 'Consumer Unit Installation',
      type: 'photo',
      category: 'Workshop Training',
      date: '2024-01-05',
      status: 'approved',
    },
    {
      id: '2',
      title: 'Cable Sizing Calculations',
      type: 'document',
      category: 'College Work',
      date: '2024-01-03',
      status: 'submitted',
    },
    {
      id: '3',
      title: 'Site Safety Assessment',
      type: 'photo',
      category: 'Site Experience',
      date: '2024-01-02',
      status: 'needs-revision',
    },
    {
      id: '4',
      title: 'Testing & Inspection Notes',
      type: 'document',
      category: 'Assessment Evidence',
      date: '2024-01-01',
      status: 'draft',
    },
  ]);

  // Filter evidence
  const filteredEvidence = evidence.filter((item) => {
    const matchesSearch =
      searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Stats
  const stats = {
    total: evidence.length,
    approved: evidence.filter((e) => e.status === 'approved').length,
    pending: evidence.filter((e) => e.status === 'submitted').length,
    draft: evidence.filter((e) => e.status === 'draft').length,
  };

  const handleCameraCapture = () => {
    setCaptureMode('camera');
    // In a real app, this would open native camera
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.capture = 'environment';
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = () => {
    setCaptureMode('file');
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*,video/*,.pdf,.doc,.docx';
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewEvidence({ ...newEvidence, file });
      setShowUpload(true);
    }
  };

  const handleSubmit = async () => {
    if (!newEvidence.title || !newEvidence.category) {
      toast({
        title: 'Missing information',
        description: 'Please fill in title and category',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Evidence uploaded',
      description: 'Your evidence has been saved as a draft',
    });

    setIsUploading(false);
    setShowUpload(false);
    setNewEvidence({
      title: '',
      type: 'photo',
      category: '',
      description: '',
      file: null,
      linkUrl: '',
    });
    setCaptureMode(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'submitted':
        return (
          <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'needs-revision':
        return (
          <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">
            Needs Revision
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">Draft</Badge>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    const typeInfo = EVIDENCE_TYPES.find((t) => t.value === type);
    if (!typeInfo) return FileText;
    return typeInfo.icon;
  };

  return (
    <>
      <div className="p-4 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Evidence</h1>
            <p className="text-sm text-muted-foreground">Capture & manage training evidence</p>
          </div>
        </div>

        {/* Quick Capture Actions - Native App Style */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleCameraCapture}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-elec-yellow/10 border-2 border-elec-yellow/20 hover:border-elec-yellow/40 active:scale-95 transition-all touch-manipulation min-h-[100px]"
          >
            <div className="h-14 w-14 rounded-full bg-elec-yellow flex items-center justify-center">
              <Camera className="h-6 w-6 text-black" />
            </div>
            <span className="text-xs font-medium text-foreground">Camera</span>
          </button>
          <button
            onClick={handleFileUpload}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-blue-500/10 border-2 border-blue-500/20 hover:border-blue-500/40 active:scale-95 transition-all touch-manipulation min-h-[100px]"
          >
            <div className="h-14 w-14 rounded-full bg-blue-500 flex items-center justify-center">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-medium text-foreground">Upload</span>
          </button>
          <button
            onClick={() => {
              setCaptureMode('link');
              setShowUpload(true);
            }}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-green-500/10 border-2 border-green-500/20 hover:border-green-500/40 active:scale-95 transition-all touch-manipulation min-h-[100px]"
          >
            <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center">
              <Link2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-medium text-foreground">Link</span>
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Card className="border-border">
            <CardContent className="p-2 sm:p-3 text-center">
              <p className="text-base sm:text-lg font-bold text-foreground">{stats.total}</p>
              <p className="text-[10px] text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="border-green-500/20">
            <CardContent className="p-2 sm:p-3 text-center">
              <p className="text-base sm:text-lg font-bold text-green-500">{stats.approved}</p>
              <p className="text-[10px] text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card className="border-blue-500/20">
            <CardContent className="p-2 sm:p-3 text-center">
              <p className="text-base sm:text-lg font-bold text-blue-500">{stats.pending}</p>
              <p className="text-[10px] text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-2 sm:p-3 text-center">
              <p className="text-base sm:text-lg font-bold text-muted-foreground">{stats.draft}</p>
              <p className="text-[10px] text-muted-foreground">Draft</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          {!searchTerm && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            placeholder="Search evidence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn("bg-card border-border", !searchTerm && "pl-9")}
          />
        </div>

        {/* Category Filter - Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'px-4 h-9 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 touch-manipulation',
              !selectedCategory
                ? 'bg-elec-yellow text-black'
                : 'bg-muted text-muted-foreground'
            )}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-4 h-9 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 touch-manipulation',
                selectedCategory === cat
                  ? 'bg-elec-yellow text-black'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Evidence List */}
        <div className="space-y-3">
          {filteredEvidence.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
              <p className="font-medium text-foreground">No evidence yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Capture photos, upload files, or add links
              </p>
            </div>
          ) : (
            filteredEvidence.map((item) => {
              const TypeIcon = getTypeIcon(item.type);
              return (
                <Card
                  key={item.id}
                  className="border-border overflow-hidden active:scale-[0.99] transition-transform"
                >
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 p-3">
                      {/* Thumbnail */}
                      <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                        {item.thumbnailUrl ? (
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <TypeIcon className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.category}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(item.status)}
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(item.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 touch-manipulation">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Upload Sheet */}
      <Sheet open={showUpload} onOpenChange={setShowUpload}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
          <SheetHeader>
            <SheetTitle>Add Evidence</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-4 overflow-y-auto pb-safe">
            {/* Preview */}
            {newEvidence.file && (
              <div className="relative">
                <div className="aspect-video rounded-xl bg-muted overflow-hidden">
                  {newEvidence.file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(newEvidence.file)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={() => setNewEvidence({ ...newEvidence, file: null })}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Link input */}
            {captureMode === 'link' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">URL</label>
                <Input
                  placeholder="https://..."
                  value={newEvidence.linkUrl}
                  onChange={(e) =>
                    setNewEvidence({ ...newEvidence, linkUrl: e.target.value })
                  }
                />
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="e.g., Consumer unit installation"
                value={newEvidence.title}
                onChange={(e) =>
                  setNewEvidence({ ...newEvidence, title: e.target.value })
                }
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={newEvidence.category}
                onValueChange={(value) =>
                  setNewEvidence({ ...newEvidence, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description (optional)</label>
              <Textarea
                placeholder="Add details about this evidence..."
                value={newEvidence.description}
                onChange={(e) =>
                  setNewEvidence({ ...newEvidence, description: e.target.value })
                }
                rows={3}
              />
            </div>

            {/* AI Suggestions */}
            <Card className="border-elec-yellow/20 bg-elec-yellow/5">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-elec-yellow mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-foreground">AI Suggestion</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      This looks like practical training evidence. Consider tagging it with relevant KSBs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3 pt-4 pb-20 sm:pb-8">
              <Button
                variant="outline"
                onClick={() => setShowUpload(false)}
                className="flex-1 h-12 touch-manipulation active:scale-95"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isUploading}
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-95"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Save Evidence'
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default EvidenceSection;
