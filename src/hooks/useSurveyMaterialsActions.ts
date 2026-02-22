import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMaterialsLists } from '@/hooks/useMaterialsLists';
import { useToast } from '@/hooks/use-toast';
import type { SurveyAnalysisResult } from '@/types/surveyAnalysis';
import type { SiteVisit } from '@/types/siteVisit';

/**
 * Hook providing actions to send survey materials to Materials Lists or Quote Builder.
 */
export function useSurveyMaterialsActions() {
  const navigate = useNavigate();
  const { createList, addItem } = useMaterialsLists();
  const { toast } = useToast();

  const saveToMaterialsList = useCallback(
    async (visit: SiteVisit, materials: SurveyAnalysisResult['materials_list']) => {
      const listName = `Survey — ${visit.propertyAddress || 'Site Visit'}`;
      const list = await createList(listName);
      if (!list) return;

      for (const item of materials) {
        await addItem(list.id, {
          name: item.description,
          current_price: item.est_price_gbp,
          supplier_name: item.supplier,
        });
      }

      toast({
        title: 'Materials list created',
        description: `${materials.length} items saved to "${listName}"`,
      });
      navigate(`/electrician/materials/lists?from=site-visit&visitId=${visit.id}`);
    },
    [createList, addItem, navigate, toast]
  );

  const sendToQuote = useCallback(
    (visit: SiteVisit, materials: SurveyAnalysisResult['materials_list']) => {
      const materialsSessionId = `materials_${crypto.randomUUID()}`;
      const materialsData = {
        source: 'site_survey' as const,
        sourceLabel: visit.propertyAddress || 'Site Survey',
        materials: materials.map((item) => ({
          id: crypto.randomUUID(),
          description: item.description,
          category: 'materials' as const,
          quantity: item.quantity,
          unitPrice: item.est_price_gbp,
          totalPrice: item.est_price_gbp * item.quantity,
          unit: item.unit || 'each',
          notes: item.supplier ? `Supplier: ${item.supplier}` : undefined,
        })),
        ...(visit.customerName && {
          client: {
            name: visit.customerName || '',
            email: visit.customerEmail || '',
            phone: visit.customerPhone || '',
            address: visit.propertyAddress || '',
            postcode: visit.propertyPostcode || '',
          },
        }),
        ...(visit.propertyAddress && {
          jobDetails: {
            title: `Electrical works — ${visit.propertyAddress}`,
            description: '',
            location: visit.propertyAddress || '',
          },
        }),
      };
      sessionStorage.setItem(materialsSessionId, JSON.stringify({ materialsData }));
      navigate(`/electrician/quote-builder/create?materialsSessionId=${materialsSessionId}`);
    },
    [navigate]
  );

  return { saveToMaterialsList, sendToQuote };
}
