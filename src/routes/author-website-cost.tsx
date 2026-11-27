import { createFileRoute } from "@tanstack/react-router";
import { ArticlePage } from "@/components/article-page";
import { costArticle } from "@/lib/article-content";
import { articleHead } from "@/lib/articles";

export const Route = createFileRoute("/author-website-cost")({
  staticData: { sitemap: true },
  head: () => articleHead(costArticle),
  component: CostArticle,
});

function CostArticle() {
  return <ArticlePage article={costArticle} />;
}
