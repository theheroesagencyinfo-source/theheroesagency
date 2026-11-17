import { assetSrc } from "@/components/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageIntro, ReviewCta } from "@/components/page";
import { CaseStudy } from "@/components/project-story";
import { Button } from "@/components/ui/button";
import home from "@/assets/adam-courtenay/home.jpg.asset.json";
import about from "@/assets/adam-courtenay/about.jpg.asset.json";
import books from "@/assets/adam-courtenay/books.jpg.asset.json";
import speaking from "@/assets/adam-courtenay/speaking.jpg.asset.json";
import coaching from "@/assets/adam-courtenay/coaching.jpg.asset.json";
import contact from "@/assets/adam-courtenay/contact.jpg.asset.json";

const LIVE_URL = "https://adamcourtenay.com/";
const pages = [
  { label: "Homepage", src: assetSrc(home) },
  { label: "About", src: assetSrc(about) },
  { label: "Books", src: assetSrc(books) },
  { label: "Speaking", src: assetSrc(speaking) },
  { label: "Coaching", src: assetSrc(coaching) },
  { label: "Contact", src: assetSrc(contact) },
];

export const Route = createFileRoute("/projects/adam-courtenay")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Adam Courtenay author website · TheHeroes Agency · Author Studio" },
    { name: "description", content: "An author and journalist website for Adam Courtenay in Sydney, covering his books, his story, speaking, coaching and contact." },
    { property: "og:title", content: "Adam Courtenay author website · TheHeroes Agency" },
    { property: "og:description", content: "Adam Courtenay author website showcase by TheHeroes Agency. An author and journalist website for Adam Courtenay in Sydney, covering his books, his story, speaking, coaching and contact." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Project,
});

function Project() {
  const [active, setActive] = useState(0);
  const viewer = useRef<HTMLDivElement>(null);
  const page = pages[active] ?? pages[0]!;
  return <>
    <div className="mx-auto max-w-[1500px] px-5 pt-10"><Link to="/work" className="text-sm underline underline-offset-4">← Back to case studies</Link></div>
    <PageIntro label="Author website · 6 pages" title="Adam Courtenay.">An author and journalist website for Adam Courtenay in Sydney, covering his books, his story, speaking, coaching and contact.</PageIntro>
    <div className="mx-auto max-w-[1500px] px-5 pb-8"><Button asChild><a href={LIVE_URL} target="_blank" rel="noopener noreferrer">Visit the live website <span aria-hidden="true">↗</span></a></Button></div>
    <section className="border-t"><div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-12 md:grid-cols-[220px_minmax(0,1fr)]">
      <div role="tablist" aria-label="Website pages" className="flex min-w-0 gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
        {pages.map((p, i) => <button key={p.label} role="tab" aria-selected={i === active} aria-controls="viewer" onClick={() => { setActive(i); viewer.current?.scrollTo({ top: 0 }); }}
          className={`shrink-0 border-l-2 px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${i === active ? "border-primary font-semibold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
          <span className="mr-2 text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>{p.label}</button>)}
      </div>
      <div className="min-w-0">
        <div className="border-b pb-3"><h2 className="text-2xl">{page.label}</h2></div>
        <div id="viewer" ref={viewer} role="tabpanel" tabIndex={0} aria-label={`${page.label} screenshot, scrollable`}
          className="mt-4 h-[60vh] overflow-y-auto overscroll-contain border bg-muted focus-visible:outline-2 focus-visible:outline-ring md:h-[70vh]">
          <img key={page.src} decoding="async" src={page.src} alt={`Adam Courtenay website: ${page.label} page`} className="block h-auto w-full" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Page {active + 1} of {pages.length}. Scroll inside the frame to move through the page.</p>
      </div>
    </div></section>
    <CaseStudy sections={[{"heading": "Overview", "body": "A six-page website for Adam Courtenay, Sydney author and journalist, with a calm cream palette, classic serif type and a rust accent."}, {"heading": "The author's goal", "body": "Adam wanted a professional home that told his story from newspapers to history books, presented each title, and offered speaking and coaching."}, {"heading": "What I built", "body": "A homepage, an About page with his story and an in-depth interview, a Books page with individual book pages, a Speaking page, a Coaching page, and a Contact page."}]} />
    <ReviewCta />
  </>;
}
