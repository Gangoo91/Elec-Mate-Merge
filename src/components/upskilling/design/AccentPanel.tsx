import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AccentTone = "blue" | "amber" | "teal" | "green" | "purple" | "rose" | "indigo";
export type AccentVariant = "solid" | "subtle";

const toneSolid: Record<AccentTone, string> = {
  blue: "bg-[hsl(var(--accent-blue))] border-[hsl(var(--accent-blue))]",
  amber: "bg-[hsl(var(--accent-amber))] border-[hsl(var(--accent-amber))]",
  teal: "bg-[hsl(var(--accent-teal))] border-[hsl(var(--accent-teal))]",
  green: "bg-[hsl(var(--accent-green))] border-[hsl(var(--accent-green))]",
  purple: "bg-[hsl(var(--accent-purple))] border-[hsl(var(--accent-purple))]",
  rose: "bg-[hsl(var(--accent-rose))] border-[hsl(var(--accent-rose))]",
  indigo: "bg-[hsl(var(--accent-indigo))] border-[hsl(var(--accent-indigo))]",
};

const toneSubtle: Record<AccentTone, string> = {
  blue: "bg-[hsl(var(--accent-blue)/0.12)] border-[hsl(var(--accent-blue)/0.4)]",
  amber: "bg-[hsl(var(--accent-amber)/0.12)] border-[hsl(var(--accent-amber)/0.4)]",
  teal: "bg-[hsl(var(--accent-teal)/0.12)] border-[hsl(var(--accent-teal)/0.4)]",
  green: "bg-[hsl(var(--accent-green)/0.12)] border-[hsl(var(--accent-green)/0.4)]",
  purple: "bg-[hsl(var(--accent-purple)/0.12)] border-[hsl(var(--accent-purple)/0.4)]",
  rose: "bg-[hsl(var(--accent-rose)/0.12)] border-[hsl(var(--accent-rose)/0.4)]",
  indigo: "bg-[hsl(var(--accent-indigo)/0.12)] border-[hsl(var(--accent-indigo)/0.4)]",
};

export function AccentPanel({
  tone = "blue",
  title,
  children,
  className,
  variant = "solid",
}: {
  tone?: AccentTone;
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: AccentVariant;
}) {
  const toneClasses = variant === "subtle" ? toneSubtle[tone] : toneSolid[tone];
  return (
    <div
      className={cn(
        "rounded-md border p-4 text-[hsl(var(--accent-foreground))] shadow-sm",
        toneClasses,
        className
      )}
    >
      {title ? (
        <p className="font-medium text-elec-yellow mb-2">{title}</p>
      ) : null}
      <div className="text-[hsl(var(--accent-foreground))]">{children}</div>
    </div>
  );
}
