/**
 * SharePortfolioSheet
 *
 * Bottom sheet for creating and managing assessor share links.
 * Uses usePortfolioSharing hook for all CRUD operations.
 */

import { useState } from 'react';
import { Copy, Link2, Trash2, Eye, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePortfolioSharing, type PortfolioShare } from '@/hooks/portfolio/usePortfolioSharing';
import { useHaptics } from '@/hooks/useHaptics';

interface SharePortfolioSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ExpiryOption = '24h' | '7d' | '30d' | 'never';

const EXPIRY_OPTIONS: { value: ExpiryOption; label: string }[] = [
  { value: '24h', label: '24 hours' },
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: 'never', label: 'Never' },
];

function formatExpiry(expiresAt: string | null): string {
  if (!expiresAt) return 'Never expires';
  const date = new Date(expiresAt);
  const now = new Date();
  if (date < now) return 'Expired';
  const days = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Expires today';
  if (days === 1) return 'Expires tomorrow';
  return `Expires in ${days} days`;
}

export function SharePortfolioSheet({ open, onOpenChange }: SharePortfolioSheetProps) {
  const haptics = useHaptics();
  const { shares, isLoading, createShareLink, revokeShareLink, copyShareLink } =
    usePortfolioSharing();
  const [selectedExpiry, setSelectedExpiry] = useState<ExpiryOption>('7d');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    setIsCreating(true);
    haptics.tap();
    await createShareLink({ expiresIn: selectedExpiry });
    setIsCreating(false);
  };

  const handleRevoke = async (shareId: string) => {
    haptics.tap();
    await revokeShareLink(shareId);
  };

  const handleCopy = (token: string) => {
    haptics.tap();
    copyShareLink(token);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[75vh] rounded-t-3xl p-0">
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />
        <div className="flex flex-col h-full">
          <SheetHeader className="px-5 pb-3">
            <SheetTitle className="text-left">Share with Assessor</SheetTitle>
            <SheetDescription className="text-left text-white text-sm">
              Create a link so your assessor can view, comment on, and mark your evidence
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 pb-20 sm:pb-8 space-y-6">
            {/* Create New Link */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Create New Link</h4>
              <div className="flex gap-2 flex-wrap">
                {EXPIRY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      haptics.tap();
                      setSelectedExpiry(opt.value);
                    }}
                    className={cn(
                      'px-3 py-2 rounded-xl text-xs font-medium touch-manipulation active:scale-95 transition-all',
                      selectedExpiry === opt.value
                        ? 'bg-elec-yellow text-black'
                        : 'bg-white/[0.06] text-white border border-white/[0.08]'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <Button
                onClick={handleCreate}
                disabled={isCreating}
                className="w-full h-12 rounded-2xl bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-sm touch-manipulation active:scale-[0.97] transition-transform"
              >
                {isCreating ? (
                  <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Link2 className="h-4 w-4 mr-2" />
                )}
                Create Link
              </Button>
            </div>

            {/* Active Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">
                Active Links{shares.length > 0 && ` (${shares.length})`}
              </h4>

              {isLoading && (
                <div className="flex items-center justify-center py-6">
                  <div className="h-5 w-5 border-2 border-elec-yellow border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {!isLoading && shares.length === 0 && (
                <div className="text-center py-6">
                  <Link2 className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="text-sm text-white">No active share links</p>
                  <p className="text-xs text-white mt-1">
                    Create one above to share your portfolio
                  </p>
                </div>
              )}

              {shares.map((share) => (
                <ShareLinkCard
                  key={share.id}
                  share={share}
                  onCopy={() => handleCopy(share.token)}
                  onRevoke={() => handleRevoke(share.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ShareLinkCard({
  share,
  onCopy,
  onRevoke,
}: {
  share: PortfolioShare;
  onCopy: () => void;
  onRevoke: () => void;
}) {
  const isExpired = share.expires_at && new Date(share.expires_at) < new Date();

  return (
    <div
      className={cn(
        'p-4 rounded-2xl border space-y-3',
        isExpired
          ? 'bg-white/[0.02] border-white/[0.06] opacity-60'
          : 'bg-white/[0.03] border-white/[0.08]'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              'text-[10px]',
              isExpired
                ? 'border-red-500/30 text-red-400'
                : 'border-green-500/30 text-green-400'
            )}
          >
            {isExpired ? 'Expired' : 'Active'}
          </Badge>
          <div className="flex items-center gap-1 text-white text-[10px]">
            <Eye className="h-3 w-3" />
            {share.view_count} views
          </div>
        </div>
        <div className="flex items-center gap-1 text-white text-[10px]">
          <Clock className="h-3 w-3" />
          {formatExpiry(share.expires_at)}
        </div>
      </div>

      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
        <ExternalLink className="h-3.5 w-3.5 text-white flex-shrink-0" />
        <span className="text-xs text-white truncate flex-1 font-mono">
          /view/{share.token}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onCopy}
          disabled={!!isExpired}
          className="flex-1 h-11 rounded-xl text-sm font-medium touch-manipulation active:scale-[0.97] transition-transform border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
        <Button
          variant="outline"
          onClick={onRevoke}
          className="h-11 rounded-xl text-sm font-medium touch-manipulation active:scale-[0.97] transition-transform border-red-500/30 text-red-400 hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default SharePortfolioSheet;
