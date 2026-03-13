import { SportID } from "@/data/sportConfig";
import sportConfigs from "@/data/sportConfig";

interface SportBadgeProps {
  sportId: SportID;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

/**
 * Reusable sport badge component that displays a sport with themed colors
 * @param sportId - The ID of the sport to display (swimming, futsal, pickleball, tableTennis)
 * @param size - Badge size: "sm" (default), "md", or "lg"
 * @param showIcon - Whether to show the sport icon (default: false)
 * @param className - Additional CSS classes to apply
 */
export function SportBadge({ sportId, size = "sm", showIcon = false, className = "" }: SportBadgeProps) {
  const config = sportConfigs[sportId];
  
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold border ${config.classes.accentBg} ${config.classes.accentText} ${config.classes.accentBorder} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && <Icon size={size === "sm" ? 12 : size === "md" ? 14 : 16} />}
      {config.label}
    </span>
  );
}

interface SportBadgeListProps {
  sports: SportID[];
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  emptyText?: string;
  className?: string;
}

/**
 * Displays a list of sport badges with proper wrapping
 * @param sports - Array of sport IDs to display
 * @param size - Badge size: "sm" (default), "md", or "lg"
 * @param showIcon - Whether to show sport icons (default: false)
 * @param emptyText - Text to show when sports array is empty (default: "—")
 * @param className - Additional CSS classes for the container
 */
export function SportBadgeList({ 
  sports, 
  size = "sm", 
  showIcon = false, 
  emptyText = "—",
  className = ""
}: SportBadgeListProps) {
  if (!sports || sports.length === 0) {
    return <span className="text-white/40 text-sm">{emptyText}</span>;
  }

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {sports.map((sportId) => (
        <SportBadge key={sportId} sportId={sportId} size={size} showIcon={showIcon} />
      ))}
    </div>
  );
}
