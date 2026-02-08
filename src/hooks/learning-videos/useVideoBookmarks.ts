/**
 * useVideoBookmarks
 *
 * Watch Later / bookmark management persisted to Supabase.
 * localStorage is kept as a write-through cache for fast reads.
 */

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const BASE_BOOKMARK_KEY = 'elec-mate-video-bookmarks';
const BASE_WATCHED_KEY = 'elec-mate-videos-watched';

export interface VideoBookmark {
  videoId: string;
  title: string;
  category: string;
  bookmarkedAt: string;
}

function getUserKeys(userId: string | null) {
  const suffix = userId ? `-${userId}` : '';
  return {
    bookmarkKey: `${BASE_BOOKMARK_KEY}${suffix}`,
    watchedKey: `${BASE_WATCHED_KEY}${suffix}`,
  };
}

export function useVideoBookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<VideoBookmark[]>([]);
  const [watchedIds, setWatchedIds] = useState<string[]>([]);
  const [keys, setKeys] = useState({ bookmarkKey: BASE_BOOKMARK_KEY, watchedKey: BASE_WATCHED_KEY });

  // Fetch from Supabase on mount / user change
  useEffect(() => {
    const uid = user?.id || null;
    const userKeys = getUserKeys(uid);
    setKeys(userKeys);

    if (!uid) {
      // Not logged in – fall back to localStorage only
      try {
        const stored = localStorage.getItem(userKeys.bookmarkKey);
        if (stored) setBookmarks(JSON.parse(stored));
      } catch { /* ignore */ }
      try {
        const stored = localStorage.getItem(userKeys.watchedKey);
        if (stored) setWatchedIds(JSON.parse(stored));
      } catch { /* ignore */ }
      return;
    }

    // Migrate old global localStorage data to user-specific keys
    try {
      const oldBookmarks = localStorage.getItem(BASE_BOOKMARK_KEY);
      const newBookmarks = localStorage.getItem(userKeys.bookmarkKey);
      if (oldBookmarks && !newBookmarks) {
        localStorage.setItem(userKeys.bookmarkKey, oldBookmarks);
      }
      const oldWatched = localStorage.getItem(BASE_WATCHED_KEY);
      const newWatched = localStorage.getItem(userKeys.watchedKey);
      if (oldWatched && !newWatched) {
        localStorage.setItem(userKeys.watchedKey, oldWatched);
      }
    } catch { /* ignore */ }

    // Fetch from Supabase
    const fetchData = async () => {
      try {
        const [watchesRes, bookmarksRes] = await Promise.all([
          supabase
            .from('user_video_watches')
            .select('video_id')
            .eq('user_id', uid),
          supabase
            .from('user_video_bookmarks')
            .select('video_id, title, category, bookmarked_at')
            .eq('user_id', uid),
        ]);

        if (watchesRes.data) {
          const ids = (watchesRes.data as any[]).map((r: any) => r.video_id as string);
          setWatchedIds(ids);
          localStorage.setItem(userKeys.watchedKey, JSON.stringify(ids));
        }

        if (bookmarksRes.data) {
          const bms: VideoBookmark[] = (bookmarksRes.data as any[]).map((r: any) => ({
            videoId: r.video_id as string,
            title: r.title as string,
            category: r.category as string,
            bookmarkedAt: r.bookmarked_at as string,
          }));
          setBookmarks(bms);
          localStorage.setItem(userKeys.bookmarkKey, JSON.stringify(bms));
        }
      } catch {
        // Fall back to localStorage on network error
        try {
          const stored = localStorage.getItem(userKeys.bookmarkKey);
          if (stored) setBookmarks(JSON.parse(stored));
        } catch { /* ignore */ }
        try {
          const stored = localStorage.getItem(userKeys.watchedKey);
          if (stored) setWatchedIds(JSON.parse(stored));
        } catch { /* ignore */ }
      }
    };

    fetchData();
  }, [user]);

  const isBookmarked = useCallback((videoId: string) => {
    return bookmarks.some(b => b.videoId === videoId);
  }, [bookmarks]);

  const toggleBookmark = useCallback(async (videoId: string, title: string, category: string) => {
    const removing = isBookmarked(videoId);

    // Optimistic local update
    let updated: VideoBookmark[];
    if (removing) {
      updated = bookmarks.filter(b => b.videoId !== videoId);
    } else {
      updated = [...bookmarks, {
        videoId,
        title,
        category,
        bookmarkedAt: new Date().toISOString(),
      }];
    }
    setBookmarks(updated);
    localStorage.setItem(keys.bookmarkKey, JSON.stringify(updated));

    // Persist to Supabase
    if (user) {
      try {
        if (removing) {
          await supabase
            .from('user_video_bookmarks')
            .delete()
            .eq('user_id', user.id)
            .eq('video_id', videoId);
        } else {
          await supabase
            .from('user_video_bookmarks')
            .upsert({
              user_id: user.id,
              video_id: videoId,
              title,
              category,
              bookmarked_at: new Date().toISOString(),
            }, { onConflict: 'user_id,video_id' });
        }
      } catch (err) {
        console.error('Error syncing bookmark:', err);
      }
    }
  }, [bookmarks, isBookmarked, keys.bookmarkKey, user]);

  const trackVideoWatched = useCallback(async (videoId: string) => {
    if (watchedIds.includes(videoId)) return;

    // Optimistic local update
    const updated = [...watchedIds, videoId];
    setWatchedIds(updated);
    localStorage.setItem(keys.watchedKey, JSON.stringify(updated));

    // Persist to Supabase
    if (user) {
      try {
        await supabase
          .from('user_video_watches')
          .upsert({
            user_id: user.id,
            video_id: videoId,
            watched_at: new Date().toISOString(),
          }, { onConflict: 'user_id,video_id' });
      } catch (err) {
        console.error('Error syncing video watch:', err);
      }
    }
  }, [watchedIds, keys.watchedKey, user]);

  const getWatchedIds = useCallback((): string[] => {
    return watchedIds;
  }, [watchedIds]);

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    watchedCount: watchedIds.length,
    trackVideoWatched,
    getWatchedIds,
  };
}
