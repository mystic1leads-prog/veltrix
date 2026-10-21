import {
  Activity,
  Brain,
  Dna,
  HeartPulse,
  Moon,
  Sprout,
  Waves,
} from "lucide-react";
import type { Category } from "../types";

const icons = {
  growth: Activity,
  metabolism: Waves,
  recovery: HeartPulse,
  longevity: Dna,
  mind: Brain,
  vitality: Sprout,
  sleep: Moon,
};
export function CategoryIcon({
  name,
  size = 23,
}: {
  name: Category["icon"];
  size?: number;
}) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
