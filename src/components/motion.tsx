import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Shared, restrained entrance motion. Turns off for visitors who prefer reduced motion.
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

// Gentle hover lift for cards.
export function LiftCard({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return <motion.div className={className} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 24 }}>{children}</motion.div>;
}
