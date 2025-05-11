
import React from 'react';

interface InstallationMethodsUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const InstallationMethodsUnit = ({ unitCode, onResourceClick }: InstallationMethodsUnitProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Installation Methods</h2>
      <p className="text-muted-foreground">
        Placeholder for future installation methods content.
      </p>
    </div>
  );
};

export default InstallationMethodsUnit;
