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

const suppliedReviews = [
  { id: "daniel-foster", name: "Daniel Foster", location: "United Kingdom", date: "January 22, 2026", comment: "I had been putting off updating my author website for quite some time, so I'm glad I reached out to TheHeroes Agency. They understood what I was looking for and made some really useful suggestions. The communication was good, and I was happy with how everything came together." },
  { id: "megan-walsh", name: "Megan Walsh", location: "United States", date: "March 17, 2026", comment: "What I liked most was that they actually took the time to understand my project instead of just offering a standard service. They were helpful, patient with my questions, and open to feedback. Overall, a very positive experience." },
  { id: "chloe-martin", name: "Chloe Martin", location: "Canada", date: "June 8, 2026", comment: "I wanted to improve how I presented my books online and needed some direction. TheHeroes Agency helped me organise my ideas and gave my author brand a much more professional feel. I'm pleased with the experience and would recommend giving them a try." },
  { id: "nathan-brooks", name: "Nathan Brooks", location: "Australia", date: "September 14, 2026", comment: "Really appreciated the work and communication throughout the project. Everything was explained clearly, and I never felt like my questions were a bother. They were receptive to feedback and made the process much easier than I expected." },
  { id: "lauren-hayes", name: "Lauren Hayes", location: "United States", date: "November 19, 2026", comment: "I was looking for more than just someone to design a website. I wanted help making my online presence feel consistent and professional. The team was easy to work with, came up with some thoughtful ideas, and understood the direction I wanted to take. Definitely a good experience." },
];


export function ApprovedReviews() {
  const { data: reviews } = useSuspenseQuery(approvedReviewsQuery);
  const displayReviews = reviews.length > 0
    ? reviews.slice(0, 5).map(review => ({
        id: review.id,
        name: review.name,
        location: "",
        date: "",
        comment: review.comment,
      }))
    : suppliedReviews;

  return (
    <div className="mt-10 overflow-hidden rounded-sm border border-[#dce5e0] bg-white text-[#17251f] shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#e5ebe7] p-6 sm:p-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#52635a]">THEHEROES AGENCY</p>
          <h3 className="mt-2 font-serif text-3xl sm:text-4xl">Client reviews</h3>
          <p className="mt-2 text-sm text-[#52635a]">Feedback from authors we've worked with.</p>
        </div>
        <div className="sm:text-right">
          <p className="font-serif text-3xl tabular-nums">{displayReviews.length} <span className="text-base text-[#718078]">{displayReviews.length === 1 ? "review" : "reviews"}</span></p>
          <p className="mt-1 text-sm text-[#52635a]">Client feedback</p>
        </div>
      </div>

      <div className="grid gap-px bg-[#e5ebe7] sm:grid-cols-2 lg:grid-cols-3">
        {displayReviews.map(review => (
          <article key={review.id} className="flex min-w-0 flex-col bg-white p-6 sm:p-7">
            <p className="flex-1 break-words text-sm leading-relaxed text-[#34443b]">“{review.comment}”</p>
            <div className="mt-6 border-t border-[#e5ebe7] pt-4">
              <p className="text-sm font-semibold">{review.name}</p>
              {(review.location || review.date) && (
                <p className="mt-1 text-xs text-[#718078]">{[review.location, review.date].filter(Boolean).join(" · ")}</p>
              )}
              <p className="mt-2 text-[10px] uppercase tracking-[0.13em] text-[#718078]">Client feedback</p>
            </div>
          </article>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5ebe7] px-6 py-3 text-[10px] tracking-wide text-[#718078] sm:px-8">
        <span>Client feedback shared with TheHeroes Agency</span>
        <span>{displayReviews.length} published {displayReviews.length === 1 ? "review" : "reviews"}</span>
      </div>
    </div>
  );
}
