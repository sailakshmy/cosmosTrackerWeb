interface CardProps {
  title: string;
  subtitle: string;
  description?: string;
  className?: string;
}

const Card = ({ title, subtitle, description, className = "" }: CardProps) => {
  return (
    <article
      className={`h-full w-full min-w-0 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-colors sm:rounded-2xl sm:p-6 dark:border-slate-800 dark:bg-cosmos-panel ${className}`}
    >
      <div className="flex h-full min-w-0 flex-col items-center justify-center gap-3">
        <p className="m-0 text-base font-semibold leading-6 text-cosmos-comet dark:text-cosmos-aurora">
          {subtitle}
        </p>
        <h2 className="m-0 max-w-full break-words text-xl font-bold leading-7 text-cosmos-ink [overflow-wrap:anywhere] sm:text-2xl sm:leading-8 dark:text-cosmos-frost">
          {title}
        </h2>

        <p className="m-0 max-w-full break-words text-sm font-normal leading-6 text-slate-700 [overflow-wrap:anywhere] sm:text-base sm:leading-7 dark:text-slate-300">
          {description}
        </p>
      </div>
    </article>
  );
};

export default Card;
