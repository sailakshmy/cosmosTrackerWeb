"use client";

import { useId } from "react";

interface TooltipProps {
  message: string;
  ariaLabel?: string;
}

const Tooltip = ({ message, ariaLabel = "More information" }: TooltipProps) => {
  const tooltipId = useId();

  return (
    <span className="group relative inline-flex align-middle">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-describedby={tooltipId}
        className="inline-flex size-5 items-center justify-center rounded-full transition-colors text-cosmos-comet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmos-aurora dark:text-slate-400 dark:hover:text-cosmos-aurora"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="size-4"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" d="M12 11v5" />
          <path strokeLinecap="round" d="M12 8h.01" />
        </svg>
      </button>

      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-64 -translate-x-1/2 rounded-md bg-slate-900 px-3 py-2 text-center text-xs font-medium leading-5 normal-case tracking-normal text-white opacity-100 shadow-lg dark:bg-slate-100 dark:text-slate-900"
      >
        {message}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-100" />
      </span>
    </span>
  );
};

export default Tooltip;
