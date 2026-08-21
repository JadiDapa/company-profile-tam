"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

import { FadeDirection, fadeVariants } from "@/lib/motion/variants";

const TAGS = {
  div: "div",
  section: "section",
  ul: "ul",
  li: "li",
} as const;

type Tag = keyof typeof TAGS;

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  id?: string;
}

export function StaggerGroup({ children, className, as = "div", id }: StaggerGroupProps) {
  const Tag = TAGS[as];
  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}

const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
} as const;

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
  as?: keyof typeof MOTION_TAGS;
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
  as = "div",
}: StaggerItemProps) {
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -80px 0px" }}
      variants={fadeVariants(direction, duration, index * staggerStep)}
      onClick={onClick}
    >
      {children}
    </MotionTag>
  );
}
