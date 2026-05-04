interface MiniProgressRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  colour?: string;
}

const MiniProgressRing = ({ score, size = 32, strokeWidth = 3, colour }: MiniProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const offset = arcLength - (arcLength * Math.min(score, 100)) / 100;

  const ringColour = colour || (score > 0 ? '#facc15' : 'rgba(255,255,255,0.2)');

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(135 ${size / 2} ${size / 2})`}
        />

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

      <span
        className="absolute text-[9px] font-semibold tabular-nums"
        style={{ color: ringColour }}
      >
        {score}
      </span>
    </div>
  );
};

export default MiniProgressRing;
