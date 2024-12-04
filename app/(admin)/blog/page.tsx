import { Metadata } from "next";

import { columns } from "@/app/(admin)/blog/columns";
import { DataTable } from "@/app/(admin)/blog/data-table";

export const metadata: Metadata = {
  title: "Blog",
};

const Blog = () => {
  return <DataTable columns={columns} />;
};

export default Blog;
