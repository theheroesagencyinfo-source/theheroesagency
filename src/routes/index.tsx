import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { assetSrc } from "@/components/site";
import { ReviewForm } from "@/components/ReviewForm";
import { ApprovedReviews, approvedReviewsQuery } from "@/components/approved-reviews";
import { BOOKING_URL } from "@/components/site";
import { Button } from "@/components/ui/button";
import { agencyServices } from "@/lib/agency-services";
import { ProjectRating } from "@/components/project-rating";
import danielHome from "@/assets/daniel-carter/home.png.asset.json";
import eleanorHome from "@/assets/eleanor-whitmore/home.png.asset.json";
import jonathanHome from "@/assets/jonathan-reed/home.png.asset.json";
import sandraHome from "@/assets/sandra-combe/home.jpg.asset.json";
import treyHome from "@/assets/trey-toler/home.jpg.asset.json";
import adamHome from "@/assets/adam-courtenay/home.jpg.asset.json";
import { BookOpening } from "@/components/book-opening";
import authorStudy from "@/assets/author-study-portrait.jpg.asset.json";
import heroLibrary from "@/assets/hero_open_book_desk.jpg.asset.json";
import heroQuote from "@/assets/hero_author_writing.jpg.asset.json";
import heroSculpture from "@/assets/hero_book_stack.jpg.asset.json";
import journeyDiscovery from "@/assets/journey-discovery.jpg.asset.json";
import journeyConnection from "@/assets/journey-connection.jpg.asset.json";
import journeyRelationship from "@/assets/journey-relationship.jpg.asset.json";
import journeyOpportunity from "@/assets/journey-opportunity.jpg.asset.json";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "TheHeroes Agency · Digital growth for nonfiction authors" },
      { name: "description", content: "Author platform development, author branding and email marketing for nonfiction authors. Build your presence, connect with readers and create more opportunities." },
      { property: "og:title", content: "TheHeroes Agency · Author Studio" },
      { property: "og:description", content: "Helping nonfiction authors build their presence, connect with readers and create more opportunities around their work." },
      { property: "og:image", content: assetSrc(heroLibrary) }, { name: "twitter:image", content: assetSrc(heroLibrary) },
    { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(approvedReviewsQuery).catch(() => []),
  component: Home,
});

const sections = [
  ["top", "Top"], ["studio", "Studio"], ["services", "What we build"], ["work", "Case studies"],
  ["difference", "Why TheHeroes"], ["journey", "Reader journey"], ["process", "How it works"], ["voices", "Author reviews"], ["review", "Free site review"],
] as const;

const pathSteps = ["Platform", "Audience", "Visibility"];
const services = agencyServices.map((service, i) => ({ h: service.title, p: service.value, step: pathSteps[i] ?? "", to: "/services" as const }));

const projects = [
  { to: "/projects/adam-courtenay" as const, slug: "adam-courtenay", live: true, name: "Adam Courtenay", meta: "Live author website · 6 pages", img: adamHome, p: "His books, story, speaking and coaching, for a Sydney author and journalist." },
  { to: "/projects/trey-toler" as const, slug: "trey-toler", live: true, name: "Trey Toler", meta: "Live author and speaker website", img: treyHome, p: "A bold home for Good Damage, his press, keynote talks and newsletter." },
  { to: "/projects/sandra-combe" as const, slug: "sandra-combe", live: true, name: "Sandra D. Combe", meta: "Live book website", img: sandraHome, p: "A book website for Stop the Bypass, with its trailer, story and author bio." },
  { to: "/projects/daniel-carter" as const, slug: "daniel-carter", name: "Daniel Carter", meta: "Design showcase · 8 pages", img: danielHome, p: "A digital home bringing his books, ideas, speaking work and reader resources together." },
  { to: "/projects/eleanor-whitmore" as const, slug: "eleanor-whitmore", name: "Eleanor Whitmore", meta: "Design showcase · 7 pages", img: eleanorHome, p: "A warm, welcoming platform for her book, events, journal and reader resources." },
  { to: "/projects/jonathan-reed" as const, slug: "jonathan-reed", name: "Jonathan Reed", meta: "Design showcase · 6 pages", img: jonathanHome, p: "A considered presentation of his books, essays, speaking events and resources." },
];

const journey = [
  { n: "01", label: "Discovery", h: "They find you.", p: "Through your book, a talk, a podcast or a recommendation.", note: "A first point of discovery", img: journeyRelationship, cls: "md:col-start-1 md:row-start-1", photo: "h-[330px] md:h-[clamp(330px,43vw,570px)]" },
  { n: "02", label: "Connection", h: "They stay.", p: "Your website gives them a useful reason to join your reader list.", note: "A reason to stay", img: journeyConnection, cls: "md:col-start-2 md:row-start-1 md:mt-32", photo: "h-[260px] md:h-[clamp(235px,28vw,365px)]" },
  { n: "03", label: "Relationship", h: "They get to know you.", p: "Helpful emails build trust and show how your expertise can help.", note: "Trust built over time", img: journeyDiscovery, cls: "ml-[10%] md:col-start-1 md:row-start-2 md:ml-[15%]", photo: "h-[280px] md:h-[clamp(250px,30vw,390px)]" },
  { n: "04", label: "Opportunity", h: "They take action.", p: "A conversation, client enquiry, speaking invitation or book sale.", note: "The next opportunity", img: journeyOpportunity, cls: "md:col-start-2 md:row-start-2 md:mt-20", photo: "h-[300px] md:h-[clamp(300px,36vw,465px)]" },
];

const checks = [
  { h: "Message clarity", p: "Can a new visitor understand who you help and what you offer within five seconds?" },
  { h: "Reader capture", p: "Where are readers leaving without joining your audience, and what would give them a reason to stay?" },
  { h: "Mobile experience", p: "How clearly does your website work on the phone most readers use?" },
  { h: "Three priority fixes", p: "A short list of the improvements worth making first, ordered by effort and likely impact." },
];

const ROUTE = "M280 210 C470 150 660 170 760 350 S720 650 450 760 S650 900 790 1010";
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return <p className={`reveal text-[11px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-pitch-accent" : "text-primary"}`}>{children}</p>;
}

function Home() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = <T extends Element>(s: string) => el.querySelector<T>(s);
    const reveals = el.querySelectorAll(".reveal");
    // Clipped reveals (mask/wipe) have no visible area, so watch their parent and reveal the child.
    const proxy = new Map<Element, Element[]>();
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      // Reverse when the section drops back below the screen while scrolling up.
      const show = e.isIntersecting || e.boundingClientRect.top < 0;
      (proxy.get(e.target) ?? [e.target]).forEach((t) => t.classList.toggle("visible", show));
    }), { threshold: 0.12 });
    reveals.forEach((r) => {
      const fx = (r as HTMLElement).dataset["fx"];
      const t = (fx === "mask" || fx === "wipe") && r.parentElement ? r.parentElement : r;
      if (t !== r) proxy.set(t, [...(proxy.get(t) ?? [t]), r]);
      io.observe(t);
    });

    const scenes = Array.from(el.querySelectorAll<HTMLElement>("[data-scene]"));
    const dots = Array.from(el.querySelectorAll<HTMLAnchorElement>("[data-dot]"));
    const path = q<SVGPathElement>("#journeyRoutePath");
    const plane = q<SVGGElement>("#journeyPlane");
    const comp = q<HTMLDivElement>("[data-journey]");

    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      let active = 0;
      scenes.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        if (r.top < vh * 0.55) active = i;
        if (reduced || window.innerWidth < 768) return;
        const near = clamp((r.top + r.height / 2 - vh * 0.52) / vh, -1, 1);
        s.style.transform = `perspective(1400px) translate3d(0,${clamp(near * 17, -24, 24)}px,${-Math.min(40, Math.abs(near) * 40)}px) rotateX(${clamp(near * -4.2, -5, 5)}deg)`;
        s.style.opacity = String(1 - Math.min(0.13, Math.abs(near) * 0.13));
        s.querySelectorAll<HTMLElement>("[data-depth]").forEach((d) => {
          const depth = Number(d.dataset["depth"]) || 0.1;
          d.style.transform = `translate3d(0,${-near * vh * depth * 0.12}px,${depth * 22}px) rotateY(${near * depth * 2}deg)`;
        });
      });
      dots.forEach((d, i) => d.dataset["active"] = String(i === active));
      if (path && plane && comp) {
        const total = path.getTotalLength();
        const r = comp.getBoundingClientRect();
        const prog = reduced ? 0 : clamp((vh * 0.78 - r.top) / (r.height + vh * 0.56));
        const pt = path.getPointAtLength(total * prog);
        const ah = path.getPointAtLength(Math.min(total, total * prog + 2));
        plane.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${(Math.atan2(ah.y - pt.y, ah.x - pt.x) * 180) / Math.PI})`);
      }
    };
    // Gentle pointer movement on the hero image stack (the "book mockup" feel).
    const tilt = q<HTMLElement>("[data-tilt]");
    let tTarget = { x: 0, y: 0 }, tNow = { x: 0, y: 0 }, tRaf = 0;
    const paintTilt = () => {
      tNow.x += (tTarget.x - tNow.x) * 0.08; tNow.y += (tTarget.y - tNow.y) * 0.08;
      if (tilt) tilt.style.transform = `perspective(1200px) rotateX(${(-tNow.y * 4.5).toFixed(2)}deg) rotateY(${(tNow.x * 5.5).toFixed(2)}deg)`;
      tRaf = Math.abs(tTarget.x - tNow.x) > 0.002 || Math.abs(tTarget.y - tNow.y) > 0.002 ? requestAnimationFrame(paintTilt) : 0;
    };
    const onPointer = (e: PointerEvent) => {
      if (!tilt || reduced || window.innerWidth < 768 || e.pointerType !== "mouse") return;
      const r = tilt.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      tTarget = { x: clamp((e.clientX - r.left - r.width / 2) / (r.width / 2), -1, 1), y: clamp((e.clientY - r.top - r.height / 2) / (r.height / 2), -1, 1) };
      if (!tRaf) tRaf = requestAnimationFrame(paintTilt);
    };
    const onPointerOut = () => { tTarget = { x: 0, y: 0 }; if (!tRaf) tRaf = requestAnimationFrame(paintTilt); };
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onPointerOut);
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      io.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer); document.removeEventListener("pointerleave", onPointerOut);
      if (tRaf) cancelAnimationFrame(tRaf);
      if (tilt) tilt.style.transform = "";
    };
  }, []);

  return (
    <div ref={root} className="home6 overflow-x-clip">
      <BookOpening />

      {/* Section progress rail */}
      <nav aria-label="Page sections" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
        {sections.map(([id, label]) => (
          <a key={id} href={`#${id}`} data-dot aria-label={label} title={label}
            className="h-[5px] w-[5px] rounded-full bg-foreground/25 transition-all data-[active=true]:h-6 data-[active=true]:bg-primary" />
        ))}
      </nav>

      {/* Hero */}
      <section id="top" data-scene className="scene relative scroll-mt-24 px-5 pb-24 pt-14 sm:px-[7vw] md:min-h-[calc(100svh-70px)] md:pt-20">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 md:grid-cols-[1.02fr_.98fr] md:gap-[7vw]">
          <div>
            <Eyebrow>Digital growth for nonfiction authors</Eyebrow>
            <h1 data-fx="mask" className="display reveal mt-5 font-serif text-[clamp(46px,7vw,100px)]">A book is only the beginning. <em className="text-primary">We build what comes next.</em></h1>
            <p className="reveal mt-6 max-w-[500px] leading-relaxed text-muted-foreground sm:text-lg">Helping authors build their presence, connect with readers and create more opportunities around their work. We bring together author platforms, branding, email marketing and book visibility for nonfiction authors, speakers and consultants worldwide.</p>
            <div className="reveal mt-9 flex flex-wrap items-center gap-6">
              <Button asChild variant="studio" size="studio" className="whitespace-normal"><a href="#review">Request a free website review <span aria-hidden>↓</span></a></Button>
              <Button asChild variant="studioOutline" size="studio" className="whitespace-normal"><a href={BOOKING_URL} target="_blank" rel="noreferrer">Book a 15-minute call</a></Button>
            </div>
            <p className="reveal mt-12 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Strategy · Design · Development · Reader growth</p>
          </div>
          <div data-tilt className="relative mx-auto h-[400px] w-full max-w-[620px] sm:h-[540px] md:h-[min(650px,60vw)]" style={{ transformStyle: "preserve-3d" }}>
            <p className="absolute left-0 top-[8%] z-[4] text-[9px] uppercase tracking-[0.2em] text-primary [writing-mode:vertical-rl]">Ideas in form · The author studio</p>
            <div data-depth="0.16" className="absolute right-0 top-[4%] z-[2] h-[82%] w-[72%] shadow-xl"><img src={assetSrc(heroLibrary)} alt="An open hardcover book and handwritten pages on a writer’s desk" decoding="async" className="h-full w-full object-cover" /></div>
            <div data-depth="0.28" className="absolute bottom-[2%] left-0 z-[3] h-[43%] w-[43%] border-[6px] border-background shadow-xl sm:border-[10px]"><img src={assetSrc(heroQuote)} alt="An author writing with a fountain pen" decoding="async" className="h-full w-full object-cover" /></div>
            <div data-depth="0.35" className="absolute -bottom-[2%] right-[5%] z-[4] h-[34%] w-[25%] border-[5px] border-background shadow-lg md:z-[1] md:border-0 md:shadow-none"><img src={assetSrc(heroSculpture)} alt="A stack of hardcover books beside a reading lamp" decoding="async" className="h-full w-full object-cover" /></div>
          </div>
        </div>
      </section>

      {/* Studio statement */}
      <section id="studio" data-scene className="scene scroll-mt-20 bg-pitch px-5 py-24 text-pitch-foreground sm:px-[7vw] md:flex md:min-h-[76vh] md:items-center">
        <div className="mx-auto grid w-full max-w-[1320px] gap-8 md:grid-cols-[.7fr_1.3fr] md:gap-[8vw]">
          <Eyebrow dark>A platform, not just a website</Eyebrow>
          <div>
            <h2 data-fx="wipe" className="display reveal font-serif text-[clamp(40px,6vw,82px)]">A book builds authority. <em className="text-pitch-accent">A connected platform puts it to work.</em></h2>
            <p className="reveal mt-6 max-w-[420px] text-sm leading-loose text-pitch-muted">A strong author platform gives readers and professional contacts a central place to discover your books, work, services and updates. Your website, brand and email relationships should work together, around what you want your expertise to do next.</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" data-scene className="scene scroll-mt-20 px-5 py-24 sm:px-[7vw] md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><Eyebrow>What we build</Eyebrow><h2 className="display reveal mt-4 font-serif text-[clamp(40px,5.5vw,76px)]">Three services. <em className="text-primary">One clear direction.</em></h2></div>
            <p className="reveal max-w-[340px] text-sm leading-relaxed text-muted-foreground">Each step builds on the one before: a credible platform gives readers somewhere to land, an audience keeps them close, and visibility brings new readers in. The essentials that help nonfiction authors look credible, stay connected to readers and create opportunities beyond the book.</p>
          </div>
          <div className="border-t border-foreground/20">
            {services.map((s, i) => (
              <Link key={s.h} to={s.to} data-fx="slide" style={{ ["--i" as string]: i }} className="reveal grid grid-cols-[36px_1fr_24px] items-center gap-3 border-b border-foreground/20 py-6 transition-all hover:px-2 md:grid-cols-[90px_1fr_1fr_42px] md:gap-6 md:py-8 md:hover:px-4">
                <span className="font-serif text-lg text-primary">0{i + 1}</span>
                <h3 className="font-serif text-[26px] tracking-tight md:text-[clamp(25px,3vw,40px)]"><span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{s.step}{i < services.length - 1 ? " → " + (services[i + 1]?.step ?? "") : ""}</span>{s.h}</h3>
                <p className="col-start-2 row-start-2 max-w-[430px] text-sm leading-relaxed text-muted-foreground md:col-start-3 md:row-start-1">{s.p}</p>
                <span aria-hidden className="col-start-3 row-span-2 row-start-1 text-2xl text-primary md:col-start-4 md:row-span-1">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section id="work" data-scene className="scene scroll-mt-20 bg-secondary px-5 py-24 sm:px-[7vw] md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><Eyebrow>Case studies · Author platforms</Eyebrow><h2 className="display reveal mt-4 font-serif text-[clamp(42px,6vw,82px)]">Different voices.<br /><em className="text-primary">Thoughtful digital homes.</em></h2></div>
            <p className="reveal max-w-[290px] text-sm leading-relaxed text-muted-foreground">Each author has a different story, audience and visual language. The work should reflect that.</p>
          </div>
          <div className="work-track -mx-5 flex gap-6 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:items-start md:gap-14 md:overflow-visible md:px-0 md:pb-0 md:grid-cols-[1.13fr_.87fr] md:gap-x-[5vw]">
            {projects.slice(0, 4).map((p, i) => (
              <article key={p.slug} data-fx="curtain" style={{ ["--i" as string]: i }} className={`reveal w-[82vw] shrink-0 md:w-auto ${i % 2 === 1 ? "md:mt-28" : ""}`}>
                <Link to={p.to} className="curtain group block aspect-[4/3] overflow-hidden border bg-muted shadow-lg transition-shadow duration-500 hover:shadow-2xl" aria-label={`View the ${p.name} author website`}>
                  <img src={assetSrc(p.img)} alt={`${p.name} author website homepage`} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                </Link>
                <div className="mt-4 flex justify-between gap-5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><span>{p.meta}</span><span>{String(i + 1).padStart(2, "0")} / 04</span></div>
                <h3 className="mt-2 font-serif text-[27px] md:text-3xl">{p.name}</h3>
                {!("live" in p) && <ProjectRating project={p.slug} />}
                <p className="mt-2 max-w-[460px] text-sm leading-relaxed text-muted-foreground">{p.p}</p>
                <Link to={p.to} className="mt-4 inline-block border-b border-primary pb-1 text-[11px] uppercase tracking-[0.1em] text-primary">View project ↗</Link>
              </article>
            ))}
          </div>
          <div className="mt-14"><Link to="/work" className="inline-flex items-center gap-2 border border-foreground px-6 py-3 text-sm transition-colors hover:bg-foreground hover:text-background">See more case studies <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      {/* Difference */}
      <section id="difference" data-scene className="scene scroll-mt-20 px-5 py-24 sm:px-[7vw] md:py-32">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 md:grid-cols-2 md:gap-[8vw]">
          <div>
            <Eyebrow>Why TheHeroes</Eyebrow>
            <h2 className="display reveal mt-4 font-serif text-[clamp(40px,5.7vw,78px)]">Not just a good-looking site. <em className="text-primary">A reason for readers to stay.</em></h2>
            <p className="reveal mt-6 max-w-[490px] text-sm leading-loose text-muted-foreground">A lot of author websites stop at introducing the book. We look at the full journey: what a visitor understands, what makes them stay, how they join your audience and where that relationship can lead. Design matters. So does what the design helps people do.</p>
            <a href="#review" className="reveal mt-6 inline-block border-b border-foreground pb-1 text-sm">See what your site could improve ↗</a>
          </div>
          <div data-depth="0.18" data-fx="zoom" className="reveal"><div className="h-[390px] overflow-hidden border md:h-[600px]"><img src={assetSrc(authorStudy)} alt="An author at his desk in a private library, pen in hand over an open notebook" decoding="async" className="h-full w-full object-cover object-center" /></div></div>
        </div>
      </section>

      {/* Reader journey */}
      <section id="journey" data-scene className="scene scroll-mt-20 px-5 py-24 sm:px-[7vw] md:py-36">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><Eyebrow>The reader journey</Eyebrow><h2 className="display reveal mt-4 max-w-[760px] font-serif text-[clamp(42px,6vw,82px)]">From discovering your work to taking the next step.</h2></div>
            <p className="reveal max-w-[290px] text-sm leading-relaxed text-muted-foreground">A book creates the first connection. A thoughtful digital experience gives that connection somewhere to go.</p>
          </div>
          <div data-journey className="relative isolate grid gap-10 md:grid-cols-[1.12fr_.88fr] md:gap-x-[8%] md:gap-y-16">
            <svg className="journey-route pointer-events-none absolute inset-0 -z-0 hidden h-full w-full overflow-visible md:block" viewBox="0 0 1000 1150" preserveAspectRatio="none" aria-hidden="true">
              <path className="route-underlay" d={ROUTE} />
              <path className="route-line" id="journeyRoutePath" d={ROUTE} />
              <g id="journeyPlane" transform="translate(280 210)"><path className="plane-shape" d="M-18 -10 L20 0 L-18 12 L-9 1 Z" /><path className="plane-fold" d="M-9 1 L20 0 M-9 1 L-3 8" /></g>
            </svg>
            {journey.map((j) => (
              <article key={j.n} className={`reveal relative z-[1] min-w-0 ${j.cls}`}>
                <div className={`w-full overflow-hidden border ${j.photo}`}><img src={assetSrc(j.img)} alt={j.note} loading="lazy" decoding="async" className="h-full w-full object-cover object-center" /></div>
                <div className="mb-3 mt-5 flex items-center gap-3">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-primary">{j.n}</span>
                  <span className="h-px w-8 bg-primary/60" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{j.label}</span>
                </div>
                <h3 className="font-serif text-[clamp(27px,3vw,39px)] leading-tight tracking-tight">{j.h}</h3>
                <p className="mt-2 max-w-[370px] text-sm leading-relaxed text-muted-foreground">{j.p}</p>
              </article>
            ))}
          </div>
          <div className="mt-20 flex flex-col justify-between gap-3 border-t border-foreground/20 pt-5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:flex-row">
            <span>One connected experience, from first impression to action.</span>
            <Link to="/services" className="font-semibold text-primary">Built around your expertise ↗</Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" data-scene className="scene scroll-mt-20 px-5 py-24 sm:px-[7vw] md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-[8vw]">
          <div>
            <Eyebrow>A clear starting point</Eyebrow>
            <h2 className="display reveal mt-4 font-serif text-[clamp(40px,5.5vw,76px)]">Find out what your site is costing you.</h2>
            <p className="reveal mt-5 max-w-[330px] text-sm leading-loose text-muted-foreground">Start with a free author site review. No pressure, no vague advice. Just a practical look at what could work harder.</p>
          </div>
          <ol className="border-t border-foreground/20">
            {checks.map((c, i) => (
              <li key={c.h} style={{ ["--i" as string]: i }} className="reveal grid grid-cols-[44px_1fr] gap-5 border-b border-foreground/20 py-6 md:grid-cols-[55px_1fr]">
                <span className="font-serif text-lg text-primary">0{i + 1}</span>
                <div><h3 className="font-serif text-2xl">{c.h}</h3><p className="mt-1.5 max-w-[500px] text-sm leading-relaxed text-muted-foreground">{c.p}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Credibility: spaces reserved for verified author reviews only */}
      <section id="voices" data-scene className="scene scroll-mt-20 bg-secondary px-5 py-24 sm:px-[7vw] md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Eyebrow>In authors' words</Eyebrow>
          <h2 className="reveal mt-4 max-w-[820px] font-serif text-4xl md:text-6xl">Reviews from our author community.</h2>
          <ApprovedReviews />
        </div>
      </section>

      {/* Review CTA with the working form */}
      <section id="review" data-scene className="scene scroll-mt-20 bg-pitch px-5 py-24 text-pitch-foreground sm:px-[7vw] md:py-32">
        <div className="mx-auto grid max-w-[1320px] items-start gap-12 md:grid-cols-[1.1fr_.9fr] md:gap-[6vw]">
          <div>
            <Eyebrow dark>Your next chapter starts here</Eyebrow>
            <h2 data-fx="mask" className="display reveal mt-4 font-serif text-[clamp(44px,7vw,100px)]">Make more of the attention your book earns.</h2>
            <p className="reveal mt-6 max-w-[440px] text-sm leading-loose text-pitch-muted">Tell us about your book and your website. We’ll review the experience and send practical notes on your presence, reader connections and next steps.</p>
          </div>
          <div className="reveal bg-background p-6 text-foreground sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Free author site review</p>
            <p className="mb-6 mt-2 text-sm text-muted-foreground">Get a clear view of what's working, what's missing and what to improve next.</p>
            <ReviewForm mode="review" />
          </div>
        </div>
      </section>
      <section className="border-t px-5 py-16 sm:px-[7vw]"><div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-7"><div><h2 className="text-3xl md:text-4xl">What comes next for your work?</h2><p className="mt-3 text-muted-foreground">Let’s discuss the platform, audience and opportunities you want to build.</p></div><Button asChild variant="studio" size="studio"><Link to="/contact">Discuss your project</Link></Button></div></section>
    </div>
  );
}
