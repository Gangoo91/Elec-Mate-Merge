interface BrandCardProps {
  category: string;
  brands: string[];
}

const BrandCard = ({ category, brands }: BrandCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {category}
      </span>
      <ul className="list-disc pl-6 space-y-1">
        {brands.map((brand, i) => (
          <li key={i} className="text-[14px] text-white/85 leading-relaxed">
            {brand}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandCard;
