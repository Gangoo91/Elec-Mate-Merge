interface ComingSoonCalculatorProps {
  title: string;
  description?: string;
}

const ComingSoonCalculator = ({ title, description }: ComingSoonCalculatorProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 min-h-[300px] flex items-center justify-center">
      <div className="text-center space-y-3 max-w-md">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 block">
          Under development
        </span>
        <h3 className="text-[20px] font-semibold text-white">{title}</h3>
        <p className="text-[14px] text-white/85 leading-relaxed">
          {description || 'This calculator is coming soon. Check back later.'}
        </p>
      </div>
    </div>
  );
};

export default ComingSoonCalculator;
