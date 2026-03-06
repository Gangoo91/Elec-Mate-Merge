import { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { X, Loader2, Link2 } from 'lucide-react';
import type { UnlinkedItem } from '@/hooks/useProjectEntities';

interface LinkEntitySheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fetchItems: () => Promise<UnlinkedItem[]>;
  onSelect: (id: string) => Promise<boolean>;
}

export function LinkEntitySheet({
  isOpen,
  onClose,
  title,
  fetchItems,
  onSelect,
}: LinkEntitySheetProps) {
  const [items, setItems] = useState<UnlinkedItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [linking, setLinking] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    fetchItems()
      .then(setItems)
      .finally(() => setIsLoading(false));
  }, [isOpen, fetchItems]);

  async function handleSelect(id: string) {
    setLinking(id);
    const ok = await onSelect(id);
    setLinking(null);
    if (ok) onClose();
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl bg-background max-h-[70vh] outline-none">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pb-3 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 touch-manipulation"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <Link2 className="h-6 w-6 text-white mb-2" />
                <p className="text-sm text-white">Nothing to link.</p>
                <p className="text-[12px] text-white mt-1">
                  All items are already linked to a project.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  disabled={linking !== null}
                  className="w-full flex items-center justify-between min-h-[44px] px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-left touch-manipulation active:bg-white/[0.08] transition-colors disabled:opacity-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{item.label}</p>
                    {item.sublabel && (
                      <p className="text-[12px] text-white truncate">{item.sublabel}</p>
                    )}
                  </div>
                  {linking === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin text-white ml-2 flex-shrink-0" />
                  ) : (
                    <Link2 className="h-4 w-4 text-white ml-2 flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
