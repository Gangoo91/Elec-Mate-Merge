
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, Download, Trash2, Eye, MapPin, Loader2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
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
  const [photos, setPhotos] = useState<PhotoDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="description">Photo Description</Label>
              <Textarea
                id="description"
                value={newPhoto.description}
                onChange={(e) => setNewPhoto(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this photo shows"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="location">Location/Area</Label>
              <Input
                id="location"
                value={newPhoto.location}
                onChange={(e) => setNewPhoto(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Where was this photo taken?"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                className="w-full p-2 border rounded-md bg-background"
                value={newPhoto.category}
                onChange={(e) => setNewPhoto(prev => ({ ...prev, category: e.target.value }))}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={newPhoto.tags}
                onChange={(e) => setNewPhoto(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="safety, equipment, testing"
              />
            </div>
          </div>

          {/* GPS Location Toggle */}
          <div className="flex items-center gap-2 p-4 bg-background/50 rounded-lg">
            <input
              type="checkbox"
              id="gps-enabled"
              checked={newPhoto.gpsEnabled}
              onChange={(e) => setNewPhoto(prev => ({ ...prev, gpsEnabled: e.target.checked }))}
              className="rounded border-elec-yellow/30"
            />
            <Label htmlFor="gps-enabled" className="flex items-center gap-2 cursor-pointer">
              <MapPin className="h-4 w-4 text-elec-yellow" />
              Enable GPS location tagging
            </Label>
          </div>
          
          {/* File Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive 
                ? 'border-elec-yellow border-solid bg-elec-yellow/10' 
                : 'border-elec-yellow/50'
            }`}
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
                  <Upload className="h-8 w-8 text-elec-yellow" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Drop images here or click to select</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG up to 10MB each</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-elec-yellow/30 hover:border-elec-yellow/60"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Browse Files
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => cameraInputRef.current?.click()}
                      className="border-elec-yellow/30 hover:border-elec-yellow/60"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <Card className="border-elec-yellow/30">
              <CardHeader>
                <CardTitle className="text-sm">Selected Files ({selectedFiles.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <AspectRatio ratio={1} className="bg-muted rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeSelectedFile(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </AspectRatio>
                      <p className="text-xs text-center mt-1 truncate">{file.name}</p>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() => handleFileUpload()}
                  disabled={uploading || selectedFiles.length === 0}
                  className="w-full mt-4 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload {selectedFiles.length} Photo(s)
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Photo Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{photos.length}</div>
            <div className="text-sm text-muted-foreground">Total Photos</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {photos.filter(p => p.category === "Safety Procedure").length}
            </div>
            <div className="text-sm text-muted-foreground">Safety Photos</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {photos.filter(p => p.category === "Before Work").length}
            </div>
            <div className="text-sm text-muted-foreground">Before Photos</div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {photos.filter(p => p.category === "After Work").length}
            </div>
            <div className="text-sm text-muted-foreground">After Photos</div>
          </CardContent>
        </Card>
      </div>

      {/* Photo Gallery */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Photo Gallery ({photos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {photos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No photos uploaded yet. Start documenting your work with the upload tool above.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <Card key={photo.id} className="border-elec-yellow/30 overflow-hidden">
                  <div className="relative">
                    <AspectRatio ratio={4/3}>
                      <img
                        src={photo.file_url}
                        alt={photo.description}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </AspectRatio>
                    <div className="absolute top-2 left-2">
                      <Badge className={getCategoryColor(photo.category)}>
                        {photo.category}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <FileViewer
                        fileName={photo.filename}
                        fileUrl={photo.file_url}
                        fileType={photo.mime_type}
                        trigger={
                          <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-background/80 backdrop-blur-sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        }
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removePhoto(photo.id)}
                        className="h-6 w-6 p-0 bg-background/80 backdrop-blur-sm hover:bg-destructive/80"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="font-medium text-sm truncate">{photo.description}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(photo.created_at).toLocaleString()}
                      </div>
                      {photo.location && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          📍 {photo.location}
                        </div>
                      )}
                      {(photo.gps_latitude && photo.gps_longitude) && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          GPS: {photo.gps_latitude.toFixed(4)}, {photo.gps_longitude.toFixed(4)}
                        </div>
                      )}
                      {photo.tags && photo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
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
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Options */}
      {photos.length > 0 && (
        <Card className="border-green-500/20 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-300">Export Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export All Photos
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Generate Photo Report
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export by Category
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PhotoDocumentation;
