import { ReactNode } from "react";
import { Waves, Activity } from "lucide-react";

export type SportID = "swimming" | "futsal" | "pickleball" | "tableTennis";

export interface SportConfig {
  id: SportID;
  label: string;
  icon: (props: { size?: number; className?: string }) => ReactNode;
  /** tailwind classes for map of styling across components */
  classes: {
    accentBg: string;        // e.g. bg-cyan-500/10
    accentText: string;      // e.g. text-cyan-400
    accentBorder: string;    // e.g. border-cyan-500/20
    gradient: string;        // e.g. from-cyan-500 to-cyan-300
    badge: string;           // e.g. px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20
    tile?: string;           // optional extra tile color
  };
  sessionLabels: {
    location: string; // e.g. "Pool" or "Court"
    field?: string;   // e.g. "Lane" or "Turf" or "Table"
  };
  traineeLabel: string;      // e.g. "swimmers" / "players"
  performanceMetrics: string[];
}

const configs: Record<SportID, SportConfig> = {
  swimming: {
    id: "swimming",
    label: "Swimming",
    icon: (props) => <Waves {...props} />, // waves icon
    classes: {
      accentBg: "bg-cyan-500/10",
      accentText: "text-cyan-400",
      accentBorder: "border-cyan-500/20",
      gradient: "from-cyan-500 to-cyan-300",
      badge: "px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    },
    sessionLabels: { location: "Pool", field: "Lane" },
    traineeLabel: "swimmers",
    performanceMetrics: [
      "lap time",
      "stroke",
      "stamina",
      "breathing",
      "consistency",
      "technique",
    ],
  },
  futsal: {
    id: "futsal",
    label: "Futsal",
    // using generic activity icon for futsal (no soccer/football icon available)
    icon: (props) => <Activity {...props} />, 
    classes: {
      accentBg: "bg-emerald-500/10",
      accentText: "text-emerald-400",
      accentBorder: "border-emerald-500/20",
      gradient: "from-emerald-500 to-emerald-300",
      badge: "px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    },
    sessionLabels: { location: "Court", field: "Turf" },
    traineeLabel: "players",
    performanceMetrics: [
      "stamina",
      "speed",
      "ball control",
      "passing",
      "positioning",
      "teamwork",
    ],
  },
  pickleball: {
    id: "pickleball",
    label: "Pickleball",
    // no tennis-specific icon available; using generic activity
    icon: (props) => <Activity {...props} />,
    classes: {
      accentBg: "bg-teal-500/10",
      accentText: "text-teal-400",
      accentBorder: "border-teal-500/20",
      gradient: "from-teal-500 to-teal-300",
      badge: "px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20",
    },
    sessionLabels: { location: "Court" },
    traineeLabel: "players",
    performanceMetrics: [
      "serve consistency",
      "dink control",
      "rally stability",
      "footwork",
      "court awareness",
    ],
  },
  tableTennis: {
    id: "tableTennis",
    label: "Table Tennis",
    icon: (props) => <Activity {...props} />, // generic ping-pong-style
    classes: {
      accentBg: "bg-amber-500/10",
      accentText: "text-amber-400",
      accentBorder: "border-amber-500/20",
      gradient: "from-amber-500 to-amber-300",
      badge: "px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20",
    },
    sessionLabels: { location: "Table" },
    traineeLabel: "players",
    performanceMetrics: [
      "reflexes",
      "serve quality",
      "spin control",
      "rally consistency",
      "footwork",
      "shot precision",
    ],
  },
};

export function getSportConfig(id: SportID): SportConfig {
  return configs[id];
}

export function getAllSportConfigs(): SportConfig[] {
  return Object.values(configs);
}

export const SPORT_IDS: SportID[] = Object.keys(configs) as SportID[];

export default configs;
