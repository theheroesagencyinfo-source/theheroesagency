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
      return <span key={n} aria-hidden className={`relative inline-flex ${size} items-center justify-center overflow-hidden rounded-[2px] bg-[#d9e8e2]`}>
        <span className="absolute inset-y-0 left-0 bg-[#00a878]" style={{ width: `${fill * 100}%` }} />
        <svg viewBox="0 0 24 24" className="relative h-[68%] w-[68%] fill-white"><path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.7l7.1-.6z" /></svg>
      </span>;
    })}
  </span>;
}

const ratingLabel = (avg: number) => avg >= 4.5 ? "Excellent" : avg >= 3.5 ? "Great" : avg >= 2.5 ? "Average" : "Needs improvement";

export function ApprovedReviews() {
  const { data: reviews } = useSuspenseQuery(approvedReviewsQuery);
  const hasReviews = reviews.length > 0;
  const avg = hasReviews
    ? Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) * 10) / 10
    : null;

  return (
    <div className="mt-10 overflow-hidden rounded-sm border border-[#dce5e0] bg-white text-[#17251f] shadow-sm">
      <div className="flex flex-col gap-6 border-b border-[#e5ebe7] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#52635a]">THEHEROES AGENCY</p>
          <h3 className="mt-2 font-serif text-3xl sm:text-4xl">Client reviews</h3>
          <p className="mt-2 text-sm text-[#52635a]">Feedback from authors we've worked with.</p>
        </div>
        <div className="min-w-[220px] md:text-right">
          {hasReviews ? (
            <>
              <div className="flex items-center gap-3 md:justify-end">
                <span className="font-serif text-4xl tabular-nums">{avg!.toFixed(1)}<span className="ml-1 text-base text-[#718078]">/ 5</span></span>
                <Stars value={avg!} size="h-6 w-6" />
              </div>
              <p className="mt-2 text-sm text-[#52635a]"><strong className="text-[#17251f]">{ratingLabel(avg!)}</strong> · Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}</p>
            </>
          ) : (
            <>
              <p className="font-serif text-2xl">Reviews coming soon</p>
              <p className="mt-2 text-sm text-[#52635a]">No published reviews yet.</p>
            </>
          )}
        </div>
      </div>

      {hasReviews ? (
        <div className="grid gap-px bg-[#e5ebe7] sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map(review => (
            <article key={review.id} className="flex min-w-0 flex-col bg-white p-6 sm:p-7">
              <Stars value={review.rating} />
              <p className="mt-5 flex-1 break-words text-sm leading-relaxed text-[#34443b]">{review.comment}</p>
              <div className="mt-6 border-t border-[#e5ebe7] pt-4">
                <p className="text-sm font-semibold">{review.name}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.13em] text-[#718078]">Approved project feedback</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid gap-8 border-t border-[#e5ebe7] bg-[#f7faf8] p-6 sm:p-8 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-sm leading-relaxed text-[#52635a]">We're building this collection with genuine feedback from authors. In the meantime, explore some of the live websites we've created.</p>
          </div>
          <ul className="divide-y divide-[#dce5e0] border-y border-[#dce5e0]">
            {liveWork.map(work => (
              <li key={work.to}>
                <Link to={work.to} className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-[#008b63]">
                  <span className="font-serif text-xl sm:text-2xl">{work.name}</span>
                  <span className="text-right text-[10px] uppercase tracking-[0.1em] text-[#718078]">{work.note} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">↗</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5ebe7] px-6 py-3 text-[10px] tracking-wide text-[#718078] sm:px-8">
        <span>Independent reviews shared by TheHeroes Agency clients</span>
        <span>{hasReviews ? `${reviews.length} published ${reviews.length === 1 ? "review" : "reviews"}` : "Awaiting first published review"}</span>
      </div>
    </div>
  );
}
