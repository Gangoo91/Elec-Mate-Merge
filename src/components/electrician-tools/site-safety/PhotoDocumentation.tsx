
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, Download, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PhotoDoc {
  id: string;
  filename: string;
  description: string;
  category: string;
  timestamp: string;
  location: string;
  tags: string[];
}

const PhotoDocumentation = () => {
  const [photos, setPhotos] = useState<PhotoDoc[]>([
    {
      id: "1",
      filename: "consumer_unit_before.jpg", 
      description: "Consumer unit condition before replacement",
      category: "Before Work",
      timestamp: "2024-01-15 09:30",
      location: "Ground floor utility room",
      tags: ["consumer unit", "before", "condition"]
    },
    {
      id: "2",
      filename: "isolation_procedure.jpg",
      description: "Isolation and lock-off procedure documented",
      category: "Safety Procedure",
      timestamp: "2024-01-15 09:45", 
      location: "Main electrical intake",
      tags: ["isolation", "safety", "lock-off"]
    }
  ]);

  const [newPhoto, setNewPhoto] = useState({
    description: "",
    category: "General",
    location: "",
    tags: ""
  });

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const photoDoc: PhotoDoc = {
        id: Date.now().toString(),
        filename: file.name,
        description: newPhoto.description,
        category: newPhoto.category,
        timestamp: new Date().toLocaleString(),
        location: newPhoto.location,
        tags: newPhoto.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      
      setPhotos(prev => [...prev, photoDoc]);
      setNewPhoto({ description: "", category: "General", location: "", tags: "" });
    }
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
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
          
          <div className="border-2 border-dashed border-elec-yellow/50 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="photo-upload"
            />
            <Label htmlFor="photo-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-elec-yellow" />
                <span className="text-sm font-medium">Click to upload photo</span>
                <span className="text-xs text-muted-foreground">JPG, PNG up to 10MB</span>
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
                      <div className="text-xs text-muted-foreground">{photo.timestamp}</div>
                      <div className="text-sm">{photo.description}</div>
                      {photo.location && (
                        <div className="text-xs text-muted-foreground">📍 {photo.location}</div>
                      )}
                      {photo.tags.length > 0 && (
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
