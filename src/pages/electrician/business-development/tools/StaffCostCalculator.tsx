import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";

const StaffCostCalculator: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>Fully Loaded Staff Cost Calculator UK</title>
        <meta name="description" content="Calculate fully loaded electrician staff cost: wages, NI, pension, holidays, van, tools and overheads." />
        <link rel="canonical" href="/electrician/business-development/tools/staff-cost" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Fully Loaded Staff Cost</h1>
        <p className="text-muted-foreground mt-2">See the real hourly cost of a spark or mate after all on-costs in the UK.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4">
        <InfoBox
          title="Why this matters"
          points={[
            "Prevents pricing below true labour cost.",
            "Includes NI, pension, holidays, training and downtime.",
            "Feeds directly into hourly rate and project pricing.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Calculator (scaffold)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">We’ll add fields for base pay, employer NI, pension, holidays, sick, van, tools, insurances and utilisation. Implement?</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default StaffCostCalculator;
