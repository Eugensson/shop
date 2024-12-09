"use client";

import Lenis from "lenis";
import Image from "next/image";
import { ElementRef, useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

import Background1 from "@/public/hero_1.jpg";
import Background2 from "@/public/hero_2.jpg";

const Up = () => {
  const container = useRef<ElementRef<"div">>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

  return (
    <div className="h-screen overflow-hidden">
      <motion.div style={{ y }} className="relative h-full">
        <Image
          src={Background2}
          fill
          alt="image"
          style={{ objectFit: "cover" }}
        />
      </motion.div>
    </div>
  );
};

const Down = () => {
  const container = useRef<ElementRef<"div">>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative z-10 p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-between">
        <p className="w-[50vw] text-[2vw] self-end uppercase mix-blend-difference">
          Неперевершений захист і естетична досконалість, надійність, перевірена
          роками, та краса, яка вражає. Ми створюємо покриття, що поєднують
          стиль і довговічність без компромісів.
        </p>
        <p className="text-[5vw] uppercase mix-blend-difference">
          НВФ &quot;Покров&quot;
        </p>
      </div>
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <Image
            src={Background1}
            fill
            alt="image"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export const Hero = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <section>
      <Up />
      <div className="flex justify-center my-40">
        <p className="text-[7.5vw] uppercase text-center max-w-[80vw] bg-gradient-to-r from-blue-500 via-yellow-500 to-indigo-500 bg-[length:200%] bg-clip-text text-transparent leading-none animate-gradient animate-gradient-animation">
          Захист, що витримує стихії. Стиль, що вражає.
        </p>
      </div>
      <Down />
    </section>
  );
};
