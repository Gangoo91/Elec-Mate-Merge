
const ToolStorage = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-elec-yellow">Tool Storage & Organisation</h2>
      <p className="text-muted-foreground leading-relaxed">
        A good quality tool bag or box is essential for organising and protecting your tools. Consider these options:
      </p>
      
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li>A hard-bottom tool bag with multiple compartments</li>
        <li>Tool belt for keeping frequently used items accessible</li>
        <li>Small component organisers for screws, terminals, etc.</li>
        <li>Tool tracking system (simple inventory list or mobile app)</li>
      </ul>
      
      <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
        <h3 className="text-lg font-medium text-elec-yellow mb-2">UK Apprentice Tip</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Many UK electrical wholesalers like CEF, City Electrical Factors, and Edmundson Electrical offer apprentice 
          discounts on tools. Always bring your apprentice ID card or college enrolment confirmation when purchasing tools. 
          Some manufacturers also offer apprentice starter kits at discounted rates. Building relationships with your 
          local wholesaler can lead to better prices and technical advice.
        </p>
      </div>
    </div>
  );
};

export default ToolStorage;
