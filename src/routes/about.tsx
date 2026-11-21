import { assetSrc } from "@/components/site";
import mouPortrait from "@/assets/mou/burgundy.png.asset.json";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ImagePlaceholder } from "@/components/page";
import { PhotoStack } from "@/components/photo-stack";
import { Button } from "@/components/ui/button";
import { BookOpen, Globe, Users, Compass, PanelsTopLeft, Mail, Megaphone } from "lucide-react";

const title = "About TheHeroes Agency | Digital Growth for Nonfiction Authors";
const description = "Meet TheHeroes Agency, helping nonfiction authors build professional websites, strengthen their author platforms, grow reader relationships and improve their digital presence.";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:image", content: assetSrc(mouPortrait) }, { name: "twitter:image", content: assetSrc(mouPortrait) },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: About,
});

const beliefs = [
  { title: "A book should open doors.", text: "Publishing a book should be the beginning of new conversations, relationships and opportunities.", icon: BookOpen },
  { title: "Your digital presence matters.", text: "Your website and online platforms should reflect the quality of your work and make it easy for people to discover what you offer.", icon: Globe },
  { title: "Readers are more than visitors.", text: "Building an audience means creating meaningful relationships, not simply collecting website traffic or social media followers.", icon: Users },
  { title: "Growth needs a strategy.", text: "Your website, email marketing and promotional activities should work together rather than operate as disconnected services.", icon: Compass },
];
const pillars = [
  { title: "Author platform development", text: "We create professional digital platforms that showcase your books, communicate your expertise and give readers and professional contacts a place to connect with you.", icon: PanelsTopLeft },
  { title: "Audience growth & engagement", text: "We help authors develop direct relationships with their audiences through newsletter integration, email marketing, automated welcome sequences and reader engagement strategies.", icon: Mail },
  { title: "Book visibility & promotion", text: "We develop digital strategies and promotional campaigns that help authors improve their online visibility and create relevant opportunities for their publications.", icon: Megaphone },
];
const approach = [
  ["Understand before we build.", "We take time to understand your work, audience, goals and the opportunities you want to create."],
  ["Build with purpose.", "Every website, email sequence and digital strategy should serve a clear purpose within your wider author platform."],
  ["Communicate clearly.", "We believe in straightforward communication, agreed project timelines and keeping clients informed throughout the process."],
  ["Think beyond launch.", "A website going live is not the end goal. We want to help authors build digital foundations they can continue developing as their work and audience grow."],
];
const Eyebrow = ({ children }: { children: string }) => <p className="text-sm font-semibold text-primary">{children}</p>;

function About() {
  return <>
    <section className="mx-auto max-w-[1500px] px-5 pb-16 pt-16 sm:pt-24">
      <Eyebrow>About TheHeroes Agency</Eyebrow>
      <h1 className="mt-6 max-w-[18ch] text-4xl leading-[1.05] sm:text-7xl">Helping authors build more than books.</h1>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="max-w-[58ch] space-y-5 text-lg text-muted-foreground">
          <p>A great book deserves more than a moment of attention. It deserves a professional platform, an engaged audience and opportunities that continue long after publication.</p>
          <p>At TheHeroes Agency, we help nonfiction authors build their digital presence, connect with readers and create more opportunities around their books, knowledge and expertise.</p>
        </div>
        <div className="max-w-[50ch] md:border-l md:pl-8">
          <p className="font-serif text-2xl leading-snug">We bring together website development, author branding, email marketing and digital growth strategies to help authors turn their work into a stronger professional presence.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="studio" size="studio"><Link to="/services">Explore our services</Link></Button>
            <Button asChild variant="studioOutline" size="studio"><Link to="/pricing" hash="packages">View our packages</Link></Button>
          </div>
        </div>
      </div>
    </section>

    <section className="border-t"><div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-20 md:grid-cols-2 md:items-center">
      <div className="max-w-[60ch]">
        <Eyebrow>Our story</Eyebrow>
        <h2 className="mt-4 text-4xl sm:text-5xl">Built around the work authors do.</h2>
        <div className="mt-8 space-y-5 text-lg text-muted-foreground">
          <p>TheHeroes Agency was built around a simple observation: many talented nonfiction authors invest years developing valuable knowledge and turning it into books, but often lack the digital infrastructure to make the most of their work.</p>
          <p>A reader finishes a book and wants to learn more about the author. A potential client discovers their expertise and wants to get in touch. Someone interested in their next publication wants to stay connected.</p>
          <p>Without a professional online platform, those opportunities can easily be missed.</p>
          <p className="text-foreground">We believe authors deserve a better way to build relationships around their work.</p>
          <p>That's why we focus on helping authors establish professional digital platforms that bring their books, expertise, audience and opportunities together.</p>
        </div>
      </div>
      <ImagePlaceholder portrait label="Author workspace photograph" className="mx-auto max-w-md" />
    </div></section>

    <section className="border-t bg-secondary"><div className="mx-auto max-w-[1500px] px-5 py-20">
      <Eyebrow>Principles</Eyebrow>
      <h2 className="mt-4 text-4xl sm:text-5xl">What we believe.</h2>
      <div className="mt-12 grid gap-px border bg-border sm:grid-cols-2">
        {beliefs.map(({ title, text, icon: Icon }, i) => <div key={title} className="bg-background p-8">
          <div className="flex items-center justify-between"><Icon aria-hidden="true" className="h-6 w-6 text-ring" strokeWidth={1.5} /><span className="font-serif text-xl text-muted-foreground">0{i + 1}</span></div>
          <h3 className="mt-6 text-2xl">{title}</h3><p className="mt-3 max-w-[48ch] text-muted-foreground">{text}</p>
        </div>)}
      </div>
    </div></section>

    <section className="border-t"><div className="mx-auto max-w-[1500px] px-5 py-20">
      <Eyebrow>What we help authors build</Eyebrow>
      <h2 className="mt-4 max-w-[22ch] text-4xl sm:text-5xl">Three areas. One connected author platform.</h2>
      <p className="mt-5 max-w-[60ch] text-lg text-muted-foreground">We combine three complementary areas of digital expertise to help authors build a stronger professional presence.</p>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {pillars.map(({ title, text, icon: Icon }) => <div key={title} className="border-t-2 border-primary pt-6">
          <Icon aria-hidden="true" className="h-7 w-7 text-primary" strokeWidth={1.5} />
          <h3 className="mt-5 text-2xl">{title}</h3><p className="mt-3 text-muted-foreground">{text}</p>
        </div>)}
      </div>
      <Button asChild variant="studioOutline" size="studio" className="mt-10"><Link to="/services">Explore our services</Link></Button>
    </div></section>

    <section className="border-t bg-secondary"><div className="mx-auto max-w-[1500px] px-5 py-20">
      <Eyebrow>Our approach</Eyebrow>
      <h2 className="mt-4 max-w-[22ch] text-4xl sm:text-5xl">Thoughtful strategy. Practical execution.</h2>
      <ol className="mt-12 grid gap-10 md:grid-cols-4">
        {approach.map(([t, d], i) => <li key={t} className="border-t pt-5"><span className="font-serif text-4xl text-ring">0{i + 1}</span><h3 className="mt-4 text-xl">{t}</h3><p className="mt-3 text-muted-foreground">{d}</p></li>)}
      </ol>
    </div></section>

    <section className="border-t"><div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-20 md:grid-cols-[1fr_1.3fr] md:items-center">
      <div className="w-full"><PhotoStack /></div>
      <div className="max-w-[60ch]">
        <Eyebrow>Meet the founder</Eyebrow>
        <h2 className="mt-4 text-4xl sm:text-5xl">Mou Barrac</h2>
        <div className="mt-8 space-y-5 text-lg text-muted-foreground">
          <p>TheHeroes Agency is founded by Mou Barrac, a digital professional with a background in website design, email marketing automation and digital creative development.</p>
          <p>Through TheHeroes Agency, Mou brings these capabilities together to help nonfiction authors build stronger online platforms and create meaningful connections with their readers.</p>
          <p>His approach combines thoughtful design, practical technology and a clear understanding of how digital platforms can support an author's professional goals.</p>
          <p className="font-serif text-2xl text-foreground">At TheHeroes Agency, the focus is simple: helping authors make more of the work they've already put into the world.</p>
        </div>
      </div>
    </div></section>

    <section className="border-t bg-secondary"><div className="mx-auto max-w-[1500px] px-5 py-20">
      <h2 className="max-w-[20ch] text-4xl sm:text-5xl">Let's build something around your work.</h2>
      <div className="mt-6 max-w-[60ch] space-y-4 text-lg text-muted-foreground">
        <p>Your book is an important achievement. The platform behind it can help create what comes next.</p>
        <p>Whether you're preparing to establish your online presence, strengthen your existing platform or build better relationships with your readers, we're ready to explore what's possible.</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="studio" size="studio"><Link to="/contact">Discuss your project</Link></Button>
        <Button asChild variant="studioOutline" size="studio"><Link to="/contact" hash="review">Request a free website review</Link></Button>
      </div>
    </div></section>
  </>;
}
