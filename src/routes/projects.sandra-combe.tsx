import { assetSrc } from "@/components/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageIntro, ReviewCta } from "@/components/page";
import { CaseStudy, ProjectReviews } from "@/components/project-story";
import { Button } from "@/components/ui/button";
import home from "@/assets/sandra-combe/home.jpg.asset.json";

const LIVE_URL = "https://www.stopthebypass.com/";
const pages = [
  { label: "Homepage", src: assetSrc(home) },
];

export const Route = createFileRoute("/projects/sandra-combe")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Sandra D. Combe author website · TheHeroes Agency · Author Studio" },
    { name: "description", content: "A book website for Stop the Bypass: A Story About Love by Sandra D. Combe, with the story behind the book, a trailer, the author's bio and ways to get the book." },
    { property: "og:title", content: "Sandra D. Combe author website · TheHeroes Agency" },
    { property: "og:description", content: "Sandra D. Combe author website showcase by TheHeroes Agency. A book website for Stop the Bypass: A Story About Love by Sandra D. Combe, with the story behind the book, a trailer, the author's bio and ways to get the book." },
    { property: "og:image", content: assetSrc(home) }, { name: "twitter:image", content: assetSrc(home) },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Project,
});

function Project() {
  const [active, setActive] = useState(0);
  const viewer = useRef<HTMLDivElement>(null);
  const page = pages[active] ?? pages[0];
  if (!page) return null;
  return <>
    <div className="mx-auto max-w-[1500px] px-5 pt-10"><Link to="/work" className="text-sm underline underline-offset-4">← Back to case studies</Link></div>
    <PageIntro label="Book website · single page" title="Sandra D. Combe.">A book website for Stop the Bypass: A Story About Love by Sandra D. Combe, with the story behind the book, a trailer, the author's bio and ways to get the book.</PageIntro>
    <div className="mx-auto max-w-[1500px] px-5 pb-8"><Button asChild><a href={LIVE_URL} target="_blank" rel="noopener noreferrer">Visit the live website <span aria-hidden="true">↗</span></a></Button></div>
    <section className="border-t"><div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-12 md:grid-cols-[220px_minmax(0,1fr)]">
      <div><p className="text-sm text-muted-foreground">One long page. Scroll inside the frame to see all of it.</p></div>
      <div className="min-w-0">
        <div className="border-b pb-3"><h2 className="text-2xl">{page.label}</h2></div>
        <div id="viewer" ref={viewer} role="tabpanel" tabIndex={0} aria-label={`${page.label} screenshot, scrollable`}
          className="mt-4 h-[60vh] overflow-y-auto overscroll-contain border bg-muted focus-visible:outline-2 focus-visible:outline-ring md:h-[70vh]">
          <img key={page.src} decoding="async" src={page.src} alt={`Sandra D. Combe website: ${page.label} page`} className="block h-auto w-full" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Page {active + 1} of {pages.length}. Scroll inside the frame to move through the page.</p>
      </div>
    </div></section>
    <CaseStudy kind="client" sections={[{"heading": "Overview", "body": "A single-page book website for Stop the Bypass: A Story About Love, designed in rich violet and plum with soft butterfly imagery that matches the book cover."}, {"heading": "The author's goal", "body": "Sandra wanted a home for her book that shared its story, showed the book trailer, introduced her as the author, and made it simple to buy the book or get in touch."}, {"heading": "What I built", "body": "A homepage with the book's opening message, the Dying to Live story, a book trailer, a book section, the author's bio, reader responses, a newsletter signup, and clear next steps for the book, speaking and contact."}]} />
    <ProjectReviews project="sandra-combe" author="Sandra D. Combe · Author of Stop the Bypass" quote="Because my book deals with heart disease and critical health choices, reader trust was my number one priority. I was worried a website might feel too clinical or overly commercial. Mou took the time to understand the heart behind the story and crafted a digital home that is calm, compassionate, and authoritative. Readers frequently mention how reassuring and clear the site felt when they were searching for answers." />
    <ReviewCta />
  </>;
}
