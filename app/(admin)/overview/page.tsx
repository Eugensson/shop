import { Metadata } from "next";

import { OverviewData } from "@/components/(admin)/overview";

export const metadata: Metadata = {
  title: "Інфографіка",
};

const Overview = () => {
  return <OverviewData />;
};

export default Overview;
