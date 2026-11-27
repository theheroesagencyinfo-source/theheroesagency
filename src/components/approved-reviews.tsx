import { useEffect, useRef } from "react";
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

const suppliedReviews = [
  { id: "daniel-foster", name: "Daniel Foster", location: "United Kingdom", date: "January 22, 2026", title: "A helpful website refresh", rating: 5, comment: "I had been putting off updating my author website for quite some time, so I'm glad I reached out to TheHeroes Agency. They understood what I was looking for and made some really useful suggestions. The communication was good, and I was happy with how everything came together." },
  { id: "megan-walsh", name: "Megan Walsh", location: "United States", date: "March 17, 2026", title: "A thoughtful, personal approach", rating: 5, comment: "What I liked most was that they actually took the time to understand my project instead of just offering a standard service. They were helpful, patient with my questions, and open to feedback. Overall, a very positive experience." },
  { id: "chloe-martin", name: "Chloe Martin", location: "Canada", date: "June 8, 2026", title: "A more professional author brand", rating: 5, comment: "I wanted to improve how I presented my books online and needed some direction. TheHeroes Agency helped me organise my ideas and gave my author brand a much more professional feel. I'm pleased with the experience and would recommend giving them a try." },
  { id: "nathan-brooks", name: "Nathan Brooks", location: "Australia", date: "September 14, 2026", title: "Clear communication throughout", rating: 5, comment: "Really appreciated the work and communication throughout the project. Everything was explained clearly, and I never felt like my questions were a bother. They were receptive to feedback and made the process much easier than I expected." },
  { id: "sophie-reynolds", name: "Sophie Reynolds", location: "United Kingdom", date: "October 6, 2026", title: "Ideas that fit my goals", rating: 5, comment: "I reached out to TheHeroes Agency because I needed help getting my work noticed online. They were friendly, easy to communicate with, and offered ideas that actually made sense for my goals. I appreciated that they did not make unrealistic promises and took the time to understand what I needed. A genuinely good experience." },
  { id: "lauren-hayes", name: "Lauren Hayes", location: "United States", date: "November 19, 2026", title: "Support beyond website design", rating: 5, comment: "I was looking for more than just someone to design a website. I wanted help making my online presence feel consistent and professional. The team was easy to work with, came up with some thoughtful ideas, and understood the direction I wanted to take. Definitely a good experience." },
];

function ReviewStars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-[2px]" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} aria-hidden className={`flex h-6 w-6 items-center justify-center bg-[#00b67a] text-[17px] leading-none text-white sm:h-7 sm:w-7`}>★</span>
      ))}
    </div>
  );
}

export function ApprovedReviews() {
  const averageRating = 5;
  const reviewsTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = reviewsTrackRef.current;
    if (!track) return;

    const interval = window.setInterval(() => {
      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return;
      const visibleCards = window.matchMedia("(min-width: 1024px)").matches ? 3 : 1;
      const currentIndex = cards.reduce((index, card, i) =>
        card.offsetLeft <= track.scrollLeft + 8 ? i : index, 0);
      const nextIndex = currentIndex >= cards.length - visibleCards ? 0 : currentIndex + 1;
      track.scrollTo({ left: cards[nextIndex].offsetLeft, behavior: "smooth" });
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="mt-10 text-[#191919]" aria-label="Client reviews">
      <div className="px-0 py-7 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5b6862]">THEHEROES AGENCY · CLIENT FEEDBACK</p>
        <h3 className="mt-2 text-2xl font-bold sm:text-3xl">Excellent</h3>
        <div className="mt-3 flex justify-center">
          <ReviewStars rating={averageRating} />
        </div>
        <p className="mt-2 text-xs text-[#59645f]">Rated 5 out of 5 based on 6 client reviews</p>
      </div>

      <div ref={reviewsTrackRef} className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Reviews carousel">
        {suppliedReviews.map(review => (
          <article key={review.id} className="flex w-full shrink-0 snap-start flex-col border border-[#e4e8e6] bg-white p-5 lg:w-[calc((100%-2rem)/3)]">
            <div className="flex items-start justify-between gap-2">
              <ReviewStars rating={review.rating} />
              <span className="shrink-0 text-[10px] text-[#7a8580]">{review.date}</span>
            </div>
            <p className="mt-3 text-[11px] text-[#77817c]">by {review.name} · {review.location}</p>
            <h4 className="mt-3 text-sm font-bold text-[#202722]">{review.title}</h4>
            <p className="mt-2 flex-1 break-words text-xs leading-[1.65] text-[#424c47]">{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
