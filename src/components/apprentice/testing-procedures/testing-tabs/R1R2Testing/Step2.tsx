
const R1R2Step2 = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Step 2: Perform the Test</h3>
      <ul className="list-disc pl-6 space-y-2 text-sm">
        <li>Set test meter to continuity/resistance mode</li>
        <li>Null the test leads to remove their resistance from the measurement</li>
        <li>Connect one lead to the main earth terminal</li>
        <li>Connect the other lead to each point being tested</li>
        <li>Record all readings in a systematic manner</li>
      </ul>
      <div className="mt-4 bg-gray-800/30 p-4 rounded-md">
        <img src="/placeholder.svg" alt="R1+R2 Testing Process" className="mx-auto max-h-64" />
        <p className="text-xs text-center mt-2 text-muted-foreground">
          Testing process diagram showing proper testing technique
        </p>
      </div>
    </div>
  );
};

export default R1R2Step2;
