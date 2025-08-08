import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Settings as Cog, ArrowLeft } from "lucide-react";

const BusinessHub = () => {
  const cards = [
    {
      id: 1,
      title: "Start & Grow",
      description:
        "Guides, templates and calculators to plan, launch and grow your electrical business in the UK.",
      icon: Briefcase,
      link: "/electrician/business-development",
    },
    {
      id: 2,
      title: "Run the Business",
      description:
        "Admin tools for day‑to‑day operations: documents, pricing, management and more.",
      icon: Cog,
      link: "/electrician-tools/admin",
    },
  ];

  const canonical = `${window.location.origin}/electrician/business`;

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in px-4 md:px-0">
      <Helmet>
        <title>Business Hub for Electricians | Start & Run</title>
        <meta
          name="description"
          content="All business tools for UK electricians in one place — start, run and grow your electrical business. Access development guides and admin tools."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left">
          Business Hub
        </h1>
        <Link to="/electrician" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Electrical Hub
          </Button>
        </Link>
      </header>

      <main>
        <section aria-labelledby="business-sections" className="space-y-4">
          <h2 id="business-sections" className="text-lg sm:text-xl font-semibold text-center">
            Start, run and grow — in one place
          </h2>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto text-center">
            Practical, BS 7671-aware guidance for the UK market. Choose where you want to focus today.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto mt-2">
            {cards.map((c) => (
              <Link to={c.link} key={c.id} className="focus:outline-none hover-scale">
                <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-all duration-200 cursor-pointer">
                  <CardHeader className="flex flex-col items-center justify-center text-center py-6 md:py-8">
                    <c.icon className="h-10 w-10 sm:h-12 sm:w-12 mb-3 text-elec-yellow" />
                    <CardTitle className="text-base sm:text-lg leading-tight">{c.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pb-6 -mt-2">
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BusinessHub;
