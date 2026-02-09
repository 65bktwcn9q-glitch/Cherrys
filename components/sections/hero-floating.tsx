"use client";

import { motion, useReducedMotion } from "framer-motion";

const floats = [
  { id: 1, top: "10%", left: "5%", delay: 0 },
  { id: 2, top: "25%", left: "80%", delay: 0.4 },
  { id: 3, top: "65%", left: "15%", delay: 0.8 },
  { id: 4, top: "70%", left: "75%", delay: 1.2 }
];

export function HeroFloating() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0">
      {floats.map((item) => (
        <motion.img
          key={item.id}
          src={`/svgs/gamepad-${item.id}.svg`}
          alt=""
          className="absolute h-16 w-16 opacity-70 md:h-24 md:w-24"
          style={{ top: item.top, left: item.left }}
          initial={{ y: 0 }}
          animate={
            reduceMotion
              ? { y: 0 }
              : {
                  y: [0, -12, 0],
                  filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
                }
          }
          transition={{ duration: 6, repeat: Infinity, delay: item.delay }}
        />
      ))}
    </div>
  );
}
