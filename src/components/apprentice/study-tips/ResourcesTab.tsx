import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResourcesTab = () => {
  const resourceCategories = [
    {
      title: 'Essential textbooks',
      description: 'Core reference materials for electrical training',
      resources: [
        {
          name: 'BS 7671:2018 + A4:2026 (IET Wiring Regulations)',
          description: 'The definitive guide to electrical installation standards in the UK',
          type: 'Official standard',
          link: 'https://electrical.theiet.org/wiring-regulations/',
        },
        {
          name: 'Guidance Note 3: Inspection & Testing',
          description: 'Comprehensive guide to electrical testing procedures',
          type: 'IET publication',
          link: 'https://electrical.theiet.org/guidance-notes/',
        },
        {
          name: 'On-Site Guide (BS 7671:2018)',
          description: 'Simplified guidance for electrical installations',
          type: 'IET publication',
          link: 'https://electrical.theiet.org/on-site-guide/',
        },
      ],
    },
    {
      title: 'Online learning platforms',
      description: 'Digital resources and interactive learning',
      resources: [
        {
          name: 'City & Guilds SmartScreen',
          description: 'Official digital learning resources for City & Guilds qualifications',
          type: 'Learning platform',
          link: 'https://www.cityandguilds.com/smartscreen',
        },
        {
          name: 'EAL Digital Learning',
          description: 'Interactive modules for EAL electrical qualifications',
          type: 'Learning platform',
          link: 'https://www.eal.org.uk/',
        },
        {
          name: 'JTL Learning Portal',
          description: 'Comprehensive apprenticeship learning resources',
          type: 'Training provider',
          link: 'https://www.jtltraining.com/',
        },
      ],
    },
    {
      title: 'Video learning',
      description: 'Visual learning resources and demonstrations',
      resources: [
        {
          name: 'IET TV',
          description: 'Professional electrical engineering videos and webinars',
          type: 'Video library',
          link: 'https://tv.theiet.org/',
        },
        {
          name: 'eFIXX — Electrical Standards Explained',
          description:
            'UK-focused electrical installation videos, regulation updates and testing demos',
          type: 'Free video series',
          link: 'https://www.youtube.com/@eFIXX',
        },
        {
          name: 'City & Guilds SmartScreen videos',
          description: 'Practical skills demonstrations for electrical qualifications',
          type: 'Video resource',
          link: 'https://www.cityandguilds.com/smartscreen',
        },
      ],
    },
    {
      title: 'Reference materials',
      description: 'Quick reference guides and charts',
      resources: [
        {
          name: 'Cable capacity charts',
          description: 'Current carrying capacity tables for various cable types',
          type: 'Reference chart',
          downloadable: true,
        },
        {
          name: 'Electrical symbols guide',
          description: 'Comprehensive guide to electrical schematic symbols',
          type: 'Reference guide',
          downloadable: true,
        },
        {
          name: 'Fault finding flowcharts',
          description: 'Step-by-step troubleshooting procedures',
          type: 'Flowchart',
          downloadable: true,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Study resources library
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          A curated collection of essential resources for electrical apprentices and students.
          These materials cover everything from basic principles to advanced installation
          techniques.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {resourceCategories.map((category, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {category.title}
              </span>
              <p className="text-[13px] text-white/70 leading-relaxed">{category.description}</p>
            </div>
            <div className="space-y-2">
              {category.resources.map((resource, resourceIndex) => (
                <div
                  key={resourceIndex}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-[14px] font-semibold text-white leading-tight">
                        {resource.name}
                      </h4>
                      <p className="text-[12px] text-white/70 leading-relaxed">
                        {resource.description}
                      </p>
                      <span className="inline-block text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                        {resource.type}
                      </span>
                    </div>
                    <div className="flex-shrink-0">
                      {resource.downloadable ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                          asChild
                        >
                          <a href={resource.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Visit
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Resource usage tips
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-[13px] text-white">Effective resource management</p>
            <ul className="space-y-1">
              {[
                'Create a personal resource library with bookmarks',
                'Download key reference materials for offline access',
                'Use multiple formats (text, video, interactive) for better understanding',
                'Join online communities for additional support',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] text-white/85">
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-[13px] text-white">Quality assurance</p>
            <ul className="space-y-1">
              {[
                'Always use current edition materials (especially BS 7671)',
                'Verify information from multiple sources',
                'Check for updates to regulations and standards',
                'Prefer official publications for exam preparation',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] text-white/85">
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

export default ResourcesTab;
