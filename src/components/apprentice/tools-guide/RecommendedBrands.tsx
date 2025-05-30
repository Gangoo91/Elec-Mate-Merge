
import BrandCard from "./BrandCard";

const RecommendedBrands = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-elec-yellow">Recommended Brands in the UK</h2>
      <p className="text-muted-foreground leading-relaxed">
        Quality tools are an investment in your career. Here are some respected brands in the UK electrical industry 
        that offer good value and reliability:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <BrandCard 
          category="Hand Tools" 
          brands={["CK Tools", "Knipex", "Wera", "Stanley FatMax", "Draper Expert"]}
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
      
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
        <h3 className="text-lg font-medium text-green-300 mb-2">Value Tip</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Don't feel pressured to buy the most expensive brands immediately. Start with mid-range quality tools 
          and upgrade the items you use most frequently. Many apprentices successfully use tools from Screwfix's 
          own brands or similar mid-range options whilst building their collection.
        </p>
      </div>
    </div>
  );
};

export default RecommendedBrands;
