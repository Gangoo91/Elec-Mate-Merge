/**
 * useVideoBookmarks
 *
 * Watch Later / bookmark management persisted to Supabase.
 * localStorage is kept as a write-through cache for fast reads.
 */

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { storageGetSync, storageSetSync, storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

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
  const [keys, setKeys] = useState({
    bookmarkKey: BASE_BOOKMARK_KEY,
    watchedKey: BASE_WATCHED_KEY,
  });

  // Fetch from Supabase on mount / user change
  useEffect(() => {
    const uid = user?.id || null;
    const userKeys = getUserKeys(uid);
    setKeys(userKeys);

    if (!uid) {
      // Not logged in -- fall back to storage only
      setBookmarks(storageGetJSONSync<VideoBookmark[]>(userKeys.bookmarkKey, []));
      setWatchedIds(storageGetJSONSync<string[]>(userKeys.watchedKey, []));
      return;
    }

    // Migrate old global storage data to user-specific keys
    const oldBookmarks = storageGetSync(BASE_BOOKMARK_KEY);
    const newBookmarks = storageGetSync(userKeys.bookmarkKey);
    if (oldBookmarks && !newBookmarks) {
      storageSetSync(userKeys.bookmarkKey, oldBookmarks);
    }
    const oldWatched = storageGetSync(BASE_WATCHED_KEY);
    const newWatched = storageGetSync(userKeys.watchedKey);
    if (oldWatched && !newWatched) {
      storageSetSync(userKeys.watchedKey, oldWatched);
    }

    // Fetch from Supabase
    const fetchData = async () => {
      try {
        const [watchesRes, bookmarksRes] = await Promise.all([
          supabase.from('user_video_watches').select('video_id').eq('user_id', uid),
          supabase
            .from('user_video_bookmarks')
            .select('video_id, title, category, bookmarked_at')
            .eq('user_id', uid),
        ]);

        if (watchesRes.data) {
          const ids = (watchesRes.data as any[]).map((r: any) => r.video_id as string);
          setWatchedIds(ids);
          storageSetJSONSync(userKeys.watchedKey, ids);
        }

        if (bookmarksRes.data) {
          const bms: VideoBookmark[] = (bookmarksRes.data as any[]).map((r: any) => ({
            videoId: r.video_id as string,
            title: r.title as string,
            category: r.category as string,
            bookmarkedAt: r.bookmarked_at as string,
          }));
          setBookmarks(bms);
          storageSetJSONSync(userKeys.bookmarkKey, bms);
        }
      } catch {
        // Fall back to storage on network error
        setBookmarks(storageGetJSONSync<VideoBookmark[]>(userKeys.bookmarkKey, []));
        setWatchedIds(storageGetJSONSync<string[]>(userKeys.watchedKey, []));
      }
    };

    fetchData();
  }, [user]);

  const isBookmarked = useCallback(
    (videoId: string) => {
      return bookmarks.some((b) => b.videoId === videoId);
    },
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    async (videoId: string, title: string, category: string) => {
      const removing = isBookmarked(videoId);

      // Optimistic local update
      let updated: VideoBookmark[];
      if (removing) {
        updated = bookmarks.filter((b) => b.videoId !== videoId);
      } else {
        updated = [
          ...bookmarks,
          {
            videoId,
            title,
            category,
            bookmarkedAt: new Date().toISOString(),
          },
        ];
      }
      setBookmarks(updated);
      storageSetJSONSync(keys.bookmarkKey, updated);

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
            await supabase.from('user_video_bookmarks').upsert(
              {
                user_id: user.id,
                video_id: videoId,
                title,
                category,
                bookmarked_at: new Date().toISOString(),
              },
              { onConflict: 'user_id,video_id' }
            );
          }
        } catch (err) {
          console.error('Error syncing bookmark:', err);
        }
      }
    },
    [bookmarks, isBookmarked, keys.bookmarkKey, user]
  );

  const trackVideoWatched = useCallback(
    async (videoId: string) => {
      if (watchedIds.includes(videoId)) return;

      // Optimistic local update
      const updated = [...watchedIds, videoId];
      setWatchedIds(updated);
      storageSetJSONSync(keys.watchedKey, updated);

      // Persist to Supabase
      if (user) {
        try {
          await supabase.from('user_video_watches').upsert(
            {
              user_id: user.id,
              video_id: videoId,
              watched_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,video_id' }
          );
        } catch (err) {
          console.error('Error syncing video watch:', err);
        }
      }
    },
    [watchedIds, keys.watchedKey, user]
  );

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
