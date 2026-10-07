import { useCallback, useRef, useState } from 'react';
import {
  discardAttachment,
  MAX_ATTACHMENTS,
  uploadAttachment,
  type CommsAttachment,
} from '@/services/teamCommsService';

export interface PendingItem {
  key: string;
  name: string;
  uploading: boolean;
  error?: string;
  attachment?: CommsAttachment;
}

/**
 * Pick → upload straight away (so Send is instant) → hand the stored paths to
 * comms_send / comms_reply. Removing a chip deletes the upload; the storage
 * policy refuses once it is attached to a sent message.
 */
export function useAttachmentPicker(firmId: string | null | undefined) {
  const [items, setItems] = useState<PendingItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const open = useCallback(() => inputRef.current?.click(), []);

  const addFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || !firmId) return;
      const room = Math.max(0, MAX_ATTACHMENTS - items.length);
      const picked = Array.from(files).slice(0, room);
      const fresh = picked.map((f) => ({
        key: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: f.name || 'Attachment',
        uploading: true,
      }));
      setItems((prev) => [...prev, ...fresh]);
      await Promise.all(
        picked.map(async (file, i) => {
          const key = fresh[i].key;
          try {
            const attachment = await uploadAttachment(firmId, file);
            setItems((prev) =>
              prev.map((it) => (it.key === key ? { ...it, uploading: false, attachment } : it))
            );
          } catch (e) {
            const msg = e instanceof Error ? e.message : 'Upload failed';
            setItems((prev) =>
              prev.map((it) => (it.key === key ? { ...it, uploading: false, error: msg } : it))
            );
          }
        })
      );
    },
    [firmId, items.length]
  );

  const remove = useCallback((key: string) => {
    setItems((prev) => {
      const it = prev.find((p) => p.key === key);
      if (it?.attachment) void discardAttachment(it.attachment.path);
      return prev.filter((p) => p.key !== key);
    });
  }, []);

  /** After a successful send: forget the chips without deleting the files. */
  const clear = useCallback(() => setItems([]), []);

  /** Abandoning a draft: delete anything uploaded but not sent. */
  const discardAll = useCallback(() => {
    setItems((prev) => {
      prev.forEach((it) => it.attachment && void discardAttachment(it.attachment.path));
      return [];
    });
  }, []);

  const ready = items.filter((i) => i.attachment).map((i) => i.attachment as CommsAttachment);
  const busy = items.some((i) => i.uploading);
  const full = items.length >= MAX_ATTACHMENTS;

  return { items, ready, busy, full, inputRef, open, addFiles, remove, clear, discardAll };
}
