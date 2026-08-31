/**
 * SkillRadarChart
 *
 * 6-axis radar chart: Regulations, Safety, Testing, Design, Theory, Practical.
 * Pure SVG — no charting library needed.
 */

import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { type SkillAxis } from '@/hooks/useUnifiedProgress';
import { Eyebrow } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

interface SkillRadarChartProps {
  data: SkillAxis[];
}

export function SkillRadarChart({ data }: SkillRadarChartProps) {
  /*
   * ⚠️ The viewBox used to be 240 with labels pushed to 120% of a 90px
   * radius — that put the bottom label's score line at y≈252 in a 240-tall
   * box, so "Design 0%" was sliced in half. Box widened and the radius
   * pulled in; the longest label ("Regulations") now clears the edge.
   */
  const size = 260;
  const centre = size / 2;
  const maxRadius = 88;
  const levels = 4; // concentric rings

  /*
   * An apprentice who has not sat anything scores 0 on all six axes, and a
   * radar of six zeroes is a single dot in an empty hexagon — 500px of
   * chrome saying nothing. Say what fills it instead.
   */
  const hasSignal = data.some((d) => d.score > 0);
  if (!hasSignal) {
    return (
      <div className={cn('rounded-2xl border border-white/[0.06] p-5 space-y-2.5', CARD_SURFACE)}>
        <Eyebrow>Skill radar</Eyebrow>
        <p className="text-[13px] text-white leading-relaxed">
          Nothing to plot yet. Quizzes and flashcards score you across{' '}
          {data.map((d) => d.subject).join(', ')} — the shape appears once any one of them has a
          result, and shows where you are strong at a glance.
        </p>
      </div>
    );
  }

  // Calculate point positions for a regular polygon
  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: centre + radius * Math.cos(angle),
      y: centre + radius * Math.sin(angle),
    };
  };

  // Generate grid rings
  const gridRings = Array.from({ length: levels }, (_, i) => {
    const radius = ((i + 1) / levels) * maxRadius;
    const points = data.map((_, idx) => {
      const angle = (Math.PI * 2 * idx) / data.length - Math.PI / 2;
      return `${centre + radius * Math.cos(angle)},${centre + radius * Math.sin(angle)}`;
    });
    return points.join(' ');
  });

  // Generate grid lines from centre to each vertex
  const gridLines = data.map((_, idx) => {
    const point = getPoint(idx, 100);
    return { x1: centre, y1: centre, x2: point.x, y2: point.y };
  });

  // Generate data polygon
  const dataPoints = data.map((d, i) => getPoint(i, d.score));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Label positions (slightly outside the chart)
  const labelPoints = data.map((d, i) => {
    const point = getPoint(i, 120);
    return { ...point, label: d.subject, score: d.score };
  });

  return (
    <div className={cn('rounded-2xl border border-white/[0.06] p-4 space-y-3', CARD_SURFACE)}>
      <Eyebrow>Skill radar</Eyebrow>

      <div className="flex justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Grid rings */}
            {gridRings.map((points, i) => (
              <polygon
                key={`ring-${i}`}
                points={points}
                fill="none"
                stroke="currentColor"
                strokeWidth={0.5}
                className="text-white/[0.12]"
              />
            ))}

            {/* Grid lines */}
            {gridLines.map((line, i) => (
              <line
                key={`line-${i}`}
                {...line}
                stroke="currentColor"
                strokeWidth={0.5}
                className="text-white/[0.10]"
              />
            ))}

            {/* Data polygon fill */}
            <polygon
              points={dataPolygon}
              fill="rgba(250, 204, 21, 0.12)"
              stroke="rgba(250, 204, 21, 0.6)"
              strokeWidth={2}
              strokeLinejoin="round"
            />

            {/* Data points */}
            {dataPoints.map((p, i) => (
              <circle
                key={`point-${i}`}
                cx={p.x}
                cy={p.y}
                r={3}
                fill="#facc15"
                stroke="rgba(250, 204, 21, 0.3)"
                strokeWidth={4}
              />
            ))}

            {/* Labels */}
            {labelPoints.map((p, i) => (
              <g key={`label-${i}`}>
                <text
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white text-[10px] font-medium"
                >
                  {p.label}
                </text>
                <text
                  x={p.x}
                  y={p.y + 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-elec-yellow text-[10px] font-mono"
                >
                  {p.score}%
                </text>
              </g>
            ))}
        </svg>
      </div>
    </div>
  );
}

export default SkillRadarChart;
