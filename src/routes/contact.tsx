import { z } from "zod";
import { serviceOptions } from "@/lib/review-schema";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BOOKING_LABEL, BOOKING_URL, CONTACT_EMAIL, SOCIALS } from "@/components/site";
import { PageIntro } from "@/components/page";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewPreview } from "@/components/conversion";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  validateSearch: (search) => z.object({ service: z.enum(serviceOptions).catch("not sure yet").optional() }).parse(search),
  head: () => ({ meta: [
    { title: "Discuss your author project · TheHeroes Agency · Author Studio" },
    { name: "description", content: "Contact TheHeroes Agency about author website design, email marketing, author branding and book visibility. Tell us your goals and budget." },
    { property: "og:title", content: "Discuss your author project · TheHeroes Agency · Author Studio" },
    { property: "og:description", content: "Discuss your nonfiction author platform, reader relationships and digital visibility with Mou Barrac." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Contact,
});
const next = [
  ["Send your details", "Tell us about your book, your website, and what you'd like help with."],
  ["We discuss the scope", "We review your goals and recommend the services that fit."],
  ["Choose your next step", "Use the suggestions yourself, or ask us about working together."],
];
function Contact() {
  const { service } = Route.useSearch();
  return <>
    <PageIntro label="Contact" title="Let’s discuss your next chapter.">Tell us about your nonfiction work and what you need: a professional platform, stronger reader relationships or greater book visibility.</PageIntro>
    <section id="inquiry" className="scroll-mt-36 border-t"><div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr]">
      <ReviewForm mode="quote" selectedService={service} />
      <aside className="md:border-l md:pl-12"><h2 className="text-3xl">Let's talk about your book.</h2><dl className="mt-8 space-y-6"><div><dt className="text-sm text-muted-foreground">Email</dt><dd className="mt-2 break-words text-lg"><a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:text-foreground">{CONTACT_EMAIL}</a></dd></div><div><dt className="text-sm text-muted-foreground">Response time</dt><dd className="mt-2">Under 12 hours</dd></div></dl>
        <div className="mt-8 border-t pt-6"><Button asChild variant="studioOutline" size="studio"><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{BOOKING_LABEL}</a></Button><p className="mt-4 text-sm text-muted-foreground">Pick a time that suits you. No preparation needed.</p></div>
        <div className="mt-8 border-t pt-6"><p className="text-sm text-muted-foreground">Find us online</p><ul className="mt-4 space-y-3">{SOCIALS.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-foreground"><s.icon aria-hidden className="h-4 w-4" />{s.label} · {s.handle}</a></li>)}</ul></div>
      </aside>
    </div></section>
    <section id="review" className="scroll-mt-36 border-t bg-secondary"><div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 md:grid-cols-2"><div><h2 className="text-3xl">Complimentary author website audit.</h2><p className="mt-4 max-w-[45ch] text-muted-foreground">Get practical notes on your author website before deciding what to improve.</p><Button asChild variant="studioOutline" size="studio" className="mt-6"><Link to="/" hash="review">Request a free website review</Link></Button></div><ReviewForm /></div></section>
    <ReviewPreview />
    <section className="border-t bg-secondary"><div className="mx-auto max-w-[1500px] px-5 py-16"><h2 className="text-4xl">What happens next</h2><ol className="mt-10 grid gap-8 md:grid-cols-3">{next.map(([title, text], i) => <li key={title} className="border-t pt-5"><span className="font-serif text-3xl text-ring">0{i + 1}</span><h3 className="mt-4 text-2xl">{title}</h3><p className="mt-3 text-muted-foreground">{text}</p></li>)}</ol></div></section>
  </>;
}
