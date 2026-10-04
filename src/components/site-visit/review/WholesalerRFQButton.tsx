/**
 * WholesalerRFQButton (ELE-1118)
 *
 * Turns the (editable, live-priced) site-visit materials list into a clean,
 * price-free Request-for-Quotation and fires it at the spark's saved
 * wholesalers — all in BCC, so the merchants quote blind and "fight for it".
 * Falls back to copy / WhatsApp / a blank-recipient email.
 *
 * No backend — contacts are RLS-scoped rows; sending uses clipboard / wa.me /
 * mailto (the user's own mail app).
 */
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Store } from 'lucide-react';
import { SupplierRequestSheet } from '@/components/suppliers/SupplierRequestSheet';
import type { SupplierLine } from '@/utils/supplierRequest';
import type { SiteVisit } from '@/types/siteVisit';
import type { MaterialItem } from '@/types/surveyAnalysis';

interface WholesalerRFQButtonProps {
  visit: SiteVisit;
  materials: MaterialItem[];
}

/*
 * The sheet, the message and the wholesaler picker moved to
 * components/suppliers/SupplierRequestSheet when a quote needed the same thing
 * (ELE-1795). Every site-visit line is sent, as before.
 */
export const WholesalerRFQButton = ({ visit, materials }: WholesalerRFQButtonProps) => {
  const [open, setOpen] = useState(false);
  const lines = useMemo<SupplierLine[]>(
    () =>
      materials
        // Nothing to order on a zero line — the quote path drops them too.
        .filter((m) => m.description?.trim() && Number(m.quantity) > 0)
        .map((m, i) => ({
          id: `${i}`,
          quantity: Number(m.quantity) || 0,
          unit: m.unit ?? '',
          description: m.description,
          include: true,
          kind: 'materials' as const,
        })),
    [materials]
  );

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disabled={lines.length === 0}
        variant="outline"
        className="h-11 flex-1 touch-manipulation rounded-xl border-white/[0.15] bg-white/[0.04] text-[13px] font-medium text-white transition-transform hover:bg-white/[0.08] active:scale-[0.98] disabled:opacity-50"
      >
        <Store className="mr-2 h-4 w-4" />
        Wholesaler RFQ
      </Button>
      <SupplierRequestSheet
        open={open}
        onOpenChange={setOpen}
        lines={lines}
        siteAddress={visit.propertyAddress || undefined}
      />
    </>
  );
};

export default WholesalerRFQButton;
