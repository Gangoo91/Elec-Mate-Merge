/**
 * One chart style for the Finance pages (10 Oct 2026): Finance's money chart
 * and the Cash forecast read as the same family. Recharts cannot read CSS
 * variables, so the brand yellow is written out here once.
 */
import { formatGBPCompact } from '@/lib/financeDefinitions';

export const YELLOW_HEX = 'hsl(47 100% 50%)';
export const WHITE_HEX = 'rgba(255,255,255,0.9)';

/** Axis labels: full white, small, the app's font. */
export const chartTick = { fill: '#fff', fontSize: 12 };

/** £0, £450, £1.2k, £13k: compact money on an axis. */
export const moneyTick = (v: number) => (v === 0 ? '£0' : formatGBPCompact(v));
