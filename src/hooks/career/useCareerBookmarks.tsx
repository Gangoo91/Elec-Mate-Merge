
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CareerBookmark {
  id: string;
  user_id: string;
  career_path_id: string;
  created_at: string;
}

export const useCareerBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<CareerBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBookmarks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('career_bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      toast({
        title: "Error",
        description: "Failed to load bookmarks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (careerPathId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const existing = bookmarks.find(b => b.career_path_id === careerPathId);

      if (existing) {
        // Remove bookmark
        const { error } = await supabase
          .from('career_bookmarks')
          .delete()
          .eq('id', existing.id);

        if (error) throw error;

        setBookmarks(prev => prev.filter(b => b.id !== existing.id));
        toast({
          title: "Bookmark Removed",
          description: "Career path removed from favorites",
        });
      } else {
        // Add bookmark
        const { data, error } = await supabase
          .from('career_bookmarks')
          .insert({
            user_id: user.id,
            career_path_id: careerPathId,
          })
          .select()
          .single();

        if (error) throw error;

        setBookmarks(prev => [data, ...prev]);
        toast({
          title: "Bookmark Added",
          description: "Career path added to favorites",
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive",
      });
    }
  };

  const isBookmarked = (careerPathId: string) => {
    return bookmarks.some(b => b.career_path_id === careerPathId);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return {
    bookmarks,
    loading,
    toggleBookmark,
    isBookmarked,
    refetch: fetchBookmarks,
  };
};
