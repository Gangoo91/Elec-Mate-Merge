
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileGestureHandler } from "@/components/ui/mobile-gesture-handler";
import { Camera, Upload, Download, Trash2, Eye, MapPin, Loader2, X, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";
import FileViewer from "@/components/shared/FileViewer";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PhotoDoc {
  id: string;
  filename: string;
  file_url: string;
  description: string;
  category: string;
  location: string;
  tags: string[];
  gps_latitude?: number;
  gps_longitude?: number;
  file_size?: number;
  mime_type?: string;
  created_at: string;
}

const PhotoDocumentation = () => {
  const { isMobile, touchSupport } = useMobileEnhanced();
  const [photos, setPhotos] = useState<PhotoDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [viewingPhoto, setViewingPhoto] = useState<PhotoDoc | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [newPhoto, setNewPhoto] = useState({
    description: "",
    category: "General",
    location: "",
    tags: "",
    gpsEnabled: false
  });

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('safety_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast({
        title: "Error",
        description: "Failed to load photos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Before Work",
    "After Work", 
    "Safety Procedure",
    "Hazard Identification",
    "Equipment Setup",
    "Testing Results",
    "Damage/Issues",
    "General"
  ];

  const categoryOptions = categories.map(cat => ({
    value: cat,
    label: cat,
    description: getCategoryDescription(cat)
  }));

  function getCategoryDescription(category: string): string {
    const descriptions: { [key: string]: string } = {
      "Before Work": "Photos taken before starting work",
      "After Work": "Completion and cleanup photos",
      "Safety Procedure": "Safety protocols in action",
      "Hazard Identification": "Potential safety concerns",
      "Equipment Setup": "Tool and equipment placement",
      "Testing Results": "Test results and measurements",
      "Damage/Issues": "Problems or damage found",
      "General": "Miscellaneous documentation"
    };
    return descriptions[category] || "";
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('image/')
      );
      setSelectedFiles(droppedFiles);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = async (files: File[] = selectedFiles) => {
    if (files.length === 0) return;

    if (!newPhoto.description.trim()) {
      toast({
        title: "Error",
        description: "Please add a description for the photo(s)",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      // Get GPS location if enabled
      let gpsCoords = null;
      if (newPhoto.gpsEnabled && navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 60000
            });
          });
          gpsCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        } catch (gpsError) {
          console.warn('GPS location not available:', gpsError);
        }
      }

      const uploadedPhotos = [];

      // Upload each file
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('safety-resources')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('safety-resources')
          .getPublicUrl(fileName);

        // Save photo metadata to database
        const { data, error } = await supabase
          .from('safety_photos')
          .insert({
            user_id: user.id,
            filename: file.name,
            file_url: publicUrl,
            description: newPhoto.description,
            category: newPhoto.category,
            location: newPhoto.location,
            tags: newPhoto.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            gps_latitude: gpsCoords?.latitude,
            gps_longitude: gpsCoords?.longitude,
            file_size: file.size,
            mime_type: file.type
          })
          .select()
          .single();

        if (error) throw error;
        uploadedPhotos.push(data);
      }

      setPhotos(prev => [...uploadedPhotos, ...prev]);
      setNewPhoto({ description: "", category: "General", location: "", tags: "", gpsEnabled: false });
      setSelectedFiles([]);
      
      toast({
        title: "Success",
        description: `${files.length} photo(s) uploaded successfully`,
        variant: "success"
      });

    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Error",
        description: "Failed to upload photo",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = async (id: string) => {
    try {
      const { error } = await supabase
        .from('safety_photos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPhotos(prev => prev.filter(photo => photo.id !== id));
      
      toast({
        title: "Success",
        description: "Photo deleted successfully",
        variant: "success"
      });
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Error",
        description: "Failed to delete photo",
        variant: "destructive"
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Before Work": "bg-blue-500",
      "After Work": "bg-green-500",
      "Safety Procedure": "bg-yellow-500",
      "Hazard Identification": "bg-red-500",
      "Equipment Setup": "bg-purple-500",
      "Testing Results": "bg-cyan-500",
      "Damage/Issues": "bg-orange-500",
      "General": "bg-gray-500"
    };
    return colors[category] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <span className="ml-2 text-muted-foreground">Loading photos...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Photo Upload */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Photo Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <MobileInputWrapper
              label="Photo Description"
              placeholder="Describe what this photo shows (required)"
              value={newPhoto.description}
              onChange={(value) => setNewPhoto(prev => ({ ...prev, description: value }))}
              hint="Be specific about what the photo documents"
              icon={<Camera className="h-5 w-5" />}
              className="w-full"
            />

            <MobileInputWrapper
              label="Location/Area"
              placeholder="Where was this photo taken?"
              value={newPhoto.location}
              onChange={(value) => setNewPhoto(prev => ({ ...prev, location: value }))}
              hint="Specific room, panel, or area name"
              icon={<MapPin className="h-5 w-5" />}
              className="w-full"
            />

            <MobileSelectWrapper
              label="Category"
              value={newPhoto.category}
              onValueChange={(value) => setNewPhoto(prev => ({ ...prev, category: value }))}
              options={categoryOptions}
              placeholder="Select photo category"
              icon={<Zap className="h-5 w-5" />}
            />

            <MobileInputWrapper
              label="Tags"
              placeholder="safety, equipment, testing"
              value={newPhoto.tags}
              onChange={(value) => setNewPhoto(prev => ({ ...prev, tags: value }))}
              hint="Comma-separated keywords for easy searching"
              className="w-full"
            />
          </div>

          {/* GPS Location Toggle */}
          <div className="flex items-center gap-4 p-6 bg-card/50 rounded-xl border border-primary/20">
            <div className="flex items-center gap-3">
              <div 
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all touch-target ${
                  newPhoto.gpsEnabled 
                    ? 'bg-elec-yellow border-elec-yellow' 
                    : 'border-primary/30 hover:border-elec-yellow/50'
                }`}
                onClick={() => setNewPhoto(prev => ({ ...prev, gpsEnabled: !prev.gpsEnabled }))}
              >
                {newPhoto.gpsEnabled && <div className="w-3 h-3 bg-black rounded-sm"></div>}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className={`h-5 w-5 ${newPhoto.gpsEnabled ? 'text-elec-yellow' : 'text-muted-foreground'}`} />
                <span className="font-medium text-base">Enable GPS location tagging</span>
              </div>
            </div>
          </div>
          
          {/* File Upload Area */}
          <MobileGestureHandler
            onTap={() => !uploading && fileInputRef.current?.click()}
            onLongPress={() => !uploading && cameraInputRef.current?.click()}
            disabled={uploading}
          >
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all touch-manipulation ${
                dragActive 
                  ? 'border-elec-yellow border-solid bg-elec-yellow/10 scale-[1.02]' 
                  : 'border-elec-yellow/50 hover:border-elec-yellow/70'
              } ${uploading ? 'opacity-50' : 'active:scale-[0.98]'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              multiple
              disabled={uploading}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
            
            <div className="flex flex-col items-center gap-4">
              {uploading ? (
                <>
                  <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
                  <span className="text-sm font-medium">Uploading photos...</span>
                </>
              ) : (
                  <>
                    <Upload className="h-12 w-12 text-elec-yellow mb-4" />
                    <div className="space-y-3">
                      <p className="text-lg font-semibold">
                        {isMobile ? "Tap to select photos" : "Drop images here or click to select"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isMobile ? "Hold to open camera • " : ""}JPG, PNG up to 10MB each
                      </p>
                    </div>
                    <div className={`flex gap-3 mt-6 ${isMobile ? 'flex-col w-full' : 'flex-row'}`}>
                      <MobileButton
                        variant="elec-outline"
                        size={isMobile ? "wide" : "default"}
                        onClick={() => fileInputRef.current?.click()}
                        className="touch-target"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Browse Files
                      </MobileButton>
                      <MobileButton
                        variant="elec"
                        size={isMobile ? "wide" : "default"}
                        onClick={() => cameraInputRef.current?.click()}
                        className="touch-target"
                      >
                        <Camera className="h-5 w-5 mr-2" />
                        Take Photo
                      </MobileButton>
                    </div>
                  </>
                )}
              </div>
            </div>
          </MobileGestureHandler>

          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <Card className="border-elec-yellow/30 bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                  Selected Files ({selectedFiles.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'}`}>
                  {selectedFiles.map((file, index) => (
                    <MobileGestureHandler
                      key={index}
                      onTap={() => removeSelectedFile(index)}
                      onLongPress={() => {
                        // Show file details on long press
                        toast({
                          title: file.name,
                          description: `Size: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
                          variant: "default"
                        });
                      }}
                    >
                      <div className="relative group bg-background/50 rounded-xl overflow-hidden border border-primary/20">
                        <AspectRatio ratio={isMobile ? 16/9 : 1} className="bg-muted">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <MobileButton
                              size="icon"
                              variant="destructive"
                              className={`${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity touch-target`}
                              onClick={(e) => {
                                e.stopPropagation();
                                removeSelectedFile(index);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </MobileButton>
                          </div>
                        </AspectRatio>
                        <div className="p-3">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)}MB
                          </p>
                        </div>
                      </div>
                    </MobileGestureHandler>
                  ))}
                </div>
                <MobileButton
                  onClick={() => handleFileUpload()}
                  disabled={uploading || selectedFiles.length === 0}
                  size="wide"
                  variant="elec"
                  loading={uploading}
                  className="w-full touch-target"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload {selectedFiles.length} Photo{selectedFiles.length !== 1 ? 's' : ''}
                </MobileButton>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Photo Statistics */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
        <Card className="border-primary/30 bg-card/50 hover:bg-card/70 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-elec-yellow mb-2">{photos.length}</div>
            <div className="text-sm font-medium text-muted-foreground">Total Photos</div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-card/50 hover:bg-card/70 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-elec-yellow mb-2">
              {photos.filter(p => p.category === "Safety Procedure").length}
            </div>
            <div className="text-sm font-medium text-muted-foreground">Safety Photos</div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-card/50 hover:bg-card/70 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-elec-yellow mb-2">
              {photos.filter(p => p.category === "Before Work").length}
            </div>
            <div className="text-sm font-medium text-muted-foreground">Before Photos</div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-card/50 hover:bg-card/70 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-elec-yellow mb-2">
              {photos.filter(p => p.category === "After Work").length}
            </div>
            <div className="text-sm font-medium text-muted-foreground">After Photos</div>
          </CardContent>
        </Card>
      </div>

      {/* Photo Gallery */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
            Photo Gallery ({photos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {photos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No photos uploaded yet</p>
              <p className="text-sm">Start documenting your work with the upload tool above</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {photos.map((photo, index) => (
                <MobileGestureHandler
                  key={photo.id}
                  onTap={() => setViewingPhoto(photo)}
                  onLongPress={() => {
                    toast({
                      title: "Photo Options",
                      description: "Tap to view, swipe actions available",
                      variant: "default"
                    });
                  }}
                  onSwipeLeft={() => removePhoto(photo.id)}
                >
                  <Card className="border-elec-yellow/30 overflow-hidden bg-card/50 hover:bg-card/70 transition-all active:scale-[0.98]">
                    <div className="relative">
                      <AspectRatio ratio={isMobile ? 16/9 : 4/3}>
                        <img
                          src={photo.file_url}
                          alt={photo.description}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </AspectRatio>
                      <div className="absolute top-3 left-3">
                        <Badge 
                          className={`${getCategoryColor(photo.category)} text-white text-xs font-medium px-2 py-1`}
                        >
                          {photo.category}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <MobileButton
                          size="icon"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingPhoto(photo);
                          }}
                          className="h-10 w-10 bg-background/80 backdrop-blur-sm border-primary/30 touch-target"
                        >
                          <Eye className="h-4 w-4" />
                        </MobileButton>
                        <MobileButton
                          size="icon"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePhoto(photo.id);
                          }}
                          className="h-10 w-10 bg-background/80 backdrop-blur-sm border-destructive/30 hover:bg-destructive/80 touch-target"
                        >
                          <Trash2 className="h-4 w-4" />
                        </MobileButton>
                      </div>
                      {isMobile && (
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                            <p className="text-white text-sm font-medium truncate">
                              {photo.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {!isMobile && (
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="font-medium text-base truncate">{photo.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(photo.created_at).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          {photo.location && (
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-elec-yellow" />
                              {photo.location}
                            </div>
                          )}
                          {(photo.gps_latitude && photo.gps_longitude) && (
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 bg-elec-yellow rounded-full"></div>
                              GPS: {photo.gps_latitude.toFixed(4)}, {photo.gps_longitude.toFixed(4)}
                            </div>
                          )}
                          {photo.tags && photo.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {photo.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {photo.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{photo.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </MobileGestureHandler>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Photo Viewing Modal */}
      {viewingPhoto && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setViewingPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-full w-full bg-card rounded-xl overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <MobileButton
                size="icon"
                variant="outline"
                onClick={() => setViewingPhoto(null)}
                className="bg-background/80 backdrop-blur-sm touch-target"
              >
                <X className="h-5 w-5" />
              </MobileButton>
            </div>
            <img
              src={viewingPhoto.file_url}
              alt={viewingPhoto.description}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            <div className="p-6 bg-background/95 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2">{viewingPhoto.description}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>Category: {viewingPhoto.category}</div>
                <div>Date: {new Date(viewingPhoto.created_at).toLocaleDateString()}</div>
                {viewingPhoto.location && <div>Location: {viewingPhoto.location}</div>}
                {viewingPhoto.tags.length > 0 && (
                  <div className="sm:col-span-2">
                    Tags: {viewingPhoto.tags.join(', ')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      {photos.length > 0 && (
        <Card className="border-primary/30 bg-card/50">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
              <MobileButton variant="elec-outline" size={isMobile ? "wide" : "default"}>
                <Download className="h-4 w-4 mr-2" />
                Export All Photos
              </MobileButton>
              <MobileButton variant="elec-outline" size={isMobile ? "wide" : "default"}>
                <Download className="h-4 w-4 mr-2" />
                Generate Photo Report
              </MobileButton>
              <MobileButton variant="elec-outline" size={isMobile ? "wide" : "default"}>
                <Download className="h-4 w-4 mr-2" />
                Export by Category
              </MobileButton>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PhotoDocumentation;
