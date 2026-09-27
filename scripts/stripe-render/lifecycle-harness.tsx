/**
 * ELE-1780 — drives `useQuoteBuilder` FOR REAL.
 *
 * The unit checks cover `labourForTimeAllowance` and `reconcileDerivedLabour`
 * in isolation. They say nothing about the hook that orchestrates them, which
 * is where the wiring can be wrong: whether the parent id is minted before its
 * child, whether an edit recomputes, whether a delete takes the child with it.
 * So this mounts the real hook and pushes real actions through it.
 */
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useQuoteBuilder } from '@/hooks/useQuoteBuilder';

const Driver = () => {
  const { quote, addItem, updateItem, removeItem } = useQuoteBuilder();
  const [step, setStep] = useState(0);
  const items = quote.items ?? [];

  // Scripted, one action per tick, so each state is observable.
  useEffect(() => {
    const t = setTimeout(() => {
      if (step === 0) {
        addItem({
          description: 'Double socket outlet',
          quantity: 10,
          unit: 'each',
          unitPrice: 12.4,
          category: 'materials',
          timeAllowance: [{ grade: 'electrician', hours: 0.5 }],
        });
        setStep(1);
      } else if (step === 1 && items.length === 2) {
        // Change the quantity — the derived labour must follow it.
        updateItem(items[0].id, { quantity: 20 });
        setStep(2);
      } else if (step === 2) {
        removeItem(items[0].id);
        setStep(3);
      }
    }, 120);
    return () => clearTimeout(t);
  }, [step, items, addItem, updateItem, removeItem]);

  return (
    <div>
      <div id="step">step:{step}</div>
      <div id="items">
        {items
          .map(
            (i) =>
              `${i.category}|${i.description}|qty=${i.quantity}|derived=${i.derivedFromItemId ? 'yes' : 'no'}`
          )
          .join(' ;; ')}
      </div>
      <div id="count">count:{items.length}</div>
    </div>
  );
};

const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={qc}>
    <Driver />
  </QueryClientProvider>
);
