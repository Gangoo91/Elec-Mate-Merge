import { useState, useCallback } from 'react';

export function useEICFormValidation() {
  const [validatedTabs, setValidatedTabs] = useState<Set<string>>(new Set());

  const markTabValidated = useCallback(
    (tab: string) => setValidatedTabs((prev) => new Set(prev).add(tab)),
    []
  );

  const markAllValidated = useCallback(
    () =>
      setValidatedTabs(
        new Set(['details', 'inspection', 'testing', 'declarations', 'certificate'])
      ),
    []
  );

  const shouldShowError = useCallback((tab: string) => validatedTabs.has(tab), [validatedTabs]);

  const resetValidation = useCallback(() => setValidatedTabs(new Set()), []);

  return { markTabValidated, markAllValidated, shouldShowError, resetValidation };
}
