"use client";

import Lenis from "lenis";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

import Model from "@/components/(front)/model";

import { SERVICES } from "@/constants";

export const Test = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className="h-[50vh]" />
      <div className="relative mix-blend-difference z-10 text-white h-screen w-full">
        <ul
          onMouseLeave={() => {
            setActiveMenu(null);
          }}
          className="border-b"
        >
          {SERVICES.map((service, i) => {
            return (
              <li
                onMouseOver={() => {
                  setActiveMenu(i);
                }}
                key={service.title}
                className="text-[4vw] p-5 border-t"
              >
                <p>{service.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="fixed top-0 h-screen w-full">
        <Canvas>
          <Model activeMenu={activeMenu} />
        </Canvas>
      </div>
      <div className="h-[50vh]" />
    </>
  );
};
