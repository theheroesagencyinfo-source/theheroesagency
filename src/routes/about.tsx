import { assetSrc } from "@/components/site";
import mouPortrait from "@/assets/mou/burgundy.png.asset.json";
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ReviewCta } from "@/components/page";
import { PhotoStack } from "@/components/photo-stack";
import { PanelsTopLeft, BookOpen, Mail, Globe } from "lucide-react";
export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "About Mou Barrac · TheHeroes Agency · Author Studio" },
    { name: "description", content: "Meet Mou Barrac and TheHeroes Agency, an international digital growth agency helping nonfiction authors build platforms, brands and reader relationships." },
    { property: "og:title", content: "About Mou Barrac · TheHeroes Agency · Author Studio" },
    { property: "og:description", content: "Author platform development, author branding and email marketing for nonfiction authors, with one point of contact." },
    { property: "og:image", content: assetSrc(mouPortrait) }, { name: "twitter:image", content: assetSrc(mouPortrait) },
    { property: "og:type", content: "profile" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: About,
});
const skills = [
  { title: "Web design", text: "Author websites with a clear path from discovering your book to taking the next step.", icon: PanelsTopLeft },
  { title: "Book launch pages", text: "A focused place for your book, retailer links, and launch message.", icon: BookOpen },
  { title: "Email marketing automation", text: "Reader signup flows and welcome sequences in your email tool.", icon: Mail },
  { title: "Book visibility & promotion", text: "Digital visibility strategies and relevant promotional opportunities for nonfiction work.", icon: Globe },
];
const principles = [
  ["One point of contact", "You work directly with me, from the first conversation to launch."],
  ["Clear timelines", "We agree on the scope, review points, and timeline before work begins."],
  ["No jargon", "I explain decisions in plain language, so you know what we're building and why."],
];
function About() {
  return <>
    <PageIntro label="About Mou Barrac" title="Helping nonfiction authors build what comes next.">Your book can be the beginning of a relationship, not the end of a sale.</PageIntro>
    <section className="border-t"><div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr] md:items-start">
      <div className="max-w-[60ch] space-y-6 text-lg text-muted-foreground"><h2 className="text-3xl text-foreground">I'm Mou Barrac.</h2><p>TheHeroes Agency is an author-focused digital growth agency serving nonfiction authors internationally, from independent writers to established authors, speakers and consultants.</p><p>I started working with authors because so many great nonfiction books have no clear next step for the reader. Someone finishes the book, wants more, and there's nowhere to go.</p><p>Our work brings together author platform development, brand positioning, audience growth and book visibility. Your website and reader relationships should support your professional goals, not simply look good.</p><p>I believe a book can start a lasting reader relationship, not just make a sale. The platform behind it should make that next conversation easier.</p><p>You get one point of contact, clear timelines, and no jargon. We agree on what your book needs before we start building.</p></div>
      <div className="w-full md:justify-self-end"><PhotoStack /></div>
    </div></section>
    <section className="border-t bg-secondary"><div className="mx-auto max-w-[1500px] px-5 py-16"><h2 className="text-4xl">What I bring</h2><div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">{skills.map(({ title, text, icon: Icon }) => <div key={title} className="border-t pt-5"><Icon aria-hidden="true" className="mb-4 h-7 w-7 text-ring" strokeWidth={1.5} /><h3 className="text-2xl">{title}</h3><p className="mt-3 max-w-[50ch] text-muted-foreground">{text}</p></div>)}</div></div></section>
    <section className="border-t"><div className="mx-auto max-w-[1500px] px-5 py-16"><h2 className="text-4xl">How I work with authors</h2><ol className="mt-10 grid gap-8 md:grid-cols-3">{principles.map(([title, text], i) => <li key={title} className="border-t pt-5"><span className="font-serif text-3xl text-ring">0{i + 1}</span><h3 className="mt-4 text-2xl">{title}</h3><p className="mt-3 text-muted-foreground">{text}</p></li>)}</ol></div></section>
    <ReviewCta />
  </>;
}
