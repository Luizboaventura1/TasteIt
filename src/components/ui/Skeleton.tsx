import clsx from "clsx";

interface SkeletonProps {
  className: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return <div className={clsx("bg-neutral-700 rounded-full animate-pulse", className)}></div>;
}
