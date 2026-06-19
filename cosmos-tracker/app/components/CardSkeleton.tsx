interface CardSkeletonProps {
  className?: string;
}

const CardSkeleton = ({ className = "" }: CardSkeletonProps) => (
  <article
    className={`cosmos-card-skeleton ${className}`}
    aria-hidden="true"
  >
    <div className="cosmos-card-skeleton-content">
      <span className="cosmos-card-skeleton-line cosmos-card-skeleton-subtitle" />
      <span className="cosmos-card-skeleton-line cosmos-card-skeleton-title" />
      <span className="cosmos-card-skeleton-line cosmos-card-skeleton-copy" />
      <span className="cosmos-card-skeleton-line cosmos-card-skeleton-copy-short" />
    </div>
  </article>
);

export default CardSkeleton;
