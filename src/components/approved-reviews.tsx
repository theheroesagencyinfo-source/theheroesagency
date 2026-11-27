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

const suppliedReviews = [
  { id: "daniel-foster", name: "Daniel Foster", location: "United Kingdom", date: "January 22, 2026", comment: "I had been putting off updating my author website for quite some time, so I'm glad I reached out to TheHeroes Agency. They understood what I was looking for and made some really useful suggestions. The communication was good, and I was happy with how everything came together." },
  { id: "megan-walsh", name: "Megan Walsh", location: "United States", date: "March 17, 2026", comment: "What I liked most was that they actually took the time to understand my project instead of just offering a standard service. They were helpful, patient with my questions, and open to feedback. Overall, a very positive experience." },
  { id: "chloe-martin", name: "Chloe Martin", location: "Canada", date: "June 8, 2026", comment: "I wanted to improve how I presented my books online and needed some direction. TheHeroes Agency helped me organise my ideas and gave my author brand a much more professional feel. I'm pleased with the experience and would recommend giving them a try." },
  { id: "nathan-brooks", name: "Nathan Brooks", location: "Australia", date: "September 14, 2026", comment: "Really appreciated the work and communication throughout the project. Everything was explained clearly, and I never felt like my questions were a bother. They were receptive to feedback and made the process much easier than I expected." },
  { id: "lauren-hayes", name: "Lauren Hayes", location: "United States", date: "November 19, 2026", comment: "I was looking for more than just someone to design a website. I wanted help making my online presence feel consistent and professional. The team was easy to work with, came up with some thoughtful ideas, and understood the direction I wanted to take. Definitely a good experience." },
  { id: "sophie-reynolds", name: "Sophie Reynolds", location: "United Kingdom", date: "October 6, 2026", comment: "I reached out to TheHeroes Agency because I needed help getting my work noticed online. They were friendly, easy to communicate with, and offered ideas that actually made sense for my goals. I appreciated that they did not make unrealistic promises and took the time to understand what I needed. A genuinely good experience." },
];


export function ApprovedReviews() {
  const { data: reviews } = useSuspenseQuery(approvedReviewsQuery);
  const databaseReviews = reviews.map(review => ({
    id: review.id,
    name: review.name,
    location: "",
    date: "",
    comment: review.comment,
  }));
  const displayReviews = [...suppliedReviews, ...databaseReviews].slice(0, 6);

  return (
    <div className="mt-10 overflow-hidden rounded-lg border border-[#dce5e0] bg-white text-[#17251f] shadow-sm">
      <div className="flex flex-col gap-5 border-b border-[#e5ebe7] bg-[#f7faf8] p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-sm bg-[#00a878] px-3 py-1.5 text-xs font-bold tracking-wide text-white">
            <span aria-hidden className="text-base leading-none">★</span>
            THEHEROES AGENCY
          </div>
          <h3 className="mt-4 font-serif text-3xl sm:text-4xl">What our clients say</h3>
          <p className="mt-2 text-sm text-[#52635a]">Experiences shared by authors and clients.</p>
        </div>
        <div className="flex items-center gap-3 rounded-md border border-[#dce5e0] bg-white px-4 py-3 sm:min-w-[150px] sm:justify-center">
          <span className="font-serif text-3xl tabular-nums">{displayReviews.length}</span>
          <span className="text-sm leading-tight text-[#52635a]">{displayReviews.length === 1 ? "client review" : "client reviews"} / shared</span>
        </div>
      </div>
      <div className="grid gap-px bg-[#e5ebe7] sm:grid-cols-2 lg:grid-cols-3">
        {displayReviews.map(review => (
          <article key={review.id} className="flex min-w-0 flex-col bg-white p-6 transition-colors hover:bg-[#fbfdfc] sm:p-7">
            <div className="mb-4 flex items-center gap-2 text-[#00a878]">
              <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center rounded-sm bg-[#00a878] text-sm text-white">“</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#718078]">Client review</span>
            </div>
            <p className="flex-1 break-words text-sm leading-relaxed text-[#34443b]">“{review.comment}”</p>
            <div className="mt-6 border-t border-[#e5ebe7] pt-4">
              <p className="text-sm font-semibold">{review.name}</p>
              {(review.location || review.date) && (
                <p className="mt-1 text-xs text-[#718078]">{[review.location, review.date].filter(Boolean).join(" · ")}</p>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5ebe7] px-6 py-3 text-[10px] tracking-wide text-[#718078] sm:px-8">
        <span>Client feedback shared with TheHeroes Agency</span>
        <span>{displayReviews.length} {displayReviews.length === 1 ? "review" : "reviews"}</span>
      </div>
    </div>
  );
}
