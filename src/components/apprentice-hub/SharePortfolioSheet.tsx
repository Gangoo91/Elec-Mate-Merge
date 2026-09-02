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
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
} from '@/components/forms/fieldStyles';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';
import { usePortfolioSharing, type PortfolioShare } from '@/hooks/portfolio/usePortfolioSharing';
import { useHaptic } from '@/hooks/useHaptic';

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
  const haptic = useHaptic();
  const { shares, isLoading, createShareLink, revokeShareLink, copyShareLink } =
    usePortfolioSharing();
  const [selectedExpiry, setSelectedExpiry] = useState<ExpiryOption>('7d');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    setIsCreating(true);
    haptic.light();
    await createShareLink({ expiresIn: selectedExpiry });
    setIsCreating(false);
  };

  const handleRevoke = async (shareId: string) => {
    haptic.light();
    await revokeShareLink(shareId);
  };

  const handleCopy = (token: string) => {
    haptic.light();
    copyShareLink(token);
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Portfolio"
      title="Share with your assessor"
      description="Create a link so your assessor can view, comment on and mark your evidence."
      bodyClassName="space-y-6"
    >
      {/* Create New Link */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white">Create New Link</h4>
        <div className="flex gap-2 flex-wrap">
          {EXPIRY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                haptic.light();
                setSelectedExpiry(opt.value);
              }}
              className={cn(chipBase, 'px-3.5', selectedExpiry === opt.value ? chipOn : chipOff)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <Button
          onClick={handleCreate}
          disabled={isCreating}
          className={cn(buttonPrimaryCn, 'w-full')}
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
            <p className="text-xs text-white mt-1">Create one above to share your portfolio</p>
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
    </FormSheet>
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
        'space-y-3 rounded-2xl border p-4',
        CARD_SURFACE,
        isExpired ? 'border-white/[0.12]' : 'border-elec-yellow/35'
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
                : 'border-elec-yellow/50 text-elec-yellow'
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
        <span className="text-xs text-white truncate flex-1 font-mono">/view/{share.token}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onCopy}
          disabled={!!isExpired}
          className={cn(buttonSecondaryCn, 'h-11 flex-1 text-elec-yellow')}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
        <Button
          variant="outline"
          onClick={onRevoke}
          className={cn(buttonSecondaryCn, 'h-11 w-11 px-0 text-red-400')}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default SharePortfolioSheet;
