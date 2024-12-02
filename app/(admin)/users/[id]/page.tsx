import { EditUserForm } from "@/components/(admin)/edit-user-form";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return {
    title: `Edit product ${id}`,
  };
};

const EditUser = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return (
    <section className="w-full h-full flex justify-center items-center">
      <EditUserForm userId={id} />
    </section>
  );
};

export default EditUser;
