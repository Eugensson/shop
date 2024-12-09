import { Metadata } from "next";

import { columns } from "@/app/(admin)/products/columns";
import { DataTable } from "@/app/(admin)/products/data-table";

export const metadata: Metadata = {
  title: "Товари",
};

const Products = () => {
  return <DataTable columns={columns} />;
};

export default Products;
