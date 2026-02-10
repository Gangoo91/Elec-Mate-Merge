/**
 * SkillRadarChart
 *
 * 6-axis radar chart: Regulations, Safety, Testing, Design, Theory, Practical.
 * Pure SVG — no charting library needed.
 */

import { Card, CardContent } from '@/components/ui/card';
import { Radar } from 'lucide-react';
import { type SkillAxis } from '@/hooks/useUnifiedProgress';

interface SkillRadarChartProps {
  data: SkillAxis[];
}

export function SkillRadarChart({ data }: SkillRadarChartProps) {
  const size = 240;
  const centre = size / 2;
  const maxRadius = 90;
  const levels = 4; // concentric rings

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
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/[0.06]">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-blue-500/10">
            <Radar className="h-4 w-4 text-blue-400" />
          </div>
          <h3 className="font-semibold text-white text-sm">Skill Radar</h3>
        </div>

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
                  className="fill-white/90 text-[10px] font-medium"
                >
                  {p.label}
                </text>
                <text
                  x={p.x}
                  y={p.y + 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-elec-yellow text-[10px] font-bold"
                >
                  {p.score}%
                </text>
              </g>
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}

export default SkillRadarChart;
