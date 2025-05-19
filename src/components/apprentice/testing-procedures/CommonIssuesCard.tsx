
const CommonIssuesCard = () => {
  return (
    <div className="bg-blue-950/20 border border-blue-500/30 rounded-md p-4">
      <h3 className="text-blue-200 font-medium mb-2">Common Issues & Solutions</h3>
      <ul className="text-sm text-blue-100/80 space-y-2">
        <li><span className="font-medium">High readings:</span> Check for loose connections or damaged conductors</li>
        <li><span className="font-medium">Inconsistent readings:</span> Check for corrosion or poor contact at test points</li>
        <li><span className="font-medium">Zero readings:</span> Check for inadvertent short circuits in the test setup</li>
      </ul>
    </div>
  );
};

export default CommonIssuesCard;
