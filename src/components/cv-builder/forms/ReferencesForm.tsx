
import React, { useState } from "react";
import { Users, Plus, Trash2, ChevronDown, ChevronUp, UserCheck } from "lucide-react";
import { CVData, Reference } from "../types";

interface ReferencesFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

const RELATIONSHIP_OPTIONS = [
  'Previous Employer',
  'Site Manager',
  'Supervisor',
  'Colleague',
  'Client',
  'Training Provider',
  'College Tutor',
  'Other'
];

export const ReferencesForm: React.FC<ReferencesFormProps> = ({ cvData, onChange }) => {
  const [expandedRef, setExpandedRef] = useState<string | null>(null);

  const addReference = () => {
    const newRef: Reference = {
      id: `ref-${Date.now()}`,
      name: '',
      jobTitle: '',
      company: '',
      email: '',
      phone: '',
      relationship: ''
    };
    onChange({
      ...cvData,
      references: [...cvData.references, newRef]
    });
    setExpandedRef(newRef.id);
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    onChange({
      ...cvData,
      references: cvData.references.map(ref =>
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    });
  };

  const removeReference = (id: string) => {
    onChange({
      ...cvData,
      references: cvData.references.filter(ref => ref.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-elec-light mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-elec-yellow" />
          References
        </h3>
        <p className="text-sm text-elec-light/60 mb-6">
          Add 2-3 professional references. Always get permission before listing someone as a reference.
        </p>

        {/* Reference Cards */}
        <div className="space-y-4">
          {cvData.references.map((ref, index) => (
            <div
              key={ref.id}
              className="border border-elec-light/20 rounded-xl overflow-hidden bg-elec-gray/30"
            >
              {/* Header */}
              <button
                onClick={() => setExpandedRef(expandedRef === ref.id ? null : ref.id)}
                className="w-full flex items-center justify-between p-4 text-left touch-manipulation"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <UserCheck className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-elec-light truncate">
                      {ref.name || `Reference ${index + 1}`}
                    </h4>
                    <p className="text-sm text-elec-light/60 truncate">
                      {ref.jobTitle && ref.company ? `${ref.jobTitle} at ${ref.company}` :
                       ref.relationship || 'Add details...'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeReference(ref.id);
                    }}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {expandedRef === ref.id ? (
                    <ChevronUp className="h-5 w-5 text-elec-light/60" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-elec-light/60" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {expandedRef === ref.id && (
                <div className="p-4 pt-0 space-y-4 border-t border-elec-light/10">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-elec-light">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={ref.name}
                      onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                      className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                      placeholder="e.g., John Smith"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-elec-light">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={ref.jobTitle}
                        onChange={(e) => updateReference(ref.id, 'jobTitle', e.target.value)}
                        className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                        placeholder="e.g., Site Manager"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-elec-light">
                        Company *
                      </label>
                      <input
                        type="text"
                        value={ref.company}
                        onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                        className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                        placeholder="e.g., ABC Electrical Ltd"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-elec-light">
                      Relationship
                    </label>
                    <select
                      value={ref.relationship}
                      onChange={(e) => updateReference(ref.id, 'relationship', e.target.value)}
                      className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                    >
                      <option value="">Select relationship...</option>
                      {RELATIONSHIP_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-elec-light">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={ref.email || ''}
                        onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                        className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                        placeholder="john.smith@company.com"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-elec-light">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={ref.phone || ''}
                        onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                        className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                        placeholder="07700 123456"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <p className="text-xs text-amber-300">
                      <strong>Tip:</strong> Contact details are optional on your CV. Many employers prefer "References available on request" - you can include contact info when specifically asked.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Reference Button */}
          <button
            onClick={addReference}
            disabled={cvData.references.length >= 3}
            className="w-full flex items-center justify-center gap-2 p-4 min-h-[56px] border-2 border-dashed border-elec-light/20 rounded-xl text-elec-light/60 hover:text-elec-yellow hover:border-elec-yellow/50 transition-colors touch-manipulation active:scale-[0.98] disabled:opacity-50 disabled:hover:text-elec-light/60 disabled:hover:border-elec-light/20"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">
              {cvData.references.length >= 3 ? 'Maximum 3 References' : 'Add Reference'}
            </span>
          </button>

          {/* Option for "Available on request" */}
          {cvData.references.length === 0 && (
            <div className="p-4 bg-elec-gray/50 rounded-lg border border-elec-light/10">
              <h4 className="text-sm font-semibold text-elec-light mb-2">No References?</h4>
              <p className="text-xs text-elec-light/60">
                It's common to write "References available on request" on your CV. Add references here only if you want them to appear on your CV, or leave this section empty.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
