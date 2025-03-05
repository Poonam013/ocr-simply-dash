
"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BackgroundPaths({
  className,
  pathClassName,
  backgroundClassName,
  ellipseClassName,
}: {
  className?: string;
  pathClassName?: string;
  backgroundClassName?: string;
  ellipseClassName?: string;
}) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const patternPath = `M${mousePosition.x * 0.1} ${
    mousePosition.y * 0.1
  } Q${mousePosition.x * 0.15} ${mousePosition.y * 0.15} ${
    mousePosition.x * 0.2
  } ${mousePosition.y * 0.08} T${mousePosition.x * 0.2} ${
    mousePosition.y * 0.1
  } L${mousePosition.x * 0.1} ${mousePosition.y * 0.1}`;

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center -z-10 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background",
          backgroundClassName
        )}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={patternPath}
          className={cn(
            "fill-foreground/5 stroke-foreground/10 stroke-[0.2]",
            pathClassName
          )}
        />
      </svg>
      <div
        className={cn(
          "absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(var(--primary-rgb),0.1),transparent)]",
          ellipseClassName
        )}
      />
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
        )}
      />
    </div>
  );
}
