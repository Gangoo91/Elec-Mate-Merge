import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { useCollege } from "@/contexts/CollegeContext";
import {
  Search,
  Upload,
  FileText,
  Video,
  Image,
  Presentation,
  FileSpreadsheet,
  File,
  Download,
  MoreVertical,
  Filter,
  Eye,
  Calendar,
  User,
  FolderOpen,
  Folder,
  Star,
  Share2,
  Trash2,
  Grid3X3,
  List,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock folder structure
const mockFolders = [
  { id: 'folder-1', name: 'Course Materials', itemCount: 24, icon: 'course' },
  { id: 'folder-2', name: 'Assessment Templates', itemCount: 12, icon: 'assessment' },
  { id: 'folder-3', name: 'Student Resources', itemCount: 18, icon: 'student' },
  { id: 'folder-4', name: 'Staff Documents', itemCount: 8, icon: 'staff' },
  { id: 'folder-5', name: 'Policies & Procedures', itemCount: 15, icon: 'policy' },
];

export function DocumentLibrarySection() {
  const { teachingResources, staff, courses } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  const filteredResources = teachingResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === "all" || resource.type === filterType;

    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string, size: string = "h-5 w-5") => {
    const iconClass = size;
    switch (type) {
      case 'document': return <FileText className={`${iconClass} text-blue-500`} />;
      case 'video': return <Video className={`${iconClass} text-red-500`} />;
      case 'image': return <Image className={`${iconClass} text-green-500`} />;
      case 'presentation': return <Presentation className={`${iconClass} text-orange-500`} />;
      case 'spreadsheet': return <FileSpreadsheet className={`${iconClass} text-emerald-500`} />;
      case 'link': return <FolderOpen className={`${iconClass} text-purple-500`} />;
      default: return <File className={`${iconClass} text-gray-500`} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-blue-500/10';
      case 'video': return 'bg-red-500/10';
      case 'image': return 'bg-green-500/10';
      case 'presentation': return 'bg-orange-500/10';
      case 'spreadsheet': return 'bg-emerald-500/10';
      case 'link': return 'bg-purple-500/10';
      default: return 'bg-gray-500/10';
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getUploaderName = (uploadedBy: string) => {
    return staff.find(s => s.id === uploadedBy)?.name || 'Unknown';
  };

  // Calculate storage usage (mock)
  const totalStorage = 5 * 1024 * 1024 * 1024; // 5GB
  const usedStorage = teachingResources.reduce((sum, r) => sum + (r.fileSize || 0), 0);
  const storagePercent = Math.round((usedStorage / totalStorage) * 100);

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Document Library"
        description={`${teachingResources.length} documents • ${formatFileSize(usedStorage)} used`}
        actions={
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Upload</span>
          </Button>
        }
      />

      {/* Storage Usage */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Storage Used</span>
            <span className="text-sm font-medium">{formatFileSize(usedStorage)} / 5 GB</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                storagePercent > 80 ? 'bg-destructive' : storagePercent > 60 ? 'bg-warning' : 'bg-primary'
              }`}
              style={{ width: `${storagePercent}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Folders */}
      {!currentFolder && (
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Folders</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {mockFolders.map((folder) => (
              <Card
                key={folder.id}
                className="cursor-pointer hover:shadow-md transition-shadow hover:border-primary/50"
                onClick={() => setCurrentFolder(folder.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="h-12 w-12 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Folder className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium text-sm truncate">{folder.name}</p>
                  <p className="text-xs text-muted-foreground">{folder.itemCount} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="presentation">Presentations</SelectItem>
            <SelectItem value="spreadsheet">Spreadsheets</SelectItem>
            <SelectItem value="image">Images</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex border rounded-md">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="rounded-r-none"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            className="rounded-l-none"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Recent Documents */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Recent Documents</h2>

        {viewMode === "grid" ? (
          <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {filteredResources.slice(0, 10).map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow group">
                <CardContent className="p-3">
                  <div className={`h-20 rounded-lg ${getTypeColor(resource.type)} flex items-center justify-center mb-2 relative`}>
                    {getTypeIcon(resource.type, "h-8 w-8")}
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 bg-background/80">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />Preview</DropdownMenuItem>
                          <DropdownMenuItem><Download className="h-4 w-4 mr-2" />Download</DropdownMenuItem>
                          <DropdownMenuItem><Share2 className="h-4 w-4 mr-2" />Share</DropdownMenuItem>
                          <DropdownMenuItem><Star className="h-4 w-4 mr-2" />Favourite</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <p className="font-medium text-xs truncate">{resource.title}</p>
                  <p className="text-[10px] text-muted-foreground">{formatFileSize(resource.fileSize)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredResources.slice(0, 10).map((resource) => (
              <Card key={resource.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg ${getTypeColor(resource.type)} flex items-center justify-center shrink-0`}>
                      {getTypeIcon(resource.type, "h-5 w-5")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{resource.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatFileSize(resource.fileSize)}</span>
                        <span>•</span>
                        <span>{getUploaderName(resource.uploadedBy)}</span>
                        <span>•</span>
                        <span>
                          {new Date(resource.uploadedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />Preview</DropdownMenuItem>
                          <DropdownMenuItem><Share2 className="h-4 w-4 mr-2" />Share</DropdownMenuItem>
                          <DropdownMenuItem><Star className="h-4 w-4 mr-2" />Favourite</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredResources.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No documents found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
