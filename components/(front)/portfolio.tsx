"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { useScroll, useTransform, motion } from "framer-motion";

import Picture1 from "@/public/portfolio_1.jpg";
import Picture2 from "@/public/portfolio_2.jpg";
import Picture3 from "@/public/portfolio_3.jpg";
import Picture4 from "@/public/portfolio_4.jpg";
import Picture5 from "@/public/portfolio_5.jpg";
import Picture6 from "@/public/portfolio_6.jpg";
import Picture7 from "@/public/portfolio_7.jpg";

export const Portfolio = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    { src: Picture1, scale: scale4 },
    { src: Picture2, scale: scale5 },
    { src: Picture3, scale: scale6 },
    { src: Picture4, scale: scale5 },
    { src: Picture5, scale: scale6 },
    { src: Picture6, scale: scale8 },
    { src: Picture7, scale: scale9 },
  ];

  return (
    <div className="pt-[5vh]">
      <Link href="/gallery">
        <div ref={container} className="relative h-[300vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            {pictures.map(({ src, scale }, index) => (
              <motion.div
                key={index}
                style={{ scale }}
                className="absolute flex items-center justify-center w-full h-full"
              >
                <div className={`relative ${getImageContainerStyles(index)}`}>
                  <Image
                    src={src}
                    fill
                    alt="image"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

const getImageContainerStyles = (index: number): string => {
  switch (index) {
    case 1:
      return "top-[-30vh] left-[5vw] w-[35vw] h-[30vh]";
    case 2:
      return "top-[-10vh] left-[-25vw] w-[20vw] h-[45vh]";
    case 3:
      return "left-[27.5vw] w-[25vw] h-[25vh]";
    case 4:
      return "top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]";
    case 5:
      return "top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh]";
    case 6:
      return "top-[22.5vh] left-[25vw] w-[15vw] h-[15vh]";
    default:
      return "w-[25vw] h-[25vh]";
  }
};
