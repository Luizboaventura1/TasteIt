import clsx from "clsx";

/**
 * Skeleton component for loading placeholders.
 *
 * You must define both height and width via the `className` prop
 * to ensure the skeleton displays correctly.
 *
 * Example:
 *   <Skeleton className="w-32 h-6" />
 */
interface SkeletonProps {
  className: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return <div className={clsx("bg-neutral-700 rounded-full animate-pulse", className)}></div>;
}
