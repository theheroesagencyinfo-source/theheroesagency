import { createFileRoute } from "@tanstack/react-router";
import { ArticlePage } from "@/components/article-page";
import { aiSearchArticle } from "@/lib/article-content";
import { articleHead } from "@/lib/articles";

export const Route = createFileRoute("/get-found-in-ai-search-authors")({
  staticData: { sitemap: true },
  head: () => articleHead(aiSearchArticle),
  component: AiSearchArticle,
});

function AiSearchArticle() {
  return <ArticlePage article={aiSearchArticle} />;
}
