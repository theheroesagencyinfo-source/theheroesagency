import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page";
import { ReviewForm } from "@/components/ReviewForm";
import { agencyServices } from "@/lib/agency-services";
import { IndividualServices } from "@/components/individual-services";
import { ReaderJourney } from "@/components/conversion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { timelineAnswer } from "@/lib/packages";
import { revisionAnswer } from "@/lib/legal-policy";

export const Route = createFileRoute("/services")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Services · TheHeroes Agency · Author Studio" },
    { name: "description", content: "Author platform development, author branding, email marketing for authors and book visibility services for nonfiction authors worldwide." },
    { property: "og:title", content: "Services · TheHeroes Agency · Author Studio" },
    { property: "og:description", content: "Professional platforms, stronger reader relationships and relevant book visibility for nonfiction authors." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Services,
});
const offers = agencyServices.map(service => ({ title: service.title, service: service.service, outcome: service.value, who: service.audience, included: service.items, needs: ["Approved biographies, photographs and book information", "Your audience, professional goals and existing brand assets", "Appropriate access to the accounts included in your agreed scope"] }));
const steps = [
  { title: "Free review", text: "We start with your book and your current author site." },
  { title: "Scoping call", text: "We agree on the right service, deliverables, and timeline." },
  { title: "Build", text: "We build the pages and assets, with agreed review points along the way." },
  { title: "Launch", text: "We check the finished work and get it ready to go live." },
];
const faqs = [
  ["How long will it take?", timelineAnswer],
  ["What do you need from me?", "Your book cover, description, bio, headshot, retailer links, and access to any accounts we're building on. We'll send a short checklist after our scoping call."],
  ["How do revisions work?", revisionAnswer],
  ["Which tools do you build on?", "We can build on any major website hosting platform, so you can keep the tools you already use."],
  ["How does payment work?", "Projects are billed in clear milestones: a 50% deposit to start and 50% before final launch for Author Starter and Author Growth, or 40%, 30% and 30% for Author Authority. Invoices can be paid by card or bank transfer."],
];
function Services() {
  const [selected, setSelected] = useState<string>();
  return <>
    <PageIntro label="Services" title="Built around your work. Connected to your readers.">We help nonfiction authors internationally build professional platforms, strengthen their brands, connect with readers and improve their digital visibility.</PageIntro>
    {offers.map((offer, index) => <section key={offer.title} className="border-t">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 md:grid-cols-[1fr_1.4fr]">
        <div><p className="font-serif text-lg text-muted-foreground">0{index + 1}</p><h2 className="mt-3 text-4xl">{offer.title}</h2><p className="mt-4 max-w-[45ch] text-lg text-muted-foreground">{offer.outcome}</p>
          <h3 className="mt-8 font-sans text-sm font-semibold">Who it's for</h3><p className="mt-2 max-w-[45ch] text-muted-foreground">{offer.who}</p>
          <Button asChild variant="studio" size="studio" className="mt-8"><a href="#quote" onClick={() => setSelected(offer.service)}>Request a quote</a></Button>
        </div>
        <div><h3 className="font-sans text-sm font-semibold">What we can help with</h3><ul className="mt-4 divide-y border-y">{offer.included.map(item => <li key={item} className="flex gap-4 py-3"><span aria-hidden="true" className="text-ring">·</span>{item}</li>)}</ul>
          <h3 className="mt-8 font-sans text-sm font-semibold">What we need from you</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">{offer.needs.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </section>)}
    <IndividualServices />
    <section className="border-t bg-secondary"><div className="mx-auto max-w-[1500px] px-5 py-12"><h2 className="text-3xl">Bring the right services together.</h2><p className="mt-3 text-muted-foreground">Compare Author Starter, Author Growth and Author Authority, from $700 USD.</p><Button asChild variant="studio" size="studio" className="mt-6"><Link to="/pricing" hash="packages">Explore packages</Link></Button></div></section>
    <ReaderJourney />
    <section className="border-t bg-secondary"><div className="mx-auto max-w-[1500px] px-5 py-16"><h2 className="text-4xl">How we work</h2><ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step, i) => <li key={step.title} className="border-t pt-5"><span className="font-serif text-3xl text-ring">0{i + 1}</span><h3 className="mt-4 text-2xl">{step.title}</h3><p className="mt-2 text-muted-foreground">{step.text}</p></li>)}</ol></div></section>
    <section className="border-t"><div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 md:grid-cols-[1fr_1.4fr]"><h2 className="text-4xl">Before we start</h2><Accordion type="single" collapsible className="border-t">{faqs.map(([q, a], i) => <AccordionItem key={q} value={String(i)}><AccordionTrigger className="py-5 text-base">{q}</AccordionTrigger><AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    <section id="quote" className="scroll-mt-36 border-t bg-secondary"><div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 md:grid-cols-[1fr_1.4fr]"><div><p className="text-sm text-muted-foreground">Your next chapter</p><h2 className="mt-4 text-4xl">Request a quote.</h2><p className="mt-4 max-w-[40ch] text-muted-foreground">Tell us about your nonfiction work, your audience and what you want to achieve.</p></div><ReviewForm mode="quote" selectedService={selected} /></div></section>
  </>;
}
