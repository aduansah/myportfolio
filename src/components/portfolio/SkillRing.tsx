"use client";

import type { ToolIconId } from "@/components/portfolio/ToolLogo";
import { ToolLogo } from "@/components/portfolio/ToolLogo";

type SkillRingProps = {
  icon: ToolIconId;
  level: number;
  name: string;
};

export function SkillRing({ icon, level, name }: SkillRingProps) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div className="group flex flex-col items-center gap-3">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke="#F5B041"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 group-hover:stroke-orange"
          />
        </svg>
        <div className="relative flex h-11 w-11 items-center justify-center">
          <ToolLogo icon={icon} className="h-full w-full" />
        </div>
      </div>
      <span className="text-xs text-muted">{name}</span>
    </div>
  );
}
