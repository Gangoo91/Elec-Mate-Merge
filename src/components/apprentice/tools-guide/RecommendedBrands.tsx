
import BrandCard from "./BrandCard";

const RecommendedBrands = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-elec-yellow">Recommended Brands in the UK</h2>
      <p>
        Quality tools are an investment in your career. Here are some respected brands in the UK electrical industry:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <BrandCard 
          category="Hand Tools" 
          brands={["CK Tools", "Knipex", "Wera", "Stanley", "Draper"]}
        />
        <BrandCard 
          category="Power Tools" 
          brands={["Makita", "DeWalt", "Milwaukee", "Bosch Professional", "Festool"]}
        />
        <BrandCard 
          category="Test Equipment" 
          brands={["Fluke", "Megger", "Metrel", "Kewtech", "Di-Log"]}
        />
      </div>
    </div>
  );
};

export default RecommendedBrands;
