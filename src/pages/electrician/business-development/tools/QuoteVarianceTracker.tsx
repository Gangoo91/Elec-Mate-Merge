import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";

const QuoteVarianceTracker: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>Quote vs Actual Variance Tracker UK</title>
        <meta name="description" content="Track quote vs actual hours, materials and costs to improve estimating accuracy for UK electrical jobs." />
        <link rel="canonical" href="/electrician/business-development/tools/quote-variance" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Quote vs Actual Tracker</h1>
        <p className="text-muted-foreground mt-2">Capture variances to refine your pricing and protect margin.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4">
        <InfoBox
          title="Why this matters"
          points={[
            "Reveals where jobs overrun and why.",
            "Builds a feedback loop to sharpen estimates.",
            "Highlights scope creep and rework quickly.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Tracker (scaffold)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">We’ll add inputs for quoted vs actual hours/materials and reasons. Export CSV and JSON. Shall I proceed?</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default QuoteVarianceTracker;
