
import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useCareerBookmarks } from "@/hooks/career/useCareerBookmarks";

interface BookmarkButtonProps {
  careerPathId: string;
  className?: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ careerPathId, className }) => {
  const { isBookmarked, toggleBookmark, loading } = useCareerBookmarks();
  const bookmarked = isBookmarked(careerPathId);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => toggleBookmark(careerPathId)}
      disabled={loading}
      className={`transition-colors ${bookmarked ? 'text-elec-yellow hover:text-elec-yellow/80' : 'text-muted-foreground hover:text-elec-yellow'} ${className}`}
      title={bookmarked ? "Remove from favorites" : "Add to favorites"}
    >
      {bookmarked ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </Button>
  );
};

export default BookmarkButton;
