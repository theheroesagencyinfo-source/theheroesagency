import { useQuery } from "@tanstack/react-query";
import { listApprovedReviews } from "@/lib/project-reviews.functions";

export function ApprovedReviews() {
  const { data: reviews, isPending, isError } = useQuery({ queryKey: ["approved-author-reviews"], queryFn: () => listApprovedReviews(), staleTime: 300000 });
  if (isPending) return <p className="mt-10 text-muted-foreground" role="status">Loading reviews…</p>;
  if (isError) return <p className="mt-10 text-muted-foreground">Reviews are temporarily unavailable.</p>;
  if (!reviews?.length) return <p className="mt-10 max-w-[50ch] border-t pt-6 text-muted-foreground">Author feedback will appear here once approved.</p>;
  return <div className="mt-10 grid gap-6 md:grid-cols-3">{reviews.map(review => <figure key={review.id} className="min-w-0 border-t border-primary py-6"><p aria-label={`${review.rating} out of 5 stars`} className="text-primary">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p><blockquote className="mt-4 break-words font-serif text-2xl leading-snug">“{review.comment}”</blockquote><figcaption className="mt-5 text-sm font-medium text-muted-foreground">{review.name}</figcaption></figure>)}</div>;
}
