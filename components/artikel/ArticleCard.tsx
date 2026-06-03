import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="article-card">
      <div className="article-img" style={{ background: "var(--bg-page)" }}>
        {article.emoji}
      </div>
      <div className="article-content">
        <span
          className="badge-cat"
          style={{ background: article.categoryBg, color: article.categoryColor }}
        >
          {article.category}
        </span>
        <div className="article-title">{article.title}</div>
        <div className="article-excerpt">{article.excerpt}</div>
        <div className="article-footer">
          <span className="article-date">{article.date}</span>
          <span className="read-time">
            <i className="bi bi-clock" /> {article.readTime} mnt
          </span>
        </div>
      </div>
    </div>
  );
}
