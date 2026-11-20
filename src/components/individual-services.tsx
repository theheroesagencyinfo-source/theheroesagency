import { Link } from "@tanstack/react-router";
import { individualServices } from "@/lib/agency-services";
import { Button } from "@/components/ui/button";

export function IndividualServices() {
  return <section className="border-t"><div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 md:grid-cols-[1fr_1.4fr]">
    <div><p className="text-sm font-semibold text-primary">Individual services</p><h2 className="mt-4 text-4xl">Start with what you need.</h2><p className="mt-4 max-w-[40ch] text-muted-foreground">Improve one part of your author platform without committing to a full package. Prices are in USD; the scope is confirmed before payment.</p><Button asChild variant="studio" size="studio" className="mt-7"><Link to="/contact">Discuss your project</Link></Button></div>
    <dl className="divide-y border-y">{individualServices.map(service => <div key={service.title} className="flex flex-wrap items-baseline justify-between gap-3 py-5"><dt><Link to={"review" in service ? "/" : "/contact"} {...("review" in service ? { hash: "review" } : { search: { service: service.service } })} className="underline decoration-border underline-offset-4 hover:decoration-primary">{service.title}</Link></dt><dd className="text-sm font-semibold text-primary">{service.price}</dd></div>)}</dl>
  </div></section>;
}
