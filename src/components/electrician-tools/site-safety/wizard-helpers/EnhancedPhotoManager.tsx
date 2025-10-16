import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Trash2, GripVertical, Edit2, Check, X } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface Photo {
  url: string;
  caption: string;
  filename: string;
}

interface EnhancedPhotoManagerProps {
  photos: Photo[];
  onPhotosChange: (photos: Photo[]) => void;
  onPhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeletePhoto: (index: number) => void;
  uploadingPhotos: boolean;
}

export const EnhancedPhotoManager = ({
  photos,
  onPhotosChange,
  onPhotoUpload,
  onDeletePhoto,
  uploadingPhotos,
}: EnhancedPhotoManagerProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editCaption, setEditCaption] = useState("");

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onPhotosChange(items);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditCaption(photos[index].caption || "");
  };

  const saveCaption = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index] = { ...updatedPhotos[index], caption: editCaption };
    onPhotosChange(updatedPhotos);
    setEditingIndex(null);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditCaption("");
  };

  // Check if device has camera
  const hasCamera = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;

  return (
    <div className="space-y-4">
      {/* Upload Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label
            htmlFor="photo-upload"
            className="flex items-center justify-center gap-2 h-12 px-4 rounded-lg border-2 border-dashed border-elec-yellow/30 bg-elec-yellow/5 hover:bg-elec-yellow/10 text-elec-light cursor-pointer transition-all"
          >
            <Camera className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium">
              {uploadingPhotos ? "Uploading..." : "Upload Photos"}
            </span>
          </Label>
          <Input
            id="photo-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={onPhotoUpload}
            disabled={uploadingPhotos}
            className="hidden"
          />
        </div>

        {hasCamera && (
          <div>
            <Label
              htmlFor="camera-capture"
              className="flex items-center justify-center gap-2 h-12 px-4 rounded-lg border-2 border-dashed border-elec-yellow/30 bg-elec-yellow/5 hover:bg-elec-yellow/10 text-elec-light cursor-pointer transition-all"
            >
              <Camera className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-medium">Take Photo</span>
            </Label>
            <Input
              id="camera-capture"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={onPhotoUpload}
              disabled={uploadingPhotos}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Photo Grid with Drag & Drop */}
      {photos.length > 0 && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="photos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {photos.map((photo, index) => (
                  <Draggable
                    key={`${photo.url}-${index}`}
                    draggableId={`photo-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`
                          p-3 bg-card border-primary/30 transition-all
                          ${snapshot.isDragging ? 'shadow-lg scale-105 border-elec-yellow' : ''}
                        `}
                      >
                        <div className="flex gap-3">
                          {/* Drag Handle */}
                          <div
                            {...provided.dragHandleProps}
                            className="flex items-center cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical className="h-5 w-5 text-elec-light/40" />
                          </div>

                          {/* Photo Preview */}
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-elec-dark/50 flex-shrink-0">
                            <img
                              src={photo.url}
                              alt={photo.caption || photo.filename}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Caption Editor */}
                          <div className="flex-1 min-w-0">
                            {editingIndex === index ? (
                              <div className="space-y-2">
                                <Input
                                  value={editCaption}
                                  onChange={(e) => setEditCaption(e.target.value)}
                                  placeholder="Add photo caption..."
                                  className="h-9 bg-card border-elec-yellow/40 text-sm"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') saveCaption(index);
                                    if (e.key === 'Escape') cancelEditing();
                                  }}
                                />
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => saveCaption(index)}
                                    className="h-7 px-3 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={cancelEditing}
                                    className="h-7 px-3"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-elec-light truncate">
                                      {photo.caption || photo.filename}
                                    </p>
                                    <p className="text-xs text-elec-light/50">
                                      Photo {index + 1} of {photos.length}
                                    </p>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => startEditing(index)}
                                    className="h-7 px-2 text-elec-yellow hover:text-elec-yellow/80"
                                  >
                                    <Edit2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Delete Button */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDeletePhoto(index)}
                            className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 h-7 px-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {photos.length === 0 && (
        <div className="text-center py-8 text-elec-light/50 text-sm">
          No photos added yet. Upload or capture photos to document the site.
        </div>
      )}
    </div>
  );
};
