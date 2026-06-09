interface DocumentationRequirementsDiagramProps {
  installationType?: string;
}

const DocumentationRequirementsDiagram = ({
  installationType,
}: DocumentationRequirementsDiagramProps) => {
  const requiredDocuments = [
    {
      document: 'Electrical Installation Certificate',
      regulation: 'BS 7671:2018 Appendix 6',
      purpose: 'Confirms new installation complies with BS 7671',
      completedBy: 'Person responsible for design, construction, inspection and testing',
      timing: 'Upon completion of new installation',
      critical: true,
    },
    {
      document: 'Schedule of Inspections',
      regulation: 'BS 7671:2018 Appendix 6',
      purpose: 'Records visual inspection items checked',
      completedBy: 'Competent person carrying out inspection',
      timing: 'During visual inspection phase',
      critical: true,
    },
    {
      document: 'Schedule of Test Results',
      regulation: 'BS 7671:2018 Appendix 6',
      purpose: 'Records all test measurements and results',
      completedBy: 'Competent person carrying out testing',
      timing: 'During testing phase',
      critical: true,
    },
    {
      document: 'Circuit Charts',
      regulation: 'Regulation 514.9.1',
      purpose: 'Identification of circuits and protective devices',
      completedBy: 'Installation designer / contractor',
      timing: 'Before energisation',
      critical: true,
    },
  ];

  const getAdditionalDocuments = () => {
    if (installationType === 'domestic') {
      return [
        'Minor Electrical Installation Works Certificate (for additions)',
        'Electrical Installation Condition Report (if existing work present)',
        'Building Control notification (where required)',
      ];
    } else if (installationType === 'commercial') {
      return [
        'Fire Risk Assessment electrical considerations',
        'Emergency lighting compliance certificates',
        'Electrical maintenance schedule',
      ];
    } else if (installationType === 'industrial') {
      return [
        'Hazardous area classification drawings',
        'Equipment certification for ATEX compliance',
        'Earthing and bonding system verification',
      ];
    }
    return [];
  };

  const additionalDocuments = getAdditionalDocuments();

  const timeline = [
    {
      step: 'Before commencement',
      description: 'Design documentation and calculations',
    },
    {
      step: 'During inspection',
      description: 'Schedule of Inspections completion',
    },
    {
      step: 'During testing',
      description: 'Schedule of Test Results completion',
    },
    {
      step: 'Upon completion',
      description: 'Electrical Installation Certificate issue',
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-[14px] text-white/85 leading-relaxed">
        BS 7671 documentation requirements for initial verification.
      </p>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Regulation 641.7 — documentation requirements
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Upon completion of the work, the person responsible for the construction of the
          installation shall provide the person ordering the work with a certificate confirming
          that the installation complies with BS 7671.
        </p>
      </div>

      <div className="space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Mandatory documentation
        </span>

        {requiredDocuments.map((doc, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <h5 className="text-[16px] font-semibold text-white leading-tight">
                  {doc.document}
                </h5>
                <p className="text-[11px] text-white/55 font-mono">{doc.regulation}</p>
              </div>
              {doc.critical && (
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  Critical
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Purpose
                </span>
                <p className="text-[14px] text-white/85 leading-relaxed">{doc.purpose}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Completed by
                </span>
                <p className="text-[14px] text-white/85 leading-relaxed">{doc.completedBy}</p>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Timing
              </span>
              <p className="text-[14px] text-white/85 leading-relaxed">{doc.timing}</p>
            </div>
          </div>
        ))}
      </div>

      {additionalDocuments.length > 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            {installationType?.charAt(0).toUpperCase()}
            {installationType?.slice(1)} installation — additional requirements
          </span>
          <ul className="space-y-1.5">
            {additionalDocuments.map((doc, index) => (
              <li
                key={index}
                className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Documentation timeline
        </span>
        <ol className="space-y-2">
          {timeline.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-[12px] font-mono text-white/55 flex-shrink-0 w-5 mt-0.5">
                {index + 1}.
              </span>
              <div className="space-y-0.5">
                <span className="text-[14px] text-white font-medium">{item.step}</span>
                <p className="text-[14px] text-white/85 leading-relaxed">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Document retention & distribution
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Original copies
            </span>
            <ul className="space-y-1.5">
              {[
                'Person ordering the work (customer)',
                'Installing contractor records',
                'Building Control (where notifiable)',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Retention period
            </span>
            <ul className="space-y-1.5">
              {[
                'Minimum duration of installation',
                'Available for future inspection',
                'Transfer with property ownership',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationRequirementsDiagram;
