import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, ReviewCta } from "@/components/page";
import { PackageGrid } from "@/components/package-grid";
import { IndividualServices } from "@/components/individual-services";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { timelineAnswer } from "@/lib/packages";
import { projectConditions, revisionAnswer } from "@/lib/legal-policy";

export const Route = createFileRoute("/pricing")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Author platform packages & pricing · TheHeroes Agency" },
    { name: "description", content: "Author Starter $700, Author Growth $2,000 and Author Authority $5,400 USD. Compare author website design, branding and email marketing packages." },
    { property: "og:title", content: "Author platform packages & pricing · TheHeroes Agency" },
    { property: "og:description", content: "Three clear packages for nonfiction authors: a professional presence, stronger reader relationships or a comprehensive authority platform." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Pricing,
});
const faqs = [
  ["Which package should I choose?", "Author Starter establishes a professional online presence. Author Growth adds an expanded website and a three-email reader welcome. Author Authority brings together positioning, publications, automation and a longer-term audience strategy. We can discuss your goals before you choose."],
  ["How long will my project take?", timelineAnswer],
  ["How do revisions work?", revisionAnswer],
  ["Do I need a published book?", "No. We can plan an author platform for a forthcoming nonfiction book. We agree on the content and deliverables before work begins."],
  ["Can you improve my existing site?", "Yes. Website redesign starts at $500, with a separate quotation based on the agreed scope."],
  ["Who supplies the content?", "You provide approved biographies, photographs and book information unless otherwise agreed. Copywriting or additional content can be included in a separate written scope."],
];
function Pricing() {
  return <>
    <PageIntro label="Pricing" title="An author platform for your next chapter.">Build your presence, deepen reader relationships or bring your professional work together. Choose a clear starting point, with scope and payments agreed in writing.</PageIntro>
    <section id="packages" className="scroll-mt-28 border-t bg-secondary"><div className="mx-auto max-w-[1500px] px-5 py-16"><div className="mb-10"><h2 className="text-4xl">Three packages. Room to grow.</h2><p className="mt-4 max-w-[60ch] text-muted-foreground">For independent nonfiction authors, established writers, speakers and consultants. All prices in USD.</p></div><PackageGrid />
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y py-7"><div><h3 className="text-2xl">Need a custom package?</h3><p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">Tell us what your author platform needs. We’ll reply with a written scope and quotation.</p></div><Button asChild variant="studioOutline" size="studio"><Link to="/custom-package">Request a custom price</Link></Button></div>
    </div></section>
    <IndividualServices />
    <section className="border-t bg-secondary"><div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 md:grid-cols-[1fr_1.4fr]"><div><h2 className="text-3xl">A few practical details.</h2><p className="mt-4 text-sm text-muted-foreground">Clear expectations keep your project focused. Existing signed agreements remain unchanged.</p></div><ul className="space-y-3 text-sm text-muted-foreground">{projectConditions.map(condition => <li key={condition} className="border-t pt-3">{condition}</li>)}<li><Link to="/terms" className="underline underline-offset-4">Read the full service terms</Link></li></ul></div></section>
    <section className="border-t"><div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 md:grid-cols-[1fr_1.4fr]"><h2 className="text-4xl">Questions authors ask</h2><Accordion type="single" collapsible className="border-t">{faqs.map(([q, a], i) => <AccordionItem key={q} value={String(i)}><AccordionTrigger className="py-5 text-left text-base">{q}</AccordionTrigger><AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    <ReviewCta />
  </>;
}
