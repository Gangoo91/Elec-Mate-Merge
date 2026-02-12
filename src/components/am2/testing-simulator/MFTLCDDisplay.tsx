/**
 * MFTLCDDisplay v2 — Compact
 *
 * Tighter padding, smaller font sizes to fit compact MFT layout.
 * Dark green-on-black LCD with mode indicator, reading, and bar graph.
 */

import { cn } from '@/lib/utils';
import type { DialPosition, TestReading } from '@/types/am2-testing-simulator';
import { DIAL_POSITIONS } from '@/types/am2-testing-simulator';

interface MFTLCDDisplayProps {
  dialPosition: DialPosition;
  displayMode: 'idle' | 'testing' | 'result' | 'hold';
  reading: TestReading | null;
}

function getModeLabel(position: DialPosition): string {
  const pos = DIAL_POSITIONS.find((p) => p.id === position);
  return pos?.label || '';
}

function getUnit(position: DialPosition): string {
  const pos = DIAL_POSITIONS.find((p) => p.id === position);
  return pos?.unit || '';
}

function getTestCategory(position: DialPosition): 'off' | 'dead' | 'live' {
  const pos = DIAL_POSITIONS.find((p) => p.id === position);
  return pos?.testCategory || 'off';
}

export function MFTLCDDisplay({ dialPosition, displayMode, reading }: MFTLCDDisplayProps) {
  const isOff = dialPosition === 'OFF';
  const modeLabel = getModeLabel(dialPosition);
  const unit = reading?.unit || getUnit(dialPosition);
  const category = getTestCategory(dialPosition);

  const displayText = isOff
    ? ''
    : displayMode === 'idle'
      ? '---'
      : displayMode === 'testing'
        ? '...'
        : reading?.displayValue || '---';

  const isCompliant = reading?.compliant ?? true;

  // Bar graph segments
  const barSegments = 8;
  const filledBars =
    displayMode === 'result' && reading
      ? Math.min(barSegments, Math.ceil((reading.value / 5) * barSegments))
      : 0;

  return (
    <div
      className={cn(
        'relative rounded-md overflow-hidden border',
        isOff ? 'bg-[#0a0d08] border-[#1a1d14]' : 'border-[#2a3020]'
      )}
      style={{
        background: isOff ? '#0a0d08' : 'linear-gradient(170deg, #0d1208 0%, #0a0f07 100%)',
        boxShadow: isOff
          ? 'none'
          : 'inset 0 1px 3px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(50,70,30,0.1)',
      }}
    >
      {/* Scanline overlay */}
      {!isOff && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)',
            backgroundSize: '100% 2px',
          }}
        />
      )}

      <div className="p-2 space-y-0.5">
        {/* Top row: mode + test category */}
        <div className="flex items-center justify-between h-3">
          <span
            className="text-[8px] font-mono tracking-wider"
            style={{ color: isOff ? '#1a1d14' : '#5a7a2a' }}
          >
            {modeLabel}
          </span>
          {!isOff && (
            <span
              className="text-[7px] font-mono px-1 rounded"
              style={{
                color:
                  category === 'dead' ? '#8a9a4a' : category === 'live' ? '#aa6a3a' : '#3a4a2a',
                backgroundColor:
                  category === 'dead'
                    ? 'rgba(100,120,50,0.15)'
                    : category === 'live'
                      ? 'rgba(150,80,40,0.15)'
                      : 'transparent',
              }}
            >
              {category === 'dead' ? 'DEAD' : category === 'live' ? 'LIVE' : ''}
            </span>
          )}
        </div>

        {/* Main reading */}
        <div className="flex items-baseline justify-center gap-1 min-h-[28px]">
          <span
            className={cn(
              'font-mono font-bold tracking-tight transition-all duration-300',
              displayMode === 'testing' && 'animate-pulse'
            )}
            style={{
              fontSize: displayText.length > 4 ? '18px' : '24px',
              color: isOff
                ? '#0d1208'
                : !isCompliant && displayMode === 'result'
                  ? '#cc4422'
                  : '#4a8a1a',
              textShadow: isOff
                ? 'none'
                : !isCompliant && displayMode === 'result'
                  ? '0 0 8px rgba(200,60,30,0.4)'
                  : '0 0 8px rgba(70,130,20,0.3)',
            }}
          >
            {displayText}
          </span>
          {unit && !isOff && displayMode !== 'idle' && (
            <span className="text-[10px] font-mono" style={{ color: '#5a7a2a' }}>
              {unit}
            </span>
          )}
        </div>

        {/* Bar graph */}
        <div className="flex gap-0.5 h-1.5 px-0.5">
          {Array.from({ length: barSegments }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-[1px] transition-all duration-150"
              style={{
                backgroundColor: isOff
                  ? '#0d1208'
                  : i < filledBars
                    ? i < barSegments * 0.6
                      ? '#4a8a1a'
                      : i < barSegments * 0.85
                        ? '#8a8a1a'
                        : '#aa4a1a'
                    : '#1a2010',
                transitionDelay: `${i * 30}ms`,
              }}
            />
          ))}
        </div>

        {/* Bottom status */}
        <div className="flex items-center justify-between h-2.5">
          {displayMode === 'hold' && !isOff && (
            <span className="text-[6px] font-mono animate-pulse" style={{ color: '#5a7a2a' }}>
              HOLD
            </span>
          )}
          {displayMode === 'result' && reading && !isOff && (
            <span
              className="text-[6px] font-mono"
              style={{
                color: isCompliant ? '#4a8a1a' : '#cc4422',
              }}
            >
              {isCompliant ? 'PASS' : 'FAIL'}
            </span>
          )}
          <span className="flex-1" />
          {!isOff && (
            <span className="text-[6px] font-mono" style={{ color: '#3a4a2a' }}>
              MFT
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
