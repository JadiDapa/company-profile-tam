"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

import { FadeDirection, fadeVariants } from "@/lib/motion/variants";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
}

export function StaggerGroup({ children, className }: StaggerGroupProps) {
  return <div className={className}>{children}</div>;
}

interface StaggerItemProps {
  children: ReactNode;
  index?: number;
  staggerStep?: number;
  direction?: FadeDirection;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  onClick?: () => void;
}

export function StaggerItem({
  children,
  index = 0,
  staggerStep = 0.12,
  direction = "up",
  duration = 0.45,
  once = true,
  amount = 0.2,
  className,
  onClick,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -80px 0px" }}
      variants={fadeVariants(direction, duration, index * staggerStep)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
