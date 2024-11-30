import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

const Home = async () => {
  return <section className="container py-10 h-full">Home</section>;
};

export default Home;
