/**
 * MiniProgressRing
 *
 * Simplified SVG circular progress ring.
 * 270-degree arc, colour changes by score.
 */

interface MiniProgressRingProps {
  score: number; // 0-100
  size?: number;
  strokeWidth?: number;
  colour?: string;
}

const MiniProgressRing = ({ score, size = 32, strokeWidth = 3, colour }: MiniProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75; // 270-degree arc
  const offset = arcLength - (arcLength * Math.min(score, 100)) / 100;

  const getColour = () => {
    if (colour) return colour;
    if (score >= 80) return '#22c55e';
    if (score >= 50) return '#facc15';
    if (score > 0) return '#3b82f6';
    return 'rgba(255,255,255,0.2)';
  };

  const ringColour = getColour();

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(135 ${size / 2} ${size / 2})`}
        />

        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColour}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(135 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>

      {/* Centre label */}
      <span className="absolute text-[9px] font-bold tabular-nums" style={{ color: ringColour }}>
        {score}
      </span>
    </div>
  );
};

export default MiniProgressRing;
