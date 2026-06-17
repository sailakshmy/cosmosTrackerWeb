interface CardProps {
  title: string;
  subtitle: string;
  description?: string;
  className?: string;
}

const Card = ({ title, subtitle, description, className = "" }: CardProps) => {
  return (
    <article
      className={`w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-cosmos-panel ${className}`}
    >
      <div className="flex flex-col gap-3">
        <p className="m-0 text-base font-semibold leading-6 text-cosmos-comet dark:text-cosmos-aurora">
          {subtitle}
        </p>
        <h2 className="m-0 text-2xl font-bold leading-8 text-cosmos-ink dark:text-cosmos-frost">
          {title}
        </h2>

        <p className="m-0 text-base font-normal leading-7 text-slate-700 dark:text-slate-300">
          {description}
        </p>
      </div>
    </article>
  );
};

export default Card;
