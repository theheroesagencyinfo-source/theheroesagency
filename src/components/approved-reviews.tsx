import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { listApprovedReviews } from "@/lib/project-reviews.functions";

async function loadReviews() {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      listApprovedReviews(),
      new Promise<Awaited<ReturnType<typeof listApprovedReviews>>>(resolve => {
        timeout = setTimeout(() => resolve([]), 6000);
      }),
    ]);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export const approvedReviewsQuery = queryOptions({ queryKey: ["approved-author-reviews", "live-projects"], queryFn: loadReviews, staleTime: 300000 });

const liveWork = [
  { to: "/projects/adam-courtenay" as const, name: "Adam Courtenay", note: "Author and journalist website, live" },
  { to: "/projects/trey-toler" as const, name: "Trey Toler", note: "Author and speaker website, live" },
  { to: "/projects/sandra-combe" as const, name: "Sandra D. Combe", note: "Book website for Stop the Bypass, live" },
];

function Stars({ value, size = "h-5 w-5" }: { value: number; size?: string }) {
  return <span role="img" aria-label={`Rated ${value} out of 5`} className="inline-flex gap-1">
    {[1, 2, 3, 4, 5].map(n => {
      const fill = Math.max(0, Math.min(1, value - n + 1));
      return <span key={n} aria-hidden className={`relative inline-flex ${size} items-center justify-center overflow-hidden bg-foreground/15`}>
        <span className="absolute inset-y-0 left-0 bg-[#00a878]" style={{ width: `${fill * 100}%` }} />
        <svg viewBox="0 0 24 24" className="relative h-[68%] w-[68%] fill-white"><path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.7l7.1-.6z" /></svg>
      </span>;
    })}
  </span>;
}

const label = (avg: number) => avg >= 4.5 ? "Excellent" : avg >= 3.5 ? "Great" : avg >= 2.5 ? "Average" : "Needs improvement";

export function ApprovedReviews() {
  const { data: reviews } = useSuspenseQuery(approvedReviewsQuery);
  if (!reviews.length) return (
    <div className="mt-10 grid gap-8 border-t border-foreground/20 pt-8 md:grid-cols-[.8fr_1.2fr]">
      <div><h3 className="font-serif text-3xl">Explore the live work.</h3><p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">A closer look at three author platforms: books, speaking, press and reader connections. Visit the case studies and see each website for yourself.</p></div>
      <ul className="divide-y divide-foreground/15 border-y border-foreground/15">
        {liveWork.map(w => <li key={w.to}><Link to={w.to} className="group flex items-baseline justify-between gap-4 py-5 transition-colors hover:text-primary"><span className="font-serif text-2xl">{w.name}</span><span className="text-right text-xs uppercase tracking-[0.12em] text-muted-foreground">{w.note} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">↗</span></span></Link></li>)}
      </ul>
    </div>
  );
  const avg = Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
  return (
    <div className="mt-10 overflow-hidden border border-foreground/10 bg-card shadow-sm">
      <div className="grid gap-6 border-b border-foreground/10 bg-background p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Author project reviews</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="font-serif text-4xl tabular-nums">{avg.toFixed(1)}<span className="ml-1 text-lg text-muted-foreground">/ 5</span></span>
            <Stars value={avg} size="h-6 w-6" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground"> <span className="font-semibold text-foreground">{label(avg)}</span> · Based on {reviews.length} approved {reviews.length === 1 ? "review" : "reviews"}</p>
        </div>
        <div className="md:text-right">
          <p className="text-3xl font-serif tabular-nums">{reviews.length}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">Published reviews</p>
        </div>
      </div>
      <ul tabIndex={0} aria-label="Published author project reviews" className="flex min-w-0 snap-x gap-4 overflow-x-auto p-5 focus-visible:outline-2 focus-visible:outline-ring sm:p-6">
        {reviews.map(r => <li key={r.id} className="w-[min(82vw,340px)] shrink-0 snap-start border border-foreground/10 bg-background p-5 sm:p-6">
          <Stars value={r.rating} />
          <p className="mt-4 break-words text-sm leading-relaxed">{r.comment}</p>
          <div className="mt-6 border-t border-foreground/10 pt-4">
            <p className="text-sm font-semibold">{r.name}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.13em] text-muted-foreground">Approved project review</p>
          </div>
        </li>)}
      </ul>
      <p className="border-t border-foreground/10 px-6 py-3 text-[10px] leading-relaxed text-muted-foreground">Ratings and comments shown here are reviews submitted for TheHeroes Agency projects. This is an independent review display, not a Trustpilot widget.</p>
    </div>
  );
}
