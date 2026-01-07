/**
 * Hook for managing bookmarked/saved education programmes
 * Persists to localStorage for offline access
 */

import { useState, useEffect, useCallback } from "react";
import type { LiveEducationData } from "@/hooks/useLiveEducationData";

const STORAGE_KEY = "elecmate_education_bookmarks";

interface BookmarkData {
  id: string;
  savedAt: string;
}

export const useBookmarks = () => {
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: BookmarkData[] = JSON.parse(stored);
        setBookmarkIds(parsed.map((b) => b.id));
      }
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever bookmarks change
  const saveToStorage = useCallback((ids: string[]) => {
    try {
      const data: BookmarkData[] = ids.map((id) => ({
        id,
        savedAt: new Date().toISOString(),
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save bookmarks:", error);
    }
  }, []);

  // Check if a programme is bookmarked
  const isBookmarked = useCallback(
    (programmeId: string): boolean => {
      return bookmarkIds.includes(programmeId);
    },
    [bookmarkIds]
  );

  // Toggle bookmark status
  const toggleBookmark = useCallback(
    (programmeId: string): boolean => {
      let newBookmarks: string[];
      let isNowBookmarked: boolean;

      if (bookmarkIds.includes(programmeId)) {
        newBookmarks = bookmarkIds.filter((id) => id !== programmeId);
        isNowBookmarked = false;
      } else {
        newBookmarks = [...bookmarkIds, programmeId];
        isNowBookmarked = true;
      }

      setBookmarkIds(newBookmarks);
      saveToStorage(newBookmarks);
      return isNowBookmarked;
    },
    [bookmarkIds, saveToStorage]
  );

  // Add a bookmark
  const addBookmark = useCallback(
    (programmeId: string): void => {
      if (!bookmarkIds.includes(programmeId)) {
        const newBookmarks = [...bookmarkIds, programmeId];
        setBookmarkIds(newBookmarks);
        saveToStorage(newBookmarks);
      }
    },
    [bookmarkIds, saveToStorage]
  );

  // Remove a bookmark
  const removeBookmark = useCallback(
    (programmeId: string): void => {
      if (bookmarkIds.includes(programmeId)) {
        const newBookmarks = bookmarkIds.filter((id) => id !== programmeId);
        setBookmarkIds(newBookmarks);
        saveToStorage(newBookmarks);
      }
    },
    [bookmarkIds, saveToStorage]
  );

  // Clear all bookmarks
  const clearAllBookmarks = useCallback(() => {
    setBookmarkIds([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Get bookmarked programmes from a list
  const getBookmarkedProgrammes = useCallback(
    (programmes: LiveEducationData[]): LiveEducationData[] => {
      return programmes.filter((p) => bookmarkIds.includes(p.id));
    },
    [bookmarkIds]
  );

  return {
    bookmarkIds,
    bookmarkCount: bookmarkIds.length,
    isLoaded,
    isBookmarked,
    toggleBookmark,
    addBookmark,
    removeBookmark,
    clearAllBookmarks,
    getBookmarkedProgrammes,
  };
};

export default useBookmarks;
