import { Metadata } from "next";

import { Hero } from "@/components/(front)/hero";
import { History } from "@/components/(front)/history";
import Preference from "@/components/(front)/preference";
import { Portfolio } from "@/components/(front)/portfolio";

export const metadata: Metadata = {
  title: "Головна",
};

const Home = async () => {
  return (
    <section className="w-full h-fit max-w-[1600px] mx-auto">
      <Hero />
      <History />
      <Preference />
      <Portfolio />
      <div className="min-h-[60vh]" />
    </section>
  );
};

export default Home;
