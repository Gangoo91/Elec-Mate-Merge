
import React from "react";

const DocumentationBestPractices = () => {
  return (
    <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-elec-yellow mb-4">Documentation Best Practices</h2>
      
      <div className="space-y-4">
        <p className="text-muted-foreground mb-4">
          Following these best practices ensures that your documentation system is effective and compliant:
        </p>
        
        <h3 className="font-semibold text-white mt-6 mb-2">Record-Keeping Excellence</h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Use standardised templates for consistency across the organisation</li>
          <li>Implement clear file naming conventions and folder structures</li>
          <li>Schedule regular documentation audits to identify gaps</li>
          <li>Establish a chain of responsibility for document management</li>
          <li>Train all staff on documentation procedures</li>
          <li>Create backup systems with appropriate redundancy</li>
          <li>Implement version control systems to track changes</li>
        </ul>
        
        <h3 className="font-semibold text-white mt-6 mb-2">Digital Transformation Benefits</h3>
        <p className="text-muted-foreground mb-6">
          Transitioning to digital documentation offers numerous advantages for electrical contractors:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Real-time updates accessible from multiple locations</li>
          <li>Enhanced searchability using keywords and filters</li>
          <li>Automated reminders for document reviews and renewals</li>
          <li>Integration with project management systems</li>
          <li>Reduced storage space requirements</li>
          <li>Improved environmental sustainability</li>
          <li>Easy sharing with clients, inspectors, and other stakeholders</li>
          <li>Better data security with encryption and access controls</li>
        </ul>
        
        <h3 className="font-semibold text-white mt-6 mb-2">Common Documentation Pitfalls</h3>
        <p className="text-muted-foreground mb-6">
          Avoid these common mistakes in safety documentation:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Using generic templates without site-specific details</li>
          <li>Inadequate review and updating of documents</li>
          <li>Failing to communicate documentation to relevant personnel</li>
          <li>Inconsistent filing systems leading to lost or misplaced documents</li>
          <li>Incomplete records that lack essential information</li>
          <li>Over-reliance on paper systems in modern work environments</li>
          <li>Insufficient backup procedures</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentationBestPractices;
