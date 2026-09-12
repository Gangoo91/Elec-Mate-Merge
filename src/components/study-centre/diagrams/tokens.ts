/**
 * Shared SVG colour tokens for the diagram families.
 *
 * Own module so `diagrams.tsx` can stay components-only — exporting a const
 * alongside components breaks Vite's fast refresh for the whole file, and
 * that file is 4,400 lines.
 */
export const COLOUR = {
  wire: 'rgba(255,255,255,0.6)',
  wireFaint: 'rgba(255,255,255,0.3)',
  yellow: 'hsl(47 100% 50%)',
  grid: 'rgba(255,255,255,0.06)',
  text: 'white',
  textDim: 'rgba(255,255,255,0.7)',
  blue: '#60a5fa',
  orange: '#fb923c',
  emerald: '#34d399',
  red: '#f87171',
} as const;
