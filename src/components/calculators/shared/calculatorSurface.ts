import { createContext, useContext } from 'react';

/**
 * Where a calculator is being rendered.
 *
 * The design system says cards go edge-to-edge on mobile (`-mx-4 … sm:mx-0`),
 * but a calculator renders its own CalculatorCard — the page cannot pass a prop
 * down into the card buried inside AdiabaticCalculator. So the surface travels
 * by context instead.
 *
 * Opt-in rather than default: `-mx-4` assumes a parent with `px-4`. That holds
 * on the public tool pages, but is not guaranteed everywhere the 66 calculators
 * appear in the app, and a wrong guess bleeds content off the side of a phone.
 *
 * Kept in a hook-only module so the component files stay fast-refreshable.
 */
export interface CalculatorSurfaceValue {
  edgeToEdge: boolean;
}

export const CalculatorSurfaceContext = createContext<CalculatorSurfaceValue>({
  edgeToEdge: false,
});

export const useCalculatorSurface = (): CalculatorSurfaceValue =>
  useContext(CalculatorSurfaceContext);
