
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, Download, Trash2, Eye, MapPin, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!newPhoto.description.trim()) {
      toast({
        title: "Error",
        description: "Please add a description for the photo",
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

      // Upload file to Supabase storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
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

      setPhotos(prev => [data, ...prev]);
      setNewPhoto({ description: "", category: "General", location: "", tags: "", gpsEnabled: false });
      
      toast({
        title: "Success",
        description: "Photo uploaded successfully",
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
          
          <div className="border-2 border-dashed border-elec-yellow/50 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="photo-upload"
              disabled={uploading}
            />
            <Label htmlFor="photo-upload" className={`cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
              <div className="flex flex-col items-center gap-2">
                {uploading ? (
                  <>
                    <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
                    <span className="text-sm font-medium">Uploading photo...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-elec-yellow" />
                    <span className="text-sm font-medium">Click to upload photo</span>
                    <span className="text-xs text-muted-foreground">JPG, PNG up to 10MB</span>
                  </>
                )}
              </div>
            </Label>
          </div>
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
                <Card key={photo.id} className="border-elec-yellow/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={getCategoryColor(photo.category)}>
                        {photo.category}
                      </Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => removePhoto(photo.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium text-sm">{photo.filename}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(photo.created_at).toLocaleString()}
                      </div>
                      <div className="text-sm">{photo.description}</div>
                      {photo.location && (
                        <div className="text-xs text-muted-foreground">📍 {photo.location}</div>
                      )}
                      {(photo.gps_latitude && photo.gps_longitude) && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          GPS: {photo.gps_latitude.toFixed(6)}, {photo.gps_longitude.toFixed(6)}
                        </div>
                      )}
                      {photo.tags && photo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {photo.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
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
