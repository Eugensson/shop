import { Metadata } from "next";

import { columns } from "@/app/(admin)/portfolio/columns";
import { DataTable } from "@/app/(admin)/portfolio/data-table";

export const metadata: Metadata = {
  title: "Галерея",
};

const Portfolio = () => {
  return <DataTable columns={columns} />;
};

export default Portfolio;
