
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, BookmarkCheck, Trash2 } from "lucide-react";
import { useCareerBookmarks } from "@/hooks/career/useCareerBookmarks";
import { careerSections } from "@/components/apprentice/career/SectionData";

interface FavoritesPanelProps {
  onSelectPath?: (pathId: string) => void;
}

const FavoritesPanel: React.FC<FavoritesPanelProps> = ({ onSelectPath }) => {
  const { bookmarks, toggleBookmark, loading } = useCareerBookmarks();

  // Mock career paths data - in a real app this would come from a proper data source
  const careerPaths = [
    { id: "qualified-electrician", title: "Qualified Electrician", category: "Foundation" },
    { id: "approved-electrician", title: "Approved Electrician", category: "Professional" },
    { id: "specialist-electrician", title: "Specialist Electrician", category: "Expert" },
    { id: "electrical-contractor", title: "Electrical Contractor", category: "Business" },
    { id: "electrical-supervisor", title: "Electrical Supervisor", category: "Management" },
    { id: "electrical-engineer", title: "Electrical Engineer", category: "Technical" },
  ];

  const getPathDetails = (careerPathId: string) => {
    return careerPaths.find(path => path.id === careerPathId) || 
           { id: careerPathId, title: careerPathId.replace(/-/g, ' '), category: "Other" };
  };

  if (loading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Loading favorites...</div>
        </CardContent>
      </Card>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Heart className="h-5 w-5" />
            Your Favorites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BookmarkCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground text-sm">
              Start bookmarking career paths that interest you to see them here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-elec-yellow">
          <Heart className="h-5 w-5" />
          Your Favorites ({bookmarks.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {bookmarks.map((bookmark) => {
            const pathDetails = getPathDetails(bookmark.career_path_id);
            return (
              <div
                key={bookmark.id}
                className="flex items-center justify-between p-3 rounded-lg border border-elec-yellow/20 bg-elec-dark/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-white capitalize">{pathDetails.title}</h4>
                    <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs">
                      {pathDetails.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Added {new Date(bookmark.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {onSelectPath && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectPath(bookmark.career_path_id)}
                      className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                    >
                      View
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(bookmark.career_path_id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    title="Remove from favorites"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoritesPanel;
