import { Link } from "@tanstack/react-router";
import { Check, ArrowUpRight } from "lucide-react";
import { packages } from "@/lib/packages";
import { formatPrice, paymentSchedule } from "@/lib/pricing-values";
import { Button } from "@/components/ui/button";

export function PackageGrid({ compact = false }: { compact?: boolean }) {
  return <div className="grid items-stretch gap-6 lg:grid-cols-3">{packages.map((pkg, index) => <article key={pkg.slug} className={`flex min-w-0 flex-col rounded-md border bg-background p-6 sm:p-8 ${pkg.popular ? "border-primary border-t-4" : "border-t-4 border-t-border"}`}>
    <div className="flex min-h-7 items-center justify-between gap-3 text-xs"><span className="text-muted-foreground">0{index + 1}</span>{pkg.popular && <span className="font-semibold text-primary">Recommended</span>}</div>
    <h3 className="mt-3 text-3xl">{pkg.name}</h3>
    {!compact && <p className="mt-5 font-serif text-4xl">{pkg.price} <span className="font-sans text-xs text-muted-foreground">USD</span></p>}
    <p className="mt-2 text-sm text-primary">Estimated delivery: {pkg.time}</p>
    <p className="mt-5 min-h-16 text-sm leading-relaxed text-muted-foreground">{pkg.best}</p>
    <ul className="mt-5 space-y-3 border-t pt-5 text-sm">{(compact ? pkg.items.slice(0, 5) : pkg.items).map(item => <li key={item} className="flex gap-3"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>)}</ul>
    <div className="mt-auto pt-7">{!compact && <ul className="space-y-2 border-t pt-5 text-xs text-muted-foreground">{paymentSchedule(pkg.slug).map(step => <li key={step.label}>{step.label}: <strong className="font-semibold text-foreground">{formatPrice(step.amount)}</strong></li>)}</ul>}
      <Button asChild variant={pkg.popular ? "studio" : "studioOutline"} size="studio" className="mt-6 w-full whitespace-normal"><Link to="/get-started" search={{ package: pkg.slug }}>{pkg.cta}<ArrowUpRight aria-hidden className="h-4 w-4 shrink-0" /></Link></Button>
    </div>
  </article>)}</div>;
}
