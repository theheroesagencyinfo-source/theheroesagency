import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { listApprovedReviews } from "@/lib/project-reviews.functions";

export const approvedReviewsQuery = queryOptions({ queryKey: ["approved-author-reviews"], queryFn: () => listApprovedReviews(), staleTime: 300000 });

// Verified facts only: these sites are live and visitors can check them.
const liveWork = [
  { to: "/projects/adam-courtenay" as const, name: "Adam Courtenay", note: "Author and journalist website, live" },
  { to: "/projects/trey-toler" as const, name: "Trey Toler", note: "Author and speaker website, live" },
  { to: "/projects/sandra-combe" as const, name: "Sandra D. Combe", note: "Book website for Stop the Bypass, live" },
];

export function ApprovedReviews() {
  const { data: reviews } = useSuspenseQuery(approvedReviewsQuery);
  if (!reviews.length) return (
    <div className="mt-10 grid gap-8 border-t border-foreground/20 pt-8 md:grid-cols-[.8fr_1.2fr]">
      <p className="max-w-[42ch] text-sm leading-relaxed text-muted-foreground">Published author reviews appear here once approved. In the meantime, the work speaks for itself: each of these author websites is live and open to visit.</p>
      <ul className="divide-y divide-foreground/15 border-y border-foreground/15">
        {liveWork.map(w => <li key={w.to}><Link to={w.to} className="group flex items-baseline justify-between gap-4 py-5 transition-colors hover:text-primary"><span className="font-serif text-2xl">{w.name}</span><span className="text-right text-xs uppercase tracking-[0.12em] text-muted-foreground">{w.note} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">↗</span></span></Link></li>)}
      </ul>
    </div>
  );
  return <div className="mt-10 grid gap-6 md:grid-cols-3">{reviews.map(review => <figure key={review.id} className="min-w-0 border-t border-primary py-6"><p aria-label={`${review.rating} out of 5 stars`} className="text-primary">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p><blockquote className="mt-4 break-words font-serif text-2xl leading-snug">“{review.comment}”</blockquote><figcaption className="mt-5 text-sm font-medium text-muted-foreground">{review.name}</figcaption></figure>)}</div>;
}
