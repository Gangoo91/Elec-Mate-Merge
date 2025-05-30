
const BuildingCollection = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-elec-yellow">Building Your Tool Collection</h2>
      <p className="text-muted-foreground leading-relaxed">
        As an apprentice electrician in the UK, building your tool collection takes time and planning. 
        Focus on these priorities:
      </p>

      <ol className="list-decimal pl-6 space-y-3 mt-4 text-muted-foreground">
        <li>
          <strong className="text-white">First Year:</strong> Focus on basic hand tools, PPE, and a voltage indicator approved to GS38. 
          Build your foundation safely.
        </li>
        <li>
          <strong className="text-white">Second Year:</strong> Add better quality screwdrivers, pliers, and basic power tools. 
          Your skills are developing - invest in better tools.
        </li>
        <li>
          <strong className="text-white">Third Year:</strong> Begin investing in basic test equipment beyond a voltage indicator. 
          You'll start doing more complex work.
        </li>
        <li>
          <strong className="text-white">Fourth Year:</strong> Complete your collection with advanced test equipment needed for commissioning 
          and testing to the 18th Edition requirements.
        </li>
      </ol>

      <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
        <h3 className="text-lg font-medium text-elec-yellow mb-2">Final Advice</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tool theft is unfortunately common on construction sites. Always mark your tools with your name or unique identifier 
          using engraving or permanent markers. Consider insuring your tools once your collection grows in value. Some specialist 
          insurance policies for tradespeople cover tools in vans and on site. Popular providers include Simply Business and 
          Tradesman Saver.
        </p>
      </div>
    </div>
  );
};

export default BuildingCollection;
