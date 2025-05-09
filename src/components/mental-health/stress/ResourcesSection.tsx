
import ResourceCard from "@/components/mental-health/ResourceCard";

const ResourcesSection = () => {
  const resources = [
    {
      title: "Recognising Workplace Stressors",
      description: "Learn to identify common sources of stress in electrical work environments",
      type: "document" as const,
      url: "https://www.mind.org.uk/information-support/tips-for-everyday-living/workplace-mental-health/"
    },
    {
      title: "5-Minute Breathing Techniques",
      description: "Quick exercises you can do on site to reduce stress and anxiety",
      type: "video" as const,
      url: "https://www.youtube.com/watch?v=aNXKjGFUlMs"
    },
    {
      title: "Managing On-Job Pressure",
      description: "Strategies for handling tight deadlines and demanding situations",
      type: "article" as const,
      url: "https://www.hse.gov.uk/stress/what-to-do.htm"
    },
    {
      title: "Sleep and Stress Connection",
      description: "How improving sleep quality can reduce workplace stress",
      type: "article" as const,
      url: "https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/how-to-fall-asleep-faster-and-sleep-better/"
    },
    {
      title: "Stress Management for Apprentices",
      description: "Tailored advice for managing stress during your apprenticeship",
      type: "document" as const,
      url: "https://www.electricalsafetyfirst.org.uk/professional-resources/"
    },
    {
      title: "Building Resilience in the Trades",
      description: "Learn techniques to develop mental toughness on the job",
      type: "video" as const, 
      url: "https://www.youtube.com/watch?v=1FDqYQjHtMo"
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Helpful Resources</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <ResourceCard 
            key={index}
            title={resource.title}
            description={resource.description}
            type={resource.type}
            url={resource.url}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;
