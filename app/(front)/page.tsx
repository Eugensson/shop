import { Metadata } from "next";

import { Hero } from "@/components/(front)/hero";
import { History } from "@/components/(front)/history";
import Preference from "@/components/(front)/preference";

export const metadata: Metadata = {
  title: "Головна",
};

const Home = async () => {
  return (
    <section className="w-full max-w-[1600px] mx-auto">
      <Hero />
      <History />
      <Preference />
    </section>
  );
};

export default Home;
