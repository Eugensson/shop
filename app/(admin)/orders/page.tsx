import { Metadata } from "next";

import { columns } from "@/app/(admin)/orders/columns";
import { DataTable } from "@/app/(admin)/orders/data-table";

export const metadata: Metadata = {
  title: "Замовлення",
};

const Orders = () => {
  return <DataTable columns={columns} />;
};

export default Orders;
