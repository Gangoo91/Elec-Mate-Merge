import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";

const MinimumChargeCalculator: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>Minimum Charge & First Hour Pricing UK</title>
        <meta name="description" content="Set profitable minimum call-out and first-hour pricing for domestic and commercial electrical work in the UK." />
        <link rel="canonical" href="/electrician/business-development/tools/minimum-charge" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Minimum Charge & First Hour</h1>
        <p className="text-muted-foreground mt-2">Ensure short jobs still cover travel, admin and margin.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4">
        <InfoBox
          title="Why this matters"
          points={[
            "Protects profit on small call-outs.",
            "Consistent policy for first hour and subsequent hours.",
            "Adjusts for VAT and domestic vs commercial.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Calculator (scaffold)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">We’ll add inputs for travel time, admin, overhead rate and roundings. Ready for implementation?</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default MinimumChargeCalculator;
