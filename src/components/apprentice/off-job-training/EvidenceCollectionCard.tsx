import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EvidenceCollectionCard = () => {
  const [selectedEvidenceType, setSelectedEvidenceType] = useState<string | null>(null);

  const evidenceTypes = [
    {
      type: 'Digital evidence',
      description: 'Electronic documentation and digital files',
      examples: [
        'Screenshots of completed online modules',
        'PDF certificates and transcripts',
        'Video recordings of practical demonstrations',
        'Digital portfolios and project files',
        'Learning management system reports',
      ],
      bestPractices: [
        'Use cloud storage for backup',
        'Organise files in dated folders',
        'Keep original file formats',
        'Include metadata where possible',
      ],
      tools: ['Google Drive', 'OneDrive', 'Dropbox', 'Portfolio platforms'],
    },
    {
      type: 'Physical evidence',
      description: 'Tangible documentation and physical artefacts',
      examples: [
        'Printed certificates and awards',
        'Handwritten study notes and workbooks',
        'Physical project models or prototypes',
        'Signed witness statements',
        'Training attendance registers',
      ],
      bestPractices: [
        'Photograph important documents',
        'Store in protective folders',
        'Make digital copies as backup',
        'Date and label everything clearly',
      ],
      tools: ['Scanner apps', 'Digital cameras', 'Filing systems', 'Protective sleeves'],
    },
    {
      type: 'Observational evidence',
      description: 'Evidence gathered through direct observation',
      examples: [
        'Supervisor observation forms',
        'Peer assessment records',
        'Video recordings of skill demonstrations',
        'Live assessment feedback',
        'Professional discussions transcripts',
      ],
      bestPractices: [
        'Plan observations in advance',
        'Brief observers on requirements',
        'Use standardised forms',
        'Get immediate feedback recorded',
      ],
      tools: ['Observation forms', 'Recording devices', 'Assessment apps', 'Feedback platforms'],
    },
    {
      type: 'Reflective evidence',
      description: 'Personal reflection and learning documentation',
      examples: [
        'Learning diaries and journals',
        'Reflective essays and reports',
        'Personal development plans',
        'Self-assessment records',
        'Progress review notes',
      ],
      bestPractices: [
        'Write reflections regularly',
        'Be honest about challenges',
        'Link to learning outcomes',
        'Include action plans',
      ],
      tools: ['Digital journals', 'Reflection templates', 'Mind mapping', 'Voice memos'],
    },
  ];

  const qualityStandards = [
    {
      standard: 'Authenticity',
      description: 'Evidence must be your own work',
      checkpoints: [
        'Original creation',
        'Proper attribution',
        'Personal involvement',
        'Honest representation',
      ],
    },
    {
      standard: 'Sufficiency',
      description: 'Adequate amount to demonstrate competence',
      checkpoints: [
        'Covers all learning outcomes',
        'Multiple examples',
        'Different contexts',
        'Progressive development',
      ],
    },
    {
      standard: 'Currency',
      description: 'Recent and up-to-date evidence',
      checkpoints: [
        'Within validity period',
        'Reflects current standards',
        'Recent achievements',
        'Updated knowledge',
      ],
    },
    {
      standard: 'Validity',
      description: 'Directly relates to required standards',
      checkpoints: [
        'Mapped to outcomes',
        'Relevant content',
        'Appropriate level',
        'Clear connection',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Evidence collection and quality
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Best practices for collecting and maintaining high-quality training evidence
          </p>
        </div>

        <Tabs defaultValue="types" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="types">Types</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="organisation">Organisation</TabsTrigger>
          </TabsList>

          <TabsContent value="types" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evidenceTypes.map((evidence, index) => {
                const active = selectedEvidenceType === evidence.type;
                return (
                  <div
                    key={index}
                    className={`rounded-xl border p-4 cursor-pointer transition-all touch-manipulation ${
                      active
                        ? 'border-elec-yellow/30 bg-elec-yellow/[0.04]'
                        : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                    }`}
                    onClick={() =>
                      setSelectedEvidenceType(active ? null : evidence.type)
                    }
                  >
                    <h4 className="text-[14px] font-semibold text-white">{evidence.type}</h4>
                    <p className="text-[14px] text-white/85 leading-relaxed mt-1">
                      {evidence.description}
                    </p>

                    {active && (
                      <div className="space-y-3 animate-fade-in mt-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Examples
                          </span>
                          <ul className="space-y-1">
                            {evidence.examples.map((example, idx) => (
                              <li
                                key={idx}
                                className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                              >
                                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                            Best practices
                          </span>
                          <ul className="space-y-1">
                            {evidence.bestPractices.map((practice, idx) => (
                              <li
                                key={idx}
                                className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                              >
                                <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                                <span>{practice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Recommended tools
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {evidence.tools.map((tool, idx) => (
                              <span
                                key={idx}
                                className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="quality" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qualityStandards.map((standard, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
                >
                  <h4 className="text-[14px] font-semibold text-white">{standard.standard}</h4>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    {standard.description}
                  </p>
                  <div className="space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Key checkpoints
                    </span>
                    <ul className="space-y-1">
                      {standard.checkpoints.map((checkpoint, idx) => (
                        <li
                          key={idx}
                          className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                          <span>{checkpoint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="organisation" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-[14px] font-semibold text-white">
                  Digital organisation structure
                </h4>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="space-y-2 text-[13px] font-mono text-white/85">
                    <div>Off-the-Job Training Evidence/</div>
                    <div className="ml-4">2024-2025/</div>
                    <div className="ml-8">Month-01-September/</div>
                    <div className="ml-12">College-Attendance-Record.pdf</div>
                    <div className="ml-12">Online-Module-Certificate.pdf</div>
                    <div className="ml-8">Month-02-October/</div>
                    <div className="ml-12">Workshop-Photos.jpg</div>
                    <div className="ml-12">Reflection-Log.docx</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[14px] font-semibold text-white">Evidence checklist</h4>
                <ul className="space-y-1.5">
                  {[
                    'Date and time recorded',
                    'Learning outcome mapped',
                    'Duration documented',
                    'Supervisor/tutor signature',
                    'Personal reflection included',
                    'Files properly named',
                    'Backup copies created',
                    'Portfolio updated',
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EvidenceCollectionCard;
