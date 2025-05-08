
const BuildingCollection = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-elec-yellow">Building Your Tool Collection</h2>
      <p>
        As an apprentice electrician in the UK, building your tool collection takes time. Focus on these priorities:
      </p>

      <ol className="list-decimal pl-6 space-y-2 mt-4">
        <li>
          <strong>First Year:</strong> Focus on basic hand tools, PPE, and a voltage indicator approved to GS38.
        </li>
        <li>
          <strong>Second Year:</strong> Add better quality screwdrivers, pliers, and basic power tools.
        </li>
        <li>
          <strong>Third Year:</strong> Begin investing in basic test equipment beyond a voltage indicator.
        </li>
        <li>
          <strong>Fourth Year:</strong> Complete your collection with advanced test equipment needed for commissioning and testing to the 18th Edition requirements.
        </li>
      </ol>

      <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
        <h3 className="text-lg font-medium text-elec-yellow mb-2">Final Advice</h3>
        <p>
          Tool theft is unfortunately common on construction sites. Always mark your tools with your name or unique identifier. Consider insuring your tools once your collection grows in value. Some specialist insurance policies for tradespeople cover tools in vans and on site.
        </p>
      </div>
    </div>
  );
};

export default BuildingCollection;
