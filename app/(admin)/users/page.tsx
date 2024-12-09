import { Metadata } from "next";

import { columns } from "@/app/(admin)/users/columns";
import { DataTable } from "@/app/(admin)/users/data-table";

export const metadata: Metadata = {
  title: "Користувачі",
};

const Users = () => {
  return <DataTable columns={columns} />;
};

export default Users;
