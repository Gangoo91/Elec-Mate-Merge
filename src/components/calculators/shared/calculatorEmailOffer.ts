import { createContext, useContext } from 'react';

/**
 * Whether the page around a calculator is offering to email the result.
 *
 * The offer (`CalculatorWithEmailCapture` on the public tool pages) renders
 * BELOW the whole calculator card — under the guidance and standards
 * accordions. By the time a reader reaches it they have already copied the
 * answer and left: 18 wired pages produced 2 calculator leads in September.
 * This lets the result row, right next to "Copy result", carry an "Email it to
 * me" action that jumps to the form.
 *
 * Absent (null) everywhere inside the app, so the button never appears there.
 * Kept in a hook-only module so the component files stay fast-refreshable.
 */
export interface CalculatorEmailOfferValue {
  /** Scroll to the email form and put the cursor in it. */
  openEmailOffer: () => void;
}

export const CalculatorEmailOfferContext = createContext<CalculatorEmailOfferValue | null>(null);

export const useCalculatorEmailOffer = (): CalculatorEmailOfferValue | null =>
  useContext(CalculatorEmailOfferContext);
