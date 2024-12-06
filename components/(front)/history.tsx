"use client";

import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const phrase =
  "Історія науково-виробничої фірми «Покров» розпочалась у 2010 році, коли ми побачили нагальну потребу ринку будівельних і покрівельних матеріалів у професійному постачальнику нержавіючої сталі з нітрид-титановим покриттям. Від самого початку ми прагнули не просто постачати матеріали, а створювати продукт, заснований на глибоких знаннях, досвіді та найновіших наукових досягненнях, дотримуючись технічних норм і стандартів якості. Наші наукові співробітники вдосконалили світові технології нанесення титанового покриття до рівня, що дозволяє надавати унікальні послуги в Україні. Команда «Покров» – це досвідчені спеціалісти високого класу, які об’єднані спільними цінностями, такими як вирішення найскладніших і нестандартних завдань, індивідуальний підхід до кожного клієнта, незмінна висока якість сервісу та дотримання чітких строків. Ці принципи дозволяють нам здобувати довіру клієнтів і підтверджувати репутацію «Покров» як еталону професійності та надійності.";

export const History = () => {
  const refs = useRef<HTMLSpanElement[]>([]);
  const body = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {
    if (container.current) {
      gsap.to(refs.current, {
        scrollTrigger: {
          trigger: container.current,
          scrub: true,
          start: "top top",
          end: `+=${window.innerHeight / 1.5}`,
        },
        opacity: 1,
        ease: "none",
        stagger: 0.1,
      });
    }
  };

  const splitWords = (phrase: string) => {
    return phrase.split(" ").map((word, i) => {
      const letters = splitLetters(word);
      return (
        <p
          key={word + "_" + i}
          className="text-[2vw] m-0 mr-[1.5vw] font-normal"
        >
          {letters}
        </p>
      );
    });
  };

  const splitLetters = (word: string) => {
    return word.split("").map((letter, i) => {
      return (
        <span
          key={letter + "_" + i}
          ref={(el) => {
            if (el) refs.current.push(el);
          }}
          className="opacity-50"
        >
          {letter}
        </span>
      );
    });
  };

  return (
    <div
      ref={container}
      className="flex h-screen items-center justify-center py-[80vh]"
    >
      <div ref={body} className="w-[90%] flex flex-wrap">
        {splitWords(phrase)}
      </div>
    </div>
  );
};
