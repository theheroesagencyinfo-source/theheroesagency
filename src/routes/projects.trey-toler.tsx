import { assetSrc } from "@/components/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageIntro, ReviewCta } from "@/components/page";
import { CaseStudy } from "@/components/project-story";
import { Button } from "@/components/ui/button";
import home from "@/assets/trey-toler/home.jpg.asset.json";

const LIVE_URL = "https://treytoler.com/";
const pages = [
  { label: "Homepage", src: assetSrc(home) },
];

export const Route = createFileRoute("/projects/trey-toler")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Trey Toler author website · TheHeroes Agency · Author Studio" },
    { name: "description", content: "An author and speaker website for Trey Toler, author of Good Damage, bringing together the book, press, keynote talks, newsletter and media." },
    { property: "og:title", content: "Trey Toler author website · TheHeroes Agency" },
    { property: "og:description", content: "Trey Toler author website showcase by TheHeroes Agency. An author and speaker website for Trey Toler, author of Good Damage, bringing together the book, press, keynote talks, newsletter and media." },
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
    <PageIntro label="Author and speaker website · single page" title="Trey Toler.">An author and speaker website for Trey Toler, author of Good Damage, bringing together the book, press, keynote talks, newsletter and media.</PageIntro>
    <div className="mx-auto max-w-[1500px] px-5 pb-8"><Button asChild><a href={LIVE_URL} target="_blank" rel="noopener noreferrer">Visit the live website <span aria-hidden="true">↗</span></a></Button></div>
    <section className="border-t"><div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-12 md:grid-cols-[220px_minmax(0,1fr)]">
      <div><p className="text-sm text-muted-foreground">One long page. Scroll inside the frame to see all of it.</p></div>
      <div className="min-w-0">
        <div className="border-b pb-3"><h2 className="text-2xl">{page.label}</h2></div>
        <div id="viewer" ref={viewer} role="tabpanel" tabIndex={0} aria-label={`${page.label} screenshot, scrollable`}
          className="mt-4 h-[60vh] overflow-y-auto overscroll-contain border bg-muted focus-visible:outline-2 focus-visible:outline-ring md:h-[70vh]">
          <img key={page.src} decoding="async" src={page.src} alt={`Trey Toler website: ${page.label} page`} className="block h-auto w-full" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Page {active + 1} of {pages.length}. Scroll inside the frame to move through the page.</p>
      </div>
    </div></section>
    <CaseStudy sections={[{"heading": "Overview", "body": "A bold, single-page website for Trey Toler, author of Good Damage, combining black, white and vivid gradients that reflect the book's colourful cover."}, {"heading": "The author's goal", "body": "Trey needed a site that introduced Good Damage, showed his press coverage, and helped event organisers book him as a keynote speaker."}, {"heading": "What I built", "body": "A homepage with the book introduction, press logos and review quotes, a Good Damage book section, a Speaking section with signature talks, common questions, his newsletter, media and Instagram."}]} />
    <ReviewCta />
  </>;
}
