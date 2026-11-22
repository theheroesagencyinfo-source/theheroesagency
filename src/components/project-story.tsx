import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { listProjectReviews, submitProjectReview, reviewProjects } from "@/lib/project-reviews.functions";

type ProjectKey = (typeof reviewProjects)[number];

export function Stars({ value, label }: { value: number; label?: string }) {
  return <span role="img" aria-label={label ?? `${value} out of 5 stars`} className="text-lg tracking-widest text-primary">
    {"★★★★★".slice(0, value)}<span className="text-border">{"★★★★★".slice(value)}</span>
  </span>;
}

const headingMap: Record<string, string> = { "The author's goal": "The brief", "What I built": "Work completed", "What we built": "Work completed", Overview: "Design and strategy decisions" };
const headingOrder = ["The brief", "Work completed", "Design and strategy decisions"];

// Every case study reads in the same order, and is clearly labelled as client work or a concept.
export function CaseStudy({ sections, kind }: { sections: { heading: string; body: string }[]; kind: "client" | "concept" }) {
  const mapped = sections.map(s => ({ heading: headingMap[s.heading] ?? s.heading, body: s.body }))
    .sort((a, b) => (headingOrder.indexOf(a.heading) + 99) % 99 - (headingOrder.indexOf(b.heading) + 99) % 99);
  const outcome = kind === "client"
    ? "The website is live and open to visit. We only publish performance figures once they have been verified with the author."
    : "This is a concept design showcase created by the studio, not a commissioned client project. No results are claimed.";
  return <>
    <div className="mx-auto max-w-[1500px] px-5 pt-4"><span className="inline-block border border-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{kind === "client" ? "Client project" : "Concept showcase"}</span></div>
    {[...mapped, { heading: "Outcomes", body: outcome }].map((s) => <section key={s.heading} className="border-t"><Reveal className="mx-auto grid max-w-[1500px] gap-6 px-5 py-12 md:grid-cols-[1fr_1.4fr]">
      <h2 className="text-3xl sm:text-4xl">{s.heading}</h2>
      <p className="max-w-[60ch] text-lg text-muted-foreground">{s.body}</p>
    </Reveal></section>)}
  </>;
}

export function ProjectReviews({ project, author, quote }: { project: ProjectKey; author: string; quote: string }) {
  const [reviews, setReviews] = useState<{ id: string; name: string; rating: number; comment: string }[]>([]);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => { listProjectReviews({ data: { project } }).then(setReviews).catch(() => {}); }, [project]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const r = await submitProjectReview({ data: { project, name, rating, comment } });
      setStatus(r.ok ? "done" : "error");
    } catch { setStatus("error"); }
  }

  return <section className="border-t bg-secondary"><div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 md:grid-cols-2">
    <div>
      <h2 className="text-3xl sm:text-4xl">Author review</h2>
      <figure className="mt-8 border-t pt-6">
        <Stars value={5} />
        <blockquote className="mt-4 font-serif text-2xl leading-snug">“{quote}”</blockquote>
        <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">{author}</figcaption>
      </figure>
      {reviews.length > 0 && <ul className="mt-10 divide-y border-y">{reviews.map((r) => <li key={r.id} className="py-5">
        <Stars value={r.rating} /><p className="mt-2">{r.comment}</p><p className="mt-2 text-sm text-muted-foreground">{r.name}</p>
      </li>)}</ul>}
    </div>
    <div>
      <h2 className="text-3xl sm:text-4xl">Share your thoughts</h2>
      <p className="mt-3 text-muted-foreground">What do you think of this website? Reviews appear after approval.</p>
      {status === "done" ? <p role="status" className="mt-8 border-t pt-6 text-lg">Thank you. Your review will appear once it's approved.</p> :
      <form onSubmit={send} className="mt-8 space-y-5">
        <fieldset><legend className="text-sm font-semibold">Your rating</legend>
          <div className="mt-2 flex gap-1">{[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" aria-label={`${n} star${n > 1 ? "s" : ""}`} aria-pressed={rating === n}
            onClick={() => setRating(n)} className={`text-3xl leading-none ${n <= rating ? "text-primary" : "text-border"}`}>★</button>)}</div>
        </fieldset>
        <label className="block text-sm font-semibold">Name
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required className="mt-2 block w-full rounded-md border border-input bg-card px-3 py-2.5 font-normal" /></label>
        <label className="block text-sm font-semibold">Your thoughts
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={1000} rows={4} required className="mt-2 block w-full rounded-md border border-input bg-card px-3 py-2.5 font-normal" /></label>
        {status === "error" && <p role="alert" className="text-sm text-destructive">Please add your name and thoughts, then try again.</p>}
        <Button type="submit" variant="studio" size="studio" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Submit my review"}</Button>
      </form>}
    </div>
  </div></section>;
}
