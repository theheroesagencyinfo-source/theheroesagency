import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { listApprovedReviews } from "@/lib/project-reviews.functions";

export const approvedReviewsQuery = queryOptions({ queryKey: ["approved-author-reviews"], queryFn: () => listApprovedReviews(), staleTime: 300000 });

const liveWork = [
  { to: "/projects/adam-courtenay" as const, name: "Adam Courtenay", note: "Author and journalist website, live" },
  { to: "/projects/trey-toler" as const, name: "Trey Toler", note: "Author and speaker website, live" },
  { to: "/projects/sandra-combe" as const, name: "Sandra D. Combe", note: "Book website for Stop the Bypass, live" },
];

function Stars({ value, size = "h-6 w-6" }: { value: number; size?: string }) {
  return <span role="img" aria-label={`Rated ${value} out of 5`} className="inline-flex gap-[3px]">
    {[1, 2, 3, 4, 5].map(n => {
      const fill = Math.max(0, Math.min(1, value - n + 1));
      return <span key={n} aria-hidden className={`relative inline-flex ${size} items-center justify-center overflow-hidden bg-muted-foreground/25`}>
        <span className="absolute inset-y-0 left-0 bg-rating" style={{ width: `${fill * 100}%` }} />
        <svg viewBox="0 0 24 24" className="relative h-[70%] w-[70%] fill-rating-foreground"><path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.7l7.1-.6z" /></svg>
      </span>;
    })}
  </span>;
}

const label = (avg: number) => avg >= 4.5 ? "Excellent" : avg >= 3.5 ? "Great" : avg >= 2.5 ? "Average" : "Poor";

export function ApprovedReviews() {
  const { data: reviews } = useSuspenseQuery(approvedReviewsQuery);
  if (!reviews.length) return (
    <div className="mt-10 grid gap-8 border-t border-foreground/20 pt-8 md:grid-cols-[.8fr_1.2fr]">
      <div><Stars value={0} /><p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">No published reviews yet. Approved author reviews appear here. In the meantime, each of these author websites is live and open to visit.</p></div>
      <ul className="divide-y divide-foreground/15 border-y border-foreground/15">
        {liveWork.map(w => <li key={w.to}><Link to={w.to} className="group flex items-baseline justify-between gap-4 py-5 transition-colors hover:text-primary"><span className="font-serif text-2xl">{w.name}</span><span className="text-right text-xs uppercase tracking-[0.12em] text-muted-foreground">{w.note} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">↗</span></span></Link></li>)}
      </ul>
    </div>
  );
  const avg = Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
  return (
    <div className="mt-10 grid gap-8 border-t border-foreground/20 pt-8 lg:grid-cols-[260px_1fr]">
      <div className="text-center lg:text-left">
        <p className="text-2xl font-semibold">{label(avg)}</p>
        <div className="mt-2"><Stars value={avg} size="h-8 w-8" /></div>
        <p className="mt-3 text-sm text-muted-foreground">Based on <span className="font-semibold text-foreground underline underline-offset-2">{reviews.length} approved {reviews.length === 1 ? "review" : "reviews"}</span></p>
        <p className="mt-1 text-xs text-muted-foreground">Rated {avg} / 5 on our case study pages</p>
      </div>
      <ul className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-3 lg:mx-0 lg:px-0">
        {reviews.map(r => <li key={r.id} className="w-[78vw] max-w-[300px] shrink-0 snap-start border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3"><Stars value={r.rating} size="h-5 w-5" /><span className="text-[11px] text-muted-foreground">✓ Approved</span></div>
          <p className="mt-4 line-clamp-5 break-words text-sm leading-relaxed">{r.comment}</p>
          <p className="mt-4 text-sm font-semibold">{r.name}</p>
        </li>)}
      </ul>
    </div>
  );
}
