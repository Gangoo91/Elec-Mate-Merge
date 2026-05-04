import { Button } from '@/components/ui/button';
import { Download, Eye, ExternalLink } from 'lucide-react';

const TemplatesAndExamples = () => {
  const templates = [
    {
      category: 'Portfolio structure',
      items: [
        {
          name: 'Portfolio contents page template',
          type: 'Word document',
          description: 'Professional contents page with sections and page numbers',
        },
        {
          name: 'Evidence tracking spreadsheet',
          type: 'Excel sheet',
          description: 'Track evidence against learning outcomes and competencies',
        },
        {
          name: 'Portfolio introduction template',
          type: 'Word document',
          description: 'Professional introduction with personal statement and objectives',
        },
      ],
    },
    {
      category: 'Evidence documentation',
      items: [
        {
          name: 'Work activity evidence form',
          type: 'PDF form',
          description: 'Template for documenting practical work activities',
        },
        {
          name: 'Witness testimony template',
          type: 'Word document',
          description: 'Structured format for supervisor and peer testimonies',
        },
        {
          name: 'Reflection template',
          type: 'Word document',
          description: 'Guided template for writing meaningful reflections',
        },
        {
          name: 'Photo evidence labels',
          type: 'Word document',
          description: 'Professional labels for photographs and visual evidence',
        },
      ],
    },
    {
      category: 'Assessment preparation',
      items: [
        {
          name: 'Professional discussion preparation',
          type: 'PDF guide',
          description: 'Question bank and preparation strategies',
        },
        {
          name: 'Competency mapping worksheet',
          type: 'Excel sheet',
          description: 'Map your evidence to specific competency criteria',
        },
        {
          name: 'Assessment checklist',
          type: 'PDF form',
          description: 'Final preparation checklist before assessment',
        },
      ],
    },
  ];

  const examples = [
    {
      title: 'Excellent portfolio example',
      type: 'Complete portfolio',
      description: 'Anonymised example of a high-quality apprentice portfolio',
      level: 'Outstanding',
      highlights: [
        'Clear structure and professional presentation',
        'Comprehensive evidence across all competencies',
        'Excellent reflective commentary',
        'Strong witness testimonies',
      ],
    },
    {
      title: 'Evidence collection examples',
      type: 'Photo gallery',
      description: 'Examples of well-documented practical work with explanations',
      level: 'Good practice',
      highlights: [
        'Professional quality photographs',
        'Clear before/during/after sequences',
        'Detailed captions and context',
        'Safety measures documented',
      ],
    },
    {
      title: 'Reflection writing examples',
      type: 'Text samples',
      description: 'Examples of effective reflective writing at different levels',
      level: 'Best practice',
      highlights: [
        'Demonstrates learning and development',
        'Links theory to practice effectively',
        'Shows critical thinking skills',
        'Professional language and structure',
      ],
    },
  ];

  const quickStartGuides = [
    {
      title: 'Week 1: Getting started',
      description: 'Essential first steps for new apprentices',
      tasks: [
        'Download and set up folder structure',
        'Complete portfolio introduction',
        'Take first workplace photos',
        'Write your first reflection entry',
      ],
    },
    {
      title: 'Month 1: Establishing routine',
      description: 'Building evidence collection habits',
      tasks: [
        'Complete first witness testimony',
        'Document your first major project',
        'Update competency tracking sheet',
        'Schedule supervisor review meeting',
      ],
    },
    {
      title: 'Month 3: Quality review',
      description: 'Reviewing and improving your portfolio',
      tasks: [
        'Conduct evidence gap analysis',
        'Improve weaker evidence pieces',
        'Reorganise portfolio structure',
        "Plan for next quarter's goals",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Templates, examples & resources
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Access our comprehensive collection of templates, examples, and resources to help you
          build a professional portfolio efficiently and effectively.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-[18px] sm:text-[20px] font-semibold text-white leading-tight">
          Portfolio templates
        </h3>
        {templates.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <h4 className="text-[14px] font-semibold text-white">{category.category}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((template, templateIndex) => (
                <div
                  key={templateIndex}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
                >
                  <div>
                    <h5 className="text-[14px] font-semibold text-white">{template.name}</h5>
                    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] inline-block mt-1">
                      {template.type}
                    </span>
                  </div>
                  <p className="text-[14px] text-white/85 leading-relaxed">{template.description}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-[18px] sm:text-[20px] font-semibold text-white leading-tight">
          Portfolio examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
            >
              <div className="space-y-1">
                <h4 className="text-[16px] font-semibold text-white leading-tight">
                  {example.title}
                </h4>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] inline-block">
                  {example.level}
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{example.description}</p>
              <div className="space-y-1.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Key highlights
                </span>
                <ul className="space-y-1">
                  {example.highlights.map((highlight, highlightIndex) => (
                    <li
                      key={highlightIndex}
                      className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View example
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Quick start guides
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Step-by-step guides to help you get started and maintain momentum
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickStartGuides.map((guide, index) => (
            <div key={index} className="space-y-2">
              <h4 className="text-[14px] font-semibold text-white">{guide.title}</h4>
              <p className="text-[14px] text-white/70 leading-relaxed">{guide.description}</p>
              <ul className="space-y-1.5">
                {guide.tasks.map((task, taskIndex) => (
                  <li
                    key={taskIndex}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Additional resources
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Video tutorials</h4>
            <ul className="space-y-1.5">
              {[
                'Portfolio structure setup',
                'Evidence photography techniques',
                'Writing effective reflections',
                'Assessment preparation tips',
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
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Support resources</h4>
            <ul className="space-y-1.5">
              {[
                'Portfolio FAQ document',
                'Troubleshooting common issues',
                'Assessment criteria explained',
                'Industry standards reference',
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

export default TemplatesAndExamples;
