import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bookmark, BookmarkCheck, Heart, Download, Share2, 
  Filter, X, Calendar, Clock, Star 
} from "lucide-react";
import { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";
import { useToast } from "@/hooks/use-toast";

interface CourseBookmarkManagerProps {
  courses: EnhancedCareerCourse[];
  onViewDetails: (course: EnhancedCareerCourse) => void;
}

interface BookmarkedCourse extends EnhancedCareerCourse {
  bookmarkedAt: Date;
  notes?: string;
  priority: "high" | "medium" | "low";
}

const CourseBookmarkManager = ({ courses, onViewDetails }: CourseBookmarkManagerProps) => {
  const [bookmarkedCourses, setBookmarkedCourses] = useState<BookmarkedCourse[]>([]);
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const { toast } = useToast();

  const toggleBookmark = (course: EnhancedCareerCourse) => {
    const existingIndex = bookmarkedCourses.findIndex(b => String(b.id) === String(course.id));
    
    if (existingIndex >= 0) {
      setBookmarkedCourses(prev => prev.filter(b => String(b.id) !== String(course.id)));
      toast({
        title: "Course removed from saved",
        description: `${course.title} has been removed from your saved courses.`,
        variant: "default"
      });
    } else {
      const newBookmark: BookmarkedCourse = {
        ...course,
        bookmarkedAt: new Date(),
        priority: "medium"
      };
      setBookmarkedCourses(prev => [...prev, newBookmark]);
      toast({
        title: "Course saved!",
        description: `${course.title} has been added to your saved courses.`,
        variant: "success"
      });
    }
  };

  const updatePriority = (courseId: string | number, priority: "high" | "medium" | "low") => {
    setBookmarkedCourses(prev => 
      prev.map(course => 
        String(course.id) === String(courseId) ? { ...course, priority } : course
      )
    );
  };

  const isBookmarked = (courseId: string | number) => {
    return bookmarkedCourses.some(b => String(b.id) === String(courseId));
  };

  const exportBookmarks = () => {
    const data = bookmarkedCourses.map(course => ({
      title: course.title,
      provider: course.provider,
      category: course.category,
      duration: course.duration,
      price: course.price,
      priority: course.priority,
      bookmarkedAt: course.bookmarkedAt.toLocaleDateString(),
      nextDates: course.nextDates.join(', ')
    }));

    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saved_courses.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export complete",
      description: "Your saved courses have been exported as CSV.",
      variant: "success"
    });
  };

  const shareBookmarks = () => {
    const courseList = bookmarkedCourses
      .map(course => `• ${course.title} (${course.provider})`)
      .join('\n');
    
    const shareText = `My Saved Electrical Career Courses:\n\n${courseList}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Saved Career Courses',
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard",
        description: "Course list has been copied to your clipboard.",
        variant: "success"
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredBookmarks = bookmarkedCourses.filter(course => 
    filterPriority === "all" || course.priority === filterPriority
  );

  return (
    <div className="space-y-6">
      {/* Bookmark Actions for Course Cards */}
      <div className="hidden">
        {courses.map(course => (
          <Button
            key={course.id}
            variant="ghost"
            size="sm"
            onClick={() => toggleBookmark(course)}
            className={`${isBookmarked(course.id) ? 
              'text-elec-yellow hover:text-elec-yellow/80' : 
              'text-muted-foreground hover:text-elec-yellow'
            }`}
            title={isBookmarked(course.id) ? "Remove from saved" : "Save course"}
          >
            {isBookmarked(course.id) ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        ))}
      </div>

      {/* Saved Courses Manager */}
      {bookmarkedCourses.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-400" />
                Saved Courses ({bookmarkedCourses.length})
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportBookmarks}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={shareBookmarks}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Priority Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-medium">Filter by priority:</span>
              <div className="flex gap-2">
                {["all", "high", "medium", "low"].map(priority => (
                  <Button
                    key={priority}
                    variant={filterPriority === priority ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterPriority(priority)}
                    className={filterPriority === priority ? 
                      "bg-elec-yellow text-elec-dark" : 
                      "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    }
                  >
                    {priority === "all" ? "All" : priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Saved Courses List */}
            <div className="space-y-3">
              {filteredBookmarks.map(course => (
                <div 
                  key={course.id}
                  className="border border-elec-yellow/10 rounded-lg p-4 hover:border-elec-yellow/20 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-grow space-y-2">
                      <div className="flex items-start gap-2 flex-wrap">
                        <h4 className="font-medium text-sm">{course.title}</h4>
                        <Badge className={getPriorityColor(course.priority)}>
                          {course.priority} priority
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-elec-yellow">{course.provider}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {course.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Saved {course.bookmarkedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Priority Buttons */}
                      <div className="flex gap-1">
                        {["high", "medium", "low"].map(priority => (
                          <Button
                            key={priority}
                            variant={course.priority === priority ? "default" : "ghost"}
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => updatePriority(course.id, priority as any)}
                          >
                            {priority.charAt(0).toUpperCase()}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(course)}
                      >
                        View
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(course)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Export the bookmark toggle function for use in course cards
export const useBookmarkManager = () => {
  const [bookmarkedCourses, setBookmarkedCourses] = useState<(string | number)[]>([]);
  const { toast } = useToast();

  const toggleBookmark = (course: EnhancedCareerCourse) => {
    if (bookmarkedCourses.includes(course.id)) {
      setBookmarkedCourses(prev => prev.filter(id => id !== course.id));
      toast({
        title: "Course removed from saved",
        description: `${course.title} has been removed from your saved courses.`,
        variant: "default"
      });
    } else {
      setBookmarkedCourses(prev => [...prev, course.id]);
      toast({
        title: "Course saved!",
        description: `${course.title} has been added to your saved courses.`,
        variant: "success"
      });
    }
  };

  const isBookmarked = (courseId: string | number) => bookmarkedCourses.includes(courseId);

  return { toggleBookmark, isBookmarked };
};

export default CourseBookmarkManager;